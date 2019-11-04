package api

import (
	"4chanDPTShill/lib"
	"4chanDPTShill/types"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"
)

// GetActiveThreads = Gets Active DPT Threads
func GetActiveThreads(w http.ResponseWriter, r *http.Request) {

	var dptActiveThreads []types.Thread = GetPossibleDPT()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dptActiveThreads)
}

func getThread(apiURL string, threadInfo types.ThreadInfo, dptActiveThreads *[]types.Thread) {
	response, err := http.Get(apiURL)
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	// Read response data in to memeory
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal("Error reading HTTP body", err)
	}

	var dptThreadJSONObj types.Thread
	json.Unmarshal(body, &dptThreadJSONObj)

	dptThreadJSONObj.ThreadInfo = threadInfo



	dptThreadJSONObj.ShilledLanguages = lib.GetShilledLanguageCountInThread(dptThreadJSONObj)

	// append to main list
	*dptActiveThreads = append(*dptActiveThreads, dptThreadJSONObj)
}

func GetPossibleDPT() []types.Thread {
	var dptActiveThreads []types.Thread
	response, err := http.Get("https://boards.4channel.org/g/catalog#s=dpt")
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	// Read response data in to memeory
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal("Error reading HTTP body", err)
	}

	var dptThreads []string

	re := regexp.MustCompile("\"\\d+\"(.*?)\"sub\":\"(.*?)\"")
	latestThreads := re.FindAllString(string(body), -1)
	if latestThreads == nil {
		return []types.Thread{}
	}

	for _, thread := range latestThreads {
		if strings.Contains(thread, "dpt") {
			dptThreads = append(dptThreads, thread)
		}
	}

	// Change later to be splice and get latest one based on time value
	var dptThreadObj types.ThreadInfo

	for _, dptThread := range dptThreads {

		// TODO: change this logic to use regex instead
		var split []string = strings.Split(dptThread, ":")
		threadID := split[0][1 : len(split[0])-1]

		unixTime, err2 := strconv.Atoi(strings.Split(split[2], ",")[0])
		if err2 != nil {
			return []types.Thread{}
		}

		// Gets the file path of image
		reImgURL := regexp.MustCompile("\"imgurl\":\"\\d+")
		imgURLCapture := reImgURL.FindAllString(dptThread, -1)
		imgURL := strings.Split(imgURLCapture[0], ":\"")[1]

		// Gets the Image extension
		reImgExt := regexp.MustCompile("\"file\":\".*(\\.jpg|\\.png)")
		imgExtCapture := reImgExt.FindAllString(dptThread, -1)
		imgExt := strings.Split(strings.Split(imgExtCapture[0], ":")[1], ".")[1]

		// Compute image file path that can be used in html img tag
		imgURLPath := fmt.Sprintf("https://i.4cdn.org/g/%s.%s", imgURL, imgExt)
		dptThreadObj = types.ThreadInfo{threadID, uint32(unixTime), imgURLPath}
		apiURL := fmt.Sprintf("https://a.4cdn.org/g/thread/%v.json", dptThreadObj.ID)

		getThread(apiURL, dptThreadObj, &dptActiveThreads)
	}

	return dptActiveThreads

}
