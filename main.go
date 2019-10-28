package main

import (
	"log"
	"net/http"
	"4chanDPTShill/api"
	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()

	// Route handlers
	router.HandleFunc("/api/threads", api.GetActiveThreads).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))

}
