# Documentation for `apica-assignment` Repository

## Overview

This repository contains a Go-based backend (`go-lru-cache`) that implements an LRU cache and provides an API for interacting with it, as well as a React-based frontend (`lru-cache-viewer`) using the Vite framework to interact with this API.

## Repository Structure

```
apica-assignment/
│
├── go-lru-cache/          # Go backend implementation
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── cache/
│   │   │   └── iCache.go
│   │   │   └── lru_cache.go
│   │   ├── controllers/
│   │   │   └── cache_controller.go
│   │   ├── middleware/
│   │   │   └── common.go
│   │   │   └── cors.go
│   │   ├── models/
│   │   │   └── icache_model.go
│   │   └── routers/
│   │       └── router.go
│   ├── pkg/
│   │   └── utils/
│   │       └── constants.go
│   ├── go.mod
│   └── go.sum
│
└── lru-cache-viewer/       # React frontend implementation using Vite
```

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Rahul-singh98/apica-assignment.git
cd apica-assignment
```

### 2. Backend (`go-lru-cache`)

#### Prerequisites

Ensure you have Go installed on your machine. You can download it from [golang.org](https://golang.org/dl/).

#### Installation

Navigate to the `go-lru-cache` directory and install the Go modules:

```bash
cd go-lru-cache
go mod tidy
```

#### Running the Backend

Start the Go backend server:

```bash
go run cmd/main.go
```

By default, the backend server will be available at `http://localhost:8080`.

### 3. Frontend (`lru-cache-viewer`)

#### Prerequisites

Ensure you have Node.js and npm (or Yarn) installed. You can download them from [nodejs.org](https://nodejs.org/).

#### Installation

Navigate to the `lru-cache-viewer` directory and install the dependencies:

```bash
cd lru-cache-viewer
npm install
```

#### Running the Frontend

Start the Vite development server:

```bash
npm run dev
```

By default, the frontend application will be available at `http://localhost:5173/`.

## Using the Application

### Frontend

1. **Table of Cache Data**: The table displays the current data stored in the cache.
   ![Dashboard](readme_resources/images/dashboard.png)

2. **Add Data**: Click the "Add Data" button to open a modal where you can input new data to be added to the cache.
   ![Add Data](readme_resources/images/add_data_form.png)

---

![Add Data Error](readme_resources/images/add_data_error.png)

3. **Clear Data**: Click the "Clear" button to remove all data from the cache.
   ![Clear All Data](readme_resources/images/clear_data.png)

4. **Refresh Data**: Click the "Refresh" button to manually refresh the cache data. Data is also automatically refreshed every 10 seconds.
   ![Refreshed Data](readme_resources/images/added_data.png)

### Backend API

- **GET /api/cache**: Retrieves all key-value pairs from the cache.
- **GET /api/cache/{key}**: Retrieve data for specific key from the cache and move it to the front of the list.
- **POST /api/cache**: Adds a new key-value pair to the cache. Requires JSON body with `key`, `value` and `expiry`.
- **DELETE /api/cache**: Clears all data from the cache.
- **DELETE /api/cache/{key}**: Delete key from the cache.

## Troubleshooting

- **Backend Not Starting**: Ensure that no other process is using port 8080 and that all Go modules are properly installed.
- **Frontend Not Loading**: Ensure that the backend server is running and accessible at `http://localhost:5173/`.

## Modifying Cache Settings

To modify cache settings, such as increasing the cache size, edit the `pkg/utils/constants.go` file. For example, to increase the cache size, you can change:

```go
package utils

// Cache constants
const (
	CacheMaxCapacity    = 10
	CacheMinTTLRequired = 0
	CacheMaxTTLRequired = 10800
)
```

To:

```go
CacheMaxCapacity = 100 // or any other number
```

After making changes, restart the backend server for the new settings to take effect.

---

_Connect With me._

[![Linkedin](readme_resources/icons/linkedin.png)](https://www.linkedin.com/in/rahul-singh-432555194)
[![Mail me](readme_resources/icons/mail.png)](mailto:rajput.rahul8510@gmail.com)

---

_Made With :heart: by @Rahul-singh98._

![Click to download CV](readme_resources/files/Senior_Python_Developer.pdf)
