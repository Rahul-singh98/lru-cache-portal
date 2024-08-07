package cache

import "github.com/go-lru-cache/internal/models"

// ICache defines an interface for interacting with a cache system.
// It includes methods for setting, getting, deleting, and clearing cached items.
type ICache interface {
	// Set stores a value in the cache with the specified key and optional expiration time.
	// The expiration time is given as a Unix timestamp (seconds since the epoch).
	// If the expiration time is zero, the item will not expire.
	// Returns an error if the operation fails.
	Set(key string, value interface{}, expiry int64) error

	// Get retrieves a value from the cache using the specified key.
	// Returns the value and a boolean indicating whether the key was found in the cache.
	// If the key is not found or the item has expired, it returns (nil, false).
	Get(key string) (*models.CacheEntry, bool)

	// GetAll retrieves all key-value pairs from the cache.
	// It returns a map of key-value pairs for items that are not expired.
	GetAll() map[string]*models.CacheEntry

	// Delete removes the item associated with the specified key from the cache.
	// Returns an error if the key is not found or if the operation fails.
	Delete(key string) error

	// Clear removes all items from the cache.
	// Returns an error if the operation fails.
	Clear() error
}
