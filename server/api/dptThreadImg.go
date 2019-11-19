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
	fmt.Println(threadID)

	w.Header().Set("Content-Type", "image/jpeg")
	var url = fmt.Sprintf("/home/bentarman/codeProjects/4chanDPTShill/server/img/%v.png", threadID)
    http.ServeFile(w, r,url)
}