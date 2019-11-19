package main

import (
	"github.com/BenTarman/4ChanDPTStats.git/server/api"
	"log"
	"net/http"
	//"github.com/BenTarman/4ChanDPTStats.git/server/lib"

	"github.com/gorilla/mux"
)

func main() {

	//lib.DownLoadImg()
	
	router := mux.NewRouter()

	// Route handlers
	router.HandleFunc("/api/threads", api.GetActiveThreads).Methods("GET")


	router.HandleFunc("/api/img/{threadID}", api.GetImages).Methods("GET")

	log.Fatal(http.ListenAndServe(":8000", router))
	


}
