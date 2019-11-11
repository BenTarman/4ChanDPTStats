package main

import (
	"github.com/BenTarman/4ChanDPTStats.git/server/api"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()

	// Route handlers
	router.HandleFunc("/api/threads", api.GetActiveThreads).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))

}
