package main

import (
	"github.com/go-lru-cache/internal/middleware"
	"github.com/go-lru-cache/internal/routers"
)

// main initializes the Gin router, sets up the error handling middleware,
// and starts the HTTP server on port 8080.
func main() {
	// Initialize the Gin router with configured routes
	router := routers.SetupRouter()

	// Apply the custom error handling middleware
	router.Use(middleware.ErrorHandlerMiddleware())

	// Start the HTTP server on port 8080
	router.Run(":8080")
}
