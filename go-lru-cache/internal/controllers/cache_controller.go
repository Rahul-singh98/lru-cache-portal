package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-lru-cache/internal/cache"
	"github.com/go-lru-cache/internal/models"
)

var lru_cache = cache.NewLRUCache(100) // Set cache capacity as needed

// GetAll retrieves all key-value pairs from the cache and returns them as JSON.
// Each entry in the cache is represented with its key, value, and expiration time.
// If the cache is empty, it returns a 400 Bad Request status with an error message.
func GetAll(c *gin.Context) {
	// Check cache
	data := lru_cache.GetAll() // Assuming this returns map[string]interface{}
	if data == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No Data"})
		return
	}

	// Create a list to hold the formatted data
	var result []map[string]interface{}

	// Iterate over the map and build the list
	for key, value := range data {

		// Append to the result list
		result = append(result, map[string]interface{}{
			"key":    key,
			"value":  value.Value,
			"expiry": value.Expiry,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

// SetCache adds or updates an item in the cache with the provided key and expiration time.
// The cache entry is specified in the request body in JSON format.
// Returns a success status if the operation is successful, or a 400 Bad Request status for invalid input.
func SetCache(c *gin.Context) {
	var requestBody models.CacheRequestBody

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	lru_cache.Set(requestBody.Key, requestBody.Value, requestBody.Expiry)
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// DeleteCache removes the cache entry associated with the specified key.
// Returns a success status if the operation is successful, or a 404 Not Found status if the key does not exist.
func DeleteCache(c *gin.Context) {
	key := c.Param("key")

	if err := lru_cache.Delete(key); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// ClearCache removes all items from the cache.
// Returns a success status after clearing the cache.
func ClearCache(c *gin.Context) {
	if err := lru_cache.Clear(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear cache"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
