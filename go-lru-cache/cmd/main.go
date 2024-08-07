package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-lru-cache/internal/routers"
)

// main initializes the Gin router, sets up the error handling middleware,
// and starts the HTTP server on port 8080.
func main() {
	// Initialize the Gin router with configured routes
	router := routers.SetupRouter()

	// Apply the custom error handling middleware
	router.Use(ErrorHandlerMiddleware())

	// Start the HTTP server on port 8080
	router.Run(":8080")
}

// ErrorHandlerMiddleware returns a Gin middleware function that handles errors occurring
// during request processing. If any errors are encountered, it responds with a
// 500 Internal Server Error status and includes the error message in the JSON response.
//
// Usage:
// - Apply this middleware to catch and handle errors from downstream handlers.
// - It processes errors after the main handler has completed its execution.
func ErrorHandlerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		// Check if there are any errors collected during the request processing
		if len(c.Errors) > 0 {
			// Get the last error
			err := c.Errors.Last()
			// Respond with a 500 Internal Server Error and include the error message
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	}
}
