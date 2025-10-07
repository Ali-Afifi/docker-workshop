# Module 2: Docker Compose

Learn to orchestrate multi-container applications using Docker Compose with a full-stack Node.js application.

## 🎯 Learning Objectives

- Understand multi-container application architecture
- Learn Docker Compose fundamentals
- Practice service orchestration and networking
- Work with environment variables and volumes
- Manage service dependencies and health checks

## 📋 Prerequisites

- Completed Module 1 (Docker Basics)
- Basic understanding of Node.js and databases
- Docker and Docker Compose installed

## 🏗️ Project Structure

```
02-docker-compose/
├── app.js              # Node.js Express API server
├── Dockerfile          # Node.js application container
├── docker-compose.yaml # Multi-service orchestration
├── package.json        # Node.js dependencies
├── init.sql           # Database initialization script
├── run.sh             # Helper script with Docker Compose commands
└── README.md          # This file
```

## 🚀 Quick Start

1. **Navigate to the module directory:**
   ```bash
   cd 02-docker-compose
   ```

2. **Start all services:**
   ```bash
   docker compose up
   ```

3. **Test the application:**
   - API: `http://localhost:3000`
   - Health check: `http://localhost:3000/`
   - Users endpoint: `http://localhost:3000/users`
   - Cache test: `http://localhost:3000/cache/test`

## 🏛️ Architecture Overview

This module demonstrates a typical microservices architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Node.js API   │    │   PostgreSQL    │    │     Redis       │
│   (Port 3000)   │◄──►│   (Port 5432)   │    │   (Port 6379)   │
│                 │    │                 │    │                 │
│ - Express server│    │ - User data     │    │ - Caching layer│
│ - Database conn │    │ - Persistent    │    │ - Session store │
│ - Redis client  │    │ - ACID compliant│    │ - Fast access   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📖 Detailed Walkthrough

### Step 1: Understanding the Application

The Node.js application (`app.js`) provides:
- **Database Integration**: Connects to PostgreSQL for user data
- **Caching Layer**: Uses Redis for fast data access
- **REST API**: Provides endpoints for data and cache operations

**Key Endpoints:**
- `GET /` - Welcome message
- `GET /users` - Fetch users from PostgreSQL
- `GET /cache/:key` - Retrieve cached value
- `POST /cache/:key/:value` - Store value in cache

### Step 2: The Docker Compose Configuration

Let's examine `docker-compose.yaml`:

```yaml
version: '3.8'

services:
  api:                    # Node.js application service
    build: .              # Build from local Dockerfile
    ports:
      - "3000:3000"      # Port mapping
    environment:          # Environment variables
      - DB_HOST=postgres
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
      - DB_NAME=mydb
      - REDIS_HOST=redis
    depends_on:           # Service dependencies
      - postgres
      - redis
    networks:
      - app-network

  postgres:              # PostgreSQL database service
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network

  redis:                 # Redis cache service
    image: redis:7-alpine
    networks:
      - app-network

volumes:                 # Named volumes for data persistence
  postgres-data:

networks:                # Custom network for service communication
  app-network:
    driver: bridge
```

### Step 3: Service Dependencies

The `depends_on` directive ensures:
1. PostgreSQL starts before the API
2. Redis starts before the API
3. Services start in the correct order

### Step 4: Networking

All services communicate through the `app-network`:
- Services can reach each other by name
- Isolated from external networks
- Internal DNS resolution works automatically

## 🛠️ Hands-On Exercises

### Exercise 1: Basic Service Management

```bash
# Start all services
docker compose up

# Start in detached mode
docker compose up -d

# View running services
docker compose ps

# View logs
docker compose logs
docker compose logs api
```

### Exercise 2: Service Interaction

```bash
# Test the API endpoints
curl http://localhost:3000/
curl http://localhost:3000/users
curl http://localhost:3000/cache/test
curl -X POST http://localhost:3000/cache/hello/world
curl http://localhost:3000/cache/hello
```

### Exercise 3: Database Operations

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U myuser -d mydb

# Inside psql:
\dt                    # List tables
SELECT * FROM users;   # Query users
\q                     # Exit psql
```

### Exercise 4: Redis Operations

```bash
# Connect to Redis
docker compose exec redis redis-cli

# Inside Redis CLI:
KEYS *                 # List all keys
GET hello             # Get value for key 'hello'
SET test "Hello Redis" # Set a key-value pair
EXIT                   # Exit Redis CLI
```

## 🔍 Understanding Docker Compose Concepts

### Services
- Each service represents a container
- Services can be built from Dockerfile or use existing images
- Services communicate through the same network

### Networks
- Services in the same network can communicate by name
- Default network is created automatically
- Custom networks provide better isolation

### Volumes
- Named volumes persist data between container restarts
- Bind mounts link host directories to container paths
- Data survives container removal

### Environment Variables
- Pass configuration to containers
- Can be defined in docker-compose.yaml or .env files
- Services can reference each other by name

## 📚 Key Docker Compose Commands

### Service Management
```bash
docker compose up              # Start all services
docker compose up -d           # Start in detached mode
docker compose down            # Stop all services
docker compose down -v         # Stop and remove volumes
docker compose restart         # Restart all services
```

### Service Operations
```bash
docker compose ps              # List running services
docker compose logs            # View all logs
docker compose logs <service>  # View specific service logs
docker compose exec <service> <command>  # Execute command in service
```

### Build Operations
```bash
docker compose build           # Build all services
docker compose up --build      # Build and start services
docker compose pull            # Pull latest images
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :3000
   # Or change the port in docker-compose.yaml
   ```

2. **Service startup order:**
   ```bash
   # Check service dependencies
   docker compose config
   # Add health checks for better dependency management
   ```

3. **Database connection issues:**
   ```bash
   # Check if database is ready
   docker compose logs postgres
   # Wait for database initialization
   ```

### Debugging Tips

```bash
# Check service status
docker compose ps

# View detailed logs
docker compose logs -f api

# Execute shell in running container
docker compose exec api bash

# Check network connectivity
docker compose exec api ping postgres
```

## 🎯 Advanced Exercises

### Exercise 5: Environment Configuration

Create a `.env` file:
```bash
# .env
DB_PASSWORD=mynewpassword
REDIS_PASSWORD=redispass
```

Update `docker-compose.yaml` to use environment variables:
```yaml
environment:
  - DB_PASSWORD=${DB_PASSWORD}
  - REDIS_PASSWORD=${REDIS_PASSWORD}
```

### Exercise 6: Health Checks

Add health checks to services:
```yaml
services:
  api:
    # ... existing configuration
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Exercise 7: Scaling Services

```bash
# Scale the API service
docker compose up --scale api=3

# Check multiple instances
docker compose ps
```

## 🎯 Next Steps

After completing this module, you should understand:
- Multi-container application architecture
- Service orchestration with Docker Compose
- Networking and service communication
- Data persistence with volumes
- Environment configuration

**Ready for the next module?** Move on to `03-multi-stage` to learn about advanced Docker techniques!

## 📖 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Docker Compose](https://docs.docker.com/compose/production/)
