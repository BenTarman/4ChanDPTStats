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

	// Background Task that will add up everything in the database. This runs once a day.
	go lib.SumUpStatisticsChronJob()
	
	router := mux.NewRouter()

	// Main endpoint for the threads
	router.HandleFunc("/api/threads", api.GetAllThreads).Methods("GET")

	// Endpoint for OP thread image
	router.HandleFunc("/api/img/{threadID}", api.GetImages).Methods("GET")

	// Endpoint
	router.HandleFunc("/api/stats", api.GetAllStats).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
}
