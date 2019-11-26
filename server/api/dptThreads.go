package api

import (
	"encoding/json"
	"net/http"
	"github.com/BenTarman/4ChanDPTStats.git/server/types"
	"github.com/BenTarman/4ChanDPTStats.git/server/lib"
)

// GetAllThreads = Gets All DPT Threads
func GetAllThreads(w http.ResponseWriter, r *http.Request) {

	var dptActiveThreads []types.Thread = lib.GetAllDPTThreads()
	
	w.Header().Set("Content-Type", "application/json")

	// needed for development
	enableCors(&w)

	json.NewEncoder(w).Encode(dptActiveThreads)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}