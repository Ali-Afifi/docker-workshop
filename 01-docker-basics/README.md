# Module 1: Docker Basics

Learn the fundamentals of Docker by containerizing a simple Flask web application.

## 🎯 Learning Objectives

- Understand Docker containers and images
- Learn to write Dockerfiles
- Practice basic Docker commands
- Manage container lifecycle
- Understand port mapping and networking

## 📋 Prerequisites

- Docker installed on your system
- Basic Python knowledge (helpful but not required)
- Command-line familiarity

## 🏗️ Project Structure

```
01-docker-basics/
├── app.py              # Flask web application
├── Dockerfile          # Docker image definition
├── requirements.txt    # Python dependencies
├── run.sh             # Helper script with Docker commands
└── README.md          # This file
```

## 🚀 Quick Start

1. **Navigate to the module directory:**
   ```bash
   cd 01-docker-basics
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t hello-flask .
   ```

3. **Run the container:**
   ```bash
   docker run -p 5000:5000 hello-flask
   ```

4. **Test the application:**
   - Open your browser to `http://localhost:5000`
   - Visit `http://localhost:5000/health` for health check

## 📖 Detailed Walkthrough

### Step 1: Understanding the Application

The Flask application (`app.py`) is a simple web server with two endpoints:
- `/` - Returns "Hello from Docker!"
- `/health` - Returns JSON with status information

### Step 2: The Dockerfile

Let's examine the Dockerfile:

```dockerfile
FROM python:3.11-slim          # Base image
WORKDIR /app                   # Set working directory
COPY requirements.txt .        # Copy dependencies
RUN pip install --no-cache-dir -r requirements.txt  # Install dependencies
COPY app.py .                  # Copy application code
EXPOSE 5000                    # Document the port
CMD ["python", "app.py"]       # Default command
```

**Key Concepts:**
- `FROM`: Specifies the base image
- `WORKDIR`: Sets the working directory inside the container
- `COPY`: Copies files from host to container
- `RUN`: Executes commands during build
- `EXPOSE`: Documents which port the app uses
- `CMD`: Specifies the default command to run

### Step 3: Building the Image

```bash
docker build -t hello-flask .
```

**What happens:**
1. Docker reads the Dockerfile
2. Downloads the base Python image
3. Sets up the working directory
4. Installs dependencies
5. Copies the application code
6. Creates the final image

### Step 4: Running the Container

```bash
docker run -p 5000:5000 hello-flask
```

**Port Mapping:**
- `-p 5000:5000` maps host port 5000 to container port 5000
- Format: `-p <host-port>:<container-port>`

## 🛠️ Hands-On Exercises

### Exercise 1: Basic Container Management

```bash
# Run container in detached mode
docker run -d -p 5000:5000 --name my-flask-app hello-flask

# Check if container is running
docker ps

# View container logs
docker logs my-flask-app

# Stop the container
docker stop my-flask-app

# Remove the container
docker rm my-flask-app
```

### Exercise 2: Image Management

```bash
# List all images
docker images

# Inspect image details
docker inspect hello-flask

# Remove the image
docker rmi hello-flask
```

### Exercise 3: Interactive Container

```bash
# Run container with interactive shell
docker run -it --rm python:3.11-slim bash

# Inside the container, try:
python --version
pip list
exit
```

## 🔍 Understanding Docker Concepts

### Images vs Containers

- **Image**: A read-only template with instructions for creating a container
- **Container**: A running instance of an image

### Container Lifecycle

1. **Created**: Container exists but not running
2. **Running**: Container is active and executing
3. **Stopped**: Container has been stopped
4. **Removed**: Container has been deleted

### Port Mapping

- Containers run in isolated networks
- Port mapping allows external access
- Format: `-p <host-port>:<container-port>`

## 📚 Key Docker Commands

### Container Management
```bash
docker run          # Create and run a container
docker ps           # List running containers
docker ps -a        # List all containers
docker stop         # Stop a running container
docker start        # Start a stopped container
docker rm           # Remove a container
docker logs         # View container logs
```

### Image Management
```bash
docker build        # Build an image from Dockerfile
docker images       # List images
docker rmi          # Remove an image
docker inspect      # Inspect image/container details
```

### System Management
```bash
docker system df    # Show Docker disk usage
docker system prune # Clean up unused resources
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Use a different port
   docker run -p 5001:5000 hello-flask
   ```

2. **Container won't start:**
   ```bash
   # Check logs for errors
   docker logs <container-name>
   ```

3. **Permission denied:**
   - Ensure Docker daemon is running
   - Check if you have proper permissions

### Debugging Tips

```bash
# Run container with shell access
docker run -it --rm hello-flask bash

# Check container processes
docker exec -it <container-name> ps aux

# Inspect container configuration
docker inspect <container-name>
```

## 🎯 Next Steps

After completing this module, you should understand:
- How to write basic Dockerfiles
- Container and image lifecycle
- Port mapping and networking
- Basic Docker commands

**Ready for the next module?** Move on to `02-docker-compose` to learn about multi-container applications!

## 📖 Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Hub](https://hub.docker.com/) - Find and share container images
