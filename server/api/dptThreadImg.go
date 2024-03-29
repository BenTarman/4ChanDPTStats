// Images already downloaded. This endpoint will just serve them. This manual downloading is needed to bypass capthca

package api

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
)

// GetImages = return list of images
func GetImages(w http.ResponseWriter, r *http.Request) {

	threadID := mux.Vars(r)["threadID"]

	w.Header().Set("Content-Type", "image/jpeg")

	// needed for development
	enableCors(&w)

	var url = fmt.Sprintf("/home/eango/img/%v.png", threadID)
	http.ServeFile(w, r, url)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
