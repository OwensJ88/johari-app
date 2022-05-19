package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	// Creates default gin router with Logger and Recovery middleware already attached
	router := gin.Default()

	// Create static routers
	router.LoadHTMLGlob("static/*.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/thanks", func(c *gin.Context) {
		c.HTML(http.StatusOK, "thanks.html", nil)
	})

	router.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{}) })

	// Start listening and serving requests
	router.Run(":8080")

}
