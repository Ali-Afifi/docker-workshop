package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"
)

type Response struct {
    Message   string    `json:"message"`
    Timestamp time.Time `json:"timestamp"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Response{
        Message:   "Service is healthy",
        Timestamp: time.Now(),
    })
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Response{
        Message:   "Hello from Go API",
        Timestamp: time.Now(),
    })
}

func main() {
    http.HandleFunc("/health", healthHandler)
    http.HandleFunc("/api", apiHandler)
    
    log.Println("Server starting on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}