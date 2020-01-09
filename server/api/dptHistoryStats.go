package api

import (
	"encoding/json"
	"net/http"
	"github.com/BenTarman/4ChanDPTStats.git/server/types"
	"github.com/BenTarman/4ChanDPTStats.git/server/lib"
)

// GetAllThreads = Gets All DPT Threads
func GetAllStats(w http.ResponseWriter, r *http.Request) {
	var shilledLanguages types.ShilledLanguages = lib.GetAllStatistics()
	
	w.Header().Set("Content-Type", "application/json")

	// needed for development
	enableCorsAgainAgain(&w)

	json.NewEncoder(w).Encode(shilledLanguages)
}

// TODO: export this stuff to a config file
func enableCorsAgainAgain(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}