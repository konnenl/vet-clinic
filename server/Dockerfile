FROM golang:1.23.1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o ./bin/main ./cmd/app

EXPOSE 8080

CMD ["./bin/main"]