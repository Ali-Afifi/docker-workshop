# Docker Workshop

A comprehensive hands-on workshop for learning Docker fundamentals through practical examples. This repository contains three progressive modules that cover Docker basics, multi-container applications with Docker Compose, and advanced multi-stage builds.

## 🎯 Workshop Overview

This workshop is designed to take you from Docker basics to advanced containerization techniques. Each module builds upon the previous one, providing hands-on experience with real-world scenarios.

## 📚 Modules

### [01-docker-basics](./01-docker-basics/)
**Docker Fundamentals**
- Learn the basics of Docker containers
- Build and run a simple Flask application
- Understand Docker images, containers, and basic commands
- Practice container lifecycle management

### [02-docker-compose](./02-docker-compose/)
**Multi-Container Applications**
- Orchestrate multiple services with Docker Compose
- Build a full-stack application with Node.js, PostgreSQL, and Redis
- Learn service networking and dependency management
- Practice with volumes and environment variables

### [03-multi-stage](./03-multi-stage/)
**Advanced Docker Techniques**
- Optimize Docker images with multi-stage builds
- Compare single-stage vs multi-stage builds
- Learn Go application containerization
- Understand image size optimization

## 🚀 Prerequisites

- Docker installed on your system
- Basic command-line knowledge
- No prior Docker experience required

## 📋 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd docker-workshop
   ```

2. **Navigate to any module:**
   ```bash
   cd 01-docker-basics  # or 02-docker-compose, 03-multi-stage
   ```

3. **Follow the module-specific README:**
   Each module contains detailed instructions and examples.

## 🛠️ What You'll Learn

### Docker Basics
- Container concepts and terminology
- Building Docker images with Dockerfile
- Running and managing containers
- Port mapping and networking basics
- Image and container lifecycle

### Docker Compose
- Multi-service application architecture
- Service orchestration and dependencies
- Environment variables and configuration
- Data persistence with volumes
- Service networking and communication

### Multi-Stage Builds
- Image optimization techniques
- Build stage separation
- Reducing final image size
- Security best practices
- Production-ready containerization

## 📁 Repository Structure

```
docker-workshop/
├── 01-docker-basics/          # Flask application with basic Docker
├── 02-docker-compose/         # Node.js API with PostgreSQL and Redis
├── 03-multi-stage/           # Go application with optimized builds
└── README.md                  # This file
```

## 🎓 Learning Path

1. **Start with Module 1** - Get comfortable with Docker basics
2. **Progress to Module 2** - Learn multi-container orchestration
3. **Advance to Module 3** - Master advanced Docker techniques

Each module is self-contained but builds upon previous concepts.

## 🔧 Common Commands Reference

### Basic Docker Commands
```bash
# Build an image
docker build -t <image-name> .

# Run a container
docker run -p <host-port>:<container-port> <image-name>

# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop <container-name>

# Remove a container
docker rm <container-name>

# List images
docker images

# Remove an image
docker rmi <image-name>
```

### Docker Compose Commands
```bash
# Start services
docker compose up

# Start in detached mode
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs

# Rebuild and start
docker compose up --build
```

## 🤝 Contributing

This workshop is designed for educational purposes. Feel free to:
- Report issues or suggest improvements
- Add new examples or exercises
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in your docker run command
2. **Permission denied**: Ensure Docker daemon is running and you have proper permissions
3. **Build failures**: Check Dockerfile syntax and ensure all dependencies are available

### Getting Help

- Check the module-specific README files for detailed instructions
- Review Docker documentation for command reference
- Ensure Docker is properly installed and running

---

**Happy Containerizing! 🐳**