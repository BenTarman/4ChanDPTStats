package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	getPossibleDPT()

}

func getPossibleDPT() {
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
		fmt.Println("no dpt threads currently")
	} else {
		for _, thread := range latestThreads {
			if strings.Contains(thread, "dpt") {
				dptThreads = append(dptThreads, thread)
			}
		}
	}

	// Change later to be splice and get latest one based on time value
	var dptThreadObj dptThreadInfo

	for _, dptThread := range dptThreads {
		var split []string = strings.Split(dptThread, ":")
		threadID := split[0]

		unixTime, err := strconv.Atoi(strings.Split(split[2], ",")[0])
		if err != nil {
			fmt.Println("something is in error")
		}

		imgURLPath := strings.Split(split[3], ",")[0]

		dptThreadObj = dptThreadInfo{threadID, uint32(unixTime), imgURLPath}
		fmt.Println(dptThreadObj)
	}

}

type dptThreadInfo struct {
	id         string // thread id
	unixTime   uint32 // unix time, won't work after January 2038 lol
	imgURLPath string // thread picture
}
