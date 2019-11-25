package main

import (
	"github.com/BenTarman/4ChanDPTStats.git/server/api"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()

	// Main endpoint for the threads
	router.HandleFunc("/api/threads", api.GetActiveThreads).Methods("GET")

	// endpoint for OP thread image
	router.HandleFunc("/api/img/{threadID}", api.GetImages).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
}
