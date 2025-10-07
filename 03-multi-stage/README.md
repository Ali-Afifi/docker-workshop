# Module 3: Multi-Stage Docker Builds

Learn advanced Docker techniques by optimizing Go application builds using multi-stage Dockerfiles.

## 🎯 Learning Objectives

- Understand multi-stage build concepts
- Learn to optimize Docker image sizes
- Compare single-stage vs multi-stage builds
- Practice Go application containerization
- Implement production-ready containerization

## 📋 Prerequisites

- Completed Modules 1 & 2
- Basic understanding of Go programming
- Docker and Docker Compose installed

## 🏗️ Project Structure

```
03-multi-stage/
├── main.go              # Go HTTP server application
├── go.mod               # Go module definition
├── Dockerfile           # Multi-stage build configuration
├── Dockerfile.single    # Single-stage build for comparison
├── run.sh              # Helper script with build commands
└── README.md           # This file
```

## 🚀 Quick Start

1. **Navigate to the module directory:**
   ```bash
   cd 03-multi-stage
   ```

2. **Build the multi-stage image:**
   ```bash
   docker build -t go-api:multistage .
   ```

3. **Run the application:**
   ```bash
   docker run -p 8080:8080 go-api:multistage
   ```

4. **Test the application:**
   - API: `http://localhost:8080/api`
   - Health: `http://localhost:8080/health`

## 🏛️ Architecture Overview

This module demonstrates two build approaches:

### Single-Stage Build
```
┌─────────────────────────────────────┐
│           Build Stage               │
│ ┌─────────────────────────────────┐ │
│ │  Go Compiler + Source + Binary │ │
│ │  + All Build Tools             │ │
│ │  + Dependencies                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Multi-Stage Build
```
┌─────────────────┐    ┌─────────────────┐
│   Build Stage   │    │  Runtime Stage │
│ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Go Compiler  │ │───►│ │   Binary    │ │
│ │+ Source     │ │    │ │   Only     │ │
│ │+ Tools      │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘
```

## 📖 Detailed Walkthrough

### Step 1: Understanding the Go Application

The Go application (`main.go`) provides:
- **HTTP Server**: Simple REST API with JSON responses
- **Health Endpoint**: `/health` for monitoring
- **API Endpoint**: `/api` for application logic
- **Structured Logging**: Timestamped responses

**Key Features:**
- Stateless HTTP server
- JSON API responses
- Health check endpoint
- Production-ready structure

### Step 2: Multi-Stage Dockerfile Analysis

Let's examine the multi-stage `Dockerfile`:

```dockerfile
# Stage 1: Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /build

# Copy go mod files
COPY go.mod go.sum* ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /build/main .

EXPOSE 8080

CMD ["./main"]
```

**Key Concepts:**

**Stage 1 (Builder):**
- Uses full Go development image
- Downloads dependencies
- Compiles the application
- Creates optimized binary

**Stage 2 (Runtime):**
- Uses minimal Alpine Linux
- Only includes the compiled binary
- Adds SSL certificates
- Results in tiny final image

### Step 3: Single-Stage Comparison

The `Dockerfile.single` shows the traditional approach:

```dockerfile
FROM golang:1.21-alpine AS builder

WORKDIR /build

COPY go.mod go.sum* ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# No second stage - includes everything
EXPOSE 8080

CMD ["./main"]
```

## 🛠️ Hands-On Exercises

### Exercise 1: Build Comparison

```bash
# Build multi-stage image
docker build -t go-api:multistage .

# Build single-stage image
docker build -f Dockerfile.single -t go-api:single .

# Compare image sizes
docker images | grep go-api
```

**Expected Results:**
- Multi-stage: ~10-15MB
- Single-stage: ~300-400MB

### Exercise 2: Runtime Testing

```bash
# Test multi-stage build
docker run -d -p 8080:8080 --name multistage go-api:multistage

# Test single-stage build
docker run -d -p 8081:8080 --name single go-api:single

# Test both endpoints
curl http://localhost:8080/health
curl http://localhost:8081/health
```

### Exercise 3: Image Inspection

```bash
# Inspect image layers
docker history go-api:multistage
docker history go-api:single

# Check image contents
docker run --rm go-api:multistage ls -la /
docker run --rm go-api:single ls -la /
```

### Exercise 4: Security Analysis

```bash
# Check for vulnerabilities
docker run --rm go-api:multistage sh -c "apk info"
docker run --rm go-api:single sh -c "apk info"

# Compare installed packages
docker run --rm go-api:multistage sh -c "apk list --installed | wc -l"
docker run --rm go-api:single sh -c "apk list --installed | wc -l"
```

## 🔍 Understanding Multi-Stage Builds

### Benefits of Multi-Stage Builds

1. **Smaller Images**: Only runtime dependencies in final image
2. **Security**: Fewer packages = smaller attack surface
3. **Performance**: Faster image pulls and deployments
4. **Cost**: Reduced storage and bandwidth costs

### When to Use Multi-Stage Builds

- **Compiled Languages**: Go, Rust, C/C++, Java
- **Build Tools**: Webpack, Babel, TypeScript
- **Dependencies**: Large build-time dependencies
- **Production**: When image size matters

### Build Stage Best Practices

1. **Use specific base images**: `golang:1.21-alpine` not `golang:latest`
2. **Optimize layer caching**: Copy dependency files first
3. **Clean up**: Remove unnecessary files in build stage
4. **Security**: Use minimal runtime images

## 📚 Advanced Techniques

### Exercise 5: Optimized Go Build

```dockerfile
# Enhanced multi-stage build
FROM golang:1.21-alpine AS builder

WORKDIR /build

# Copy go mod files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build with optimizations
RUN CGO_ENABLED=0 GOOS=linux \
    go build -a -installsuffix cgo \
    -ldflags='-w -s' \
    -o main .

# Final stage with security scanning
FROM alpine:3.18

# Add non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Install only necessary packages
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

# Copy binary and set permissions
COPY --from=builder /build/main .
RUN chown appuser:appgroup main

USER appuser

EXPOSE 8080

CMD ["./main"]
```

### Exercise 6: Build Arguments

```dockerfile
# Using build arguments
FROM golang:1.21-alpine AS builder

ARG VERSION=1.0.0
ARG BUILD_TIME

WORKDIR /build
COPY . .

RUN CGO_ENABLED=0 go build \
    -ldflags="-X main.Version=${VERSION} -X main.BuildTime=${BUILD_TIME}" \
    -o main .

# Build with arguments
docker build --build-arg VERSION=2.0.0 --build-arg BUILD_TIME=$(date) -t go-api:v2 .
```

### Exercise 7: Multi-Architecture Builds

```bash
# Build for multiple architectures
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t go-api:multi .
```

## 🐛 Troubleshooting

### Common Issues

1. **Build failures:**
   ```bash
   # Check build logs
   docker build --no-cache -t go-api:debug .
   ```

2. **Binary not found:**
   ```bash
   # Verify binary exists in build stage
   docker run --rm -it golang:1.21-alpine sh
   # Inside container: ls -la /build/main
   ```

3. **Permission issues:**
   ```bash
   # Check file permissions
   docker run --rm go-api:multistage ls -la main
   ```

### Debugging Tips

```bash
# Debug build stage
docker build --target builder -t debug-builder .

# Inspect intermediate layers
docker run --rm debug-builder sh

# Check binary compatibility
docker run --rm go-api:multistage file main
```

## 🎯 Production Considerations

### Security Best Practices

1. **Non-root user**: Run containers as non-root
2. **Minimal base**: Use distroless or Alpine images
3. **Regular updates**: Keep base images updated
4. **Vulnerability scanning**: Scan images for CVEs

### Performance Optimization

1. **Layer caching**: Optimize Dockerfile layer order
2. **Build cache**: Use BuildKit for better caching
3. **Parallel builds**: Build multiple stages in parallel
4. **Registry optimization**: Use registry caching

### Monitoring and Observability

```go
// Add metrics to your Go application
import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
    httpRequests = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint"},
    )
)
```

## 🎯 Next Steps

After completing this module, you should understand:
- Multi-stage build concepts and benefits
- Image optimization techniques
- Security considerations for containers
- Production-ready containerization

**Congratulations!** You've completed the Docker Workshop and learned:
- Docker fundamentals
- Multi-container orchestration
- Advanced containerization techniques

## 📖 Additional Resources

- [Docker Multi-Stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/#use-multi-stage-builds)
- [Go Docker Best Practices](https://blog.golang.org/docker)
- [Container Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [Distroless Images](https://github.com/GoogleContainerTools/distroless)
