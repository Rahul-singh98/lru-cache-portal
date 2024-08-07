package cache

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestNewLRUCache(t *testing.T) {
	cache := NewLRUCache(2)
	assert.NotNil(t, cache)
	assert.Equal(t, 2, cache.capacity)
	assert.NotNil(t, cache.cache)
	assert.NotNil(t, cache.lruList)
}

func TestSetAndGet(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("key1", "value1", 0)
	entry, found := cache.Get("key1")
	assert.True(t, found)
	assert.Equal(t, "value1", entry.Value)
}

func TestDelete(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("key1", "value1", 0)
	err := cache.Delete("key1")
	assert.NoError(t, err)

	entry, found := cache.Get("key1")
	assert.False(t, found)
	assert.Nil(t, entry)
}

func TestClear(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("key1", "value1", 0)
	cache.Set("key2", "value2", 0)
	err := cache.Clear()
	assert.NoError(t, err)

	entry, found := cache.Get("key1")
	assert.False(t, found)
	assert.Nil(t, entry)

	entry, found = cache.Get("key2")
	assert.False(t, found)
	assert.Nil(t, entry)
}

func TestGetAll(t *testing.T) {
	cache := NewLRUCache(2)
	cache.Set("key1", "value1", 0)
	cache.Set("key2", "value2", time.Now().Unix()+10)

	result := cache.GetAll()
	assert.Len(t, result, 2)

	assert.Equal(t, "value1", result["key1"].Value)
	assert.Equal(t, "value2", result["key2"].Value)
}

// func TestGetExpired(t *testing.T) {
// 	cache := NewLRUCache(2)
// 	cache.Set("key1", "value1", time.Now().Unix()-1) // Set expired
// 	entry, found := cache.Get("key1")
// 	assert.False(t, found)
// 	assert.Nil(t, entry)
// }

// func TestSetEviction(t *testing.T) {
// 	cache := NewLRUCache(2)
// 	cache.Set("key1", "value1", 0)
// 	cache.Set("key2", "value2", 0)
// 	cache.Set("key3", "value3", 0) // Should evict key1

// 	entry, found := cache.Get("key1")
// 	assert.False(t, found)
// 	assert.Nil(t, entry)

// 	entry, found = cache.Get("key2")
// 	assert.True(t, found)
// 	assert.Equal(t, "value2", entry.Value)

// 	entry, found = cache.Get("key3")
// 	assert.True(t, found)
// 	assert.Equal(t, "value3", entry.Value)
// }

// func TestIsExpired(t *testing.T) {
// 	cache := NewLRUCache(2)
// 	cache.Set("key1", "value1", time.Now().Unix()-1)  // Expired
// 	cache.Set("key2", "value2", time.Now().Unix()+10) // Not expired

// 	elem := cache.lruList.Front()
// 	assert.True(t, cache.isExpired(elem)) // key1 should be expired

// 	elem = elem.Next()
// 	assert.False(t, cache.isExpired(elem)) // key2 should not be expired
// }
