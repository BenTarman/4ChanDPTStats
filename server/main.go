package main

import (
	"github.com/BenTarman/4ChanDPTStats.git/server/api"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/BenTarman/4ChanDPTStats.git/server/lib"
)

func main() {


	// Background Tasks that will update database with latest threads every hour
	go lib.UpdateThreadsChronJob()
	
	router := mux.NewRouter()

	// Main endpoint for the threads
	router.HandleFunc("/api/threads", api.GetAllThreads).Methods("GET")

	// endpoint for OP thread image
	router.HandleFunc("/api/img/{threadID}", api.GetImages).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))

}
