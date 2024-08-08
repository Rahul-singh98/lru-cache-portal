package models

// CacheEntry represents a single entry in the cache.
// It contains the value stored in the cache and the expiration time for that entry.
type CacheEntry struct {
	Key    string      // The key associated with the cache entry
	Value  interface{} // The value associated with the cache entry
	Expiry int64       // Unix timestamp indicating when the entry should expire (0 means no expiration)
}

// CacheRequestBody represents the structure of the request body for cache operations.
// It is used to specify the key, value, and expiration time for cache entries.
type CacheRequestBody struct {
	Key    string      `json:"key"`    // The key under which the value is stored in the cache
	Value  interface{} `json:"value"`  // The value to be stored in the cache
	Expiry int64       `json:"expiry"` // Unix timestamp for the expiration time of the cache entry (0 means no expiration)
}
