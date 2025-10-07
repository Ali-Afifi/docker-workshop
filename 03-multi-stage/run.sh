# Build the multi-stage image
docker build -t go-api:multistage .

# Check the image size
docker images go-api

# Run the container
docker run -p 8080:8080 go-api:multistage

# Compare with single-stage build
# (Create Dockerfile.single without multi-stage)
docker build -f Dockerfile.single -t go-api:single .
docker images | grep go-api
