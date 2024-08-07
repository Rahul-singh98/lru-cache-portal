package cache

import (
	"container/list"
	"fmt"
	"sync"
	"time"

	"github.com/go-lru-cache/internal/models"
)

// LRUCache represents a Least Recently Used (LRU) cache with optional expiration support.
// It uses a doubly linked list to maintain the LRU order and a map for efficient access.
type LRUCache struct {
	capacity int                      // Maximum number of items the cache can hold
	cache    map[string]*list.Element // Map storing keys and corresponding list elements
	lruList  *list.List               // Doubly linked list to track the LRU order
	mu       sync.Mutex               // Mutex for thread-safe operations
}

// NewLRUCache creates and returns a new LRUCache with the specified capacity.
// capacity determines the maximum number of items the cache can hold.
func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		cache:    make(map[string]*list.Element),
		lruList:  list.New(),
	}
}

// Get retrieves the value associated with the given key from the cache.
// It returns the value and a boolean indicating whether the key was found and is not expired.
// If the item has expired, it will be removed from the cache, and Get will return (nil, false).
func (c *LRUCache) Get(key string) (*models.CacheEntry, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	elem, found := c.cache[key]
	if !found {
		return nil, false
	}

	// Check if the item has expired
	if c.isExpired(elem) {
		c.lruList.Remove(elem)
		delete(c.cache, key)
		return nil, false
	}

	c.lruList.MoveToFront(elem)
	return elem.Value.(*models.CacheEntry), true
}

// GetAll retrieves all key-value pairs from the cache.
// It returns a map of key-value pairs for items that are not expired.
func (c *LRUCache) GetAll() map[string]*models.CacheEntry {
	c.mu.Lock()
	defer c.mu.Unlock()

	result := make(map[string]*models.CacheEntry)

	for e := c.lruList.Front(); e != nil; e = e.Next() {
		entry := e.Value.(*models.CacheEntry)
		if !c.isExpired(e) {
			// Locate the key associated with this element
			for k, v := range c.cache {
				if v == e {
					result[k] = entry
					break
				}
			}
		}
	}
	return result
}

// Set stores the value with the given key in the cache with an optional expiration time.
// expirationTime is a Unix timestamp indicating when the item should expire.
// If expirationTime is zero, the item will not expire.
// If the cache exceeds its capacity, the least recently used item will be evicted.
func (c *LRUCache) Set(key string, value interface{}, expiry int64) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, found := c.cache[key]; found {
		c.lruList.MoveToFront(elem)
		elem.Value = &models.CacheEntry{
			Value:  value,
			Expiry: expiry,
		}
		return
	}

	if c.lruList.Len() >= c.capacity {
		oldest := c.lruList.Back()
		if oldest != nil {
			c.lruList.Remove(oldest)
			// delete(c.cache, oldest.Value.(*models.CacheEntry).Key)
			delete(c.cache, key)
		}
	}

	newElem := c.lruList.PushFront(&models.CacheEntry{
		Value:  value,
		Expiry: expiry,
	})
	c.cache[key] = newElem
}

// Delete removes the item with the specified key from the cache.
// It returns an error if the key is not found.
func (c *LRUCache) Delete(key string) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, found := c.cache[key]; found {
		c.lruList.Remove(elem)
		delete(c.cache, key)
		return nil
	}
	return fmt.Errorf("key not found: %s", key)
}

// Clear removes all items from the cache.
func (c *LRUCache) Clear() error {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.lruList.Init()                         // Reinitialize the list to clear all elements
	c.cache = make(map[string]*list.Element) // Reinitialize the map to clear all entries
	return nil
}

// isExpired checks if the given list element has expired.
// It returns true if the item has expired based on its expiry time, or false if it has not expired or has no expiry time.
func (c *LRUCache) isExpired(elem *list.Element) bool {
	if elem == nil {
		return false
	}
	entry := elem.Value.(*models.CacheEntry)
	if entry.Expiry == 0 {
		return false // No expiry
	}
	return time.Now().Unix() > entry.Expiry
}
