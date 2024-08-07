package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/go-lru-cache/internal/controllers"
	"github.com/go-lru-cache/internal/middleware"
)

// SetupRouter initializes and configures the Gin router with the cache-related routes.
// It sets up the routes under the "/api" group and maps them to the corresponding controller functions.
//
// Routes:
// - GET /api/cache: Retrieves all cache entries.
// - POST /api/cache: Adds or updates a cache entry with the specified key and value.
// - DELETE /api/cache/:key: Removes the cache entry associated with the specified key.
// - DELETE /api/cache: Clears all cache entries.
//
// Returns:
// - *gin.Engine: The configured Gin router instance.
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Apply the CORS handling middleware
	router.Use(middleware.CorsMiddleware())

	// Public routes
	public := router.Group("/api")
	{
		public.GET("/cache", controllers.GetAll)
		public.POST("/cache", controllers.SetCache)
		public.DELETE("/cache/:key", controllers.DeleteCache)
		public.DELETE("/cache", controllers.ClearCache)
	}

	return router
}
