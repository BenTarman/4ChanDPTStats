package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strings"
)

func main() {
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

	re := regexp.MustCompile("\\d+\"(.*?)\"sub\":\"(.*?)\"")
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

	fmt.Println(dptThreads)

}
