// GetActiveThreads = Gets Active DPT Threads

package api

import (
	"4chanDPTShill/types"
	"encoding/json"
	"net/http"
	"regexp"
)

func GetShilledLanguages(w http.ResponseWriter, r *http.Request) {

	var dptActiveThreads []types.Thread = GetPossibleDPT()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dptActiveThreads)
}

func FindPythonInComment(comment string) int {
	re := regexp.MustCompile("python|Python")
	matches := re.FindAllStringIndex(comment, -1)
	if (len(matches) == 0) {
		return 0
	}
	return 1
}
