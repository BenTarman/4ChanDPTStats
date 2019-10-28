// GetActiveThreads = Gets Active DPT Threads

package api

import (
	"4chanDPTShill/types"
	"encoding/json"
	"net/http"
)

func GetShilledLanguages(w http.ResponseWriter, r *http.Request) {

	var dptActiveThreads []types.Thread = getPossibleDPT()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dptActiveThreads)
}

func FindPythonInComment(comment string) int {
	return 1
}












