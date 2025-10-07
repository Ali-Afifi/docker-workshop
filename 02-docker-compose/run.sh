# Start all services
docker compose up 

# Star  in detached mode
docker compose up -d

# View logs
docker compose logs
docker compose logs api

# Check running services
docker compose ps

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild and start
docker compose up --build
