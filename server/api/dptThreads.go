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


	json.NewEncoder(w).Encode(dptActiveThreads)
}

