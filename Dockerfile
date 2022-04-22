#This is a sample Image 
FROM golang:1.18

# Set the Current Working Directory inside the container
WORKDIR /app/johari-app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .

#COPY go.sum .

RUN go mod download

COPY . .

# Build the Go app
RUN go build -o ./out/johari-app .

EXPOSE 5000

CMD ["./out/johari-app"]