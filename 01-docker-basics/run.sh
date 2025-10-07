# Build the image
docker build -t hello-flask .

# Run the container
docker run -p 5000:5000 hello-flask

# Run in detached mode
docker run -d -p 5000:5000 --name my-flask-app hello-flask

# Check logs
docker logs my-flask-app

# Stop and remove
docker stop my-flask-app
docker rm my-flask-app

# View images
docker images

# Remove image
docker rmi hello-flask
