// Download Image. Needed so we pass the captcha.package lib

package lib

import (
    "io"
	"net/http"
    "os"
)

// DownLoadImg = Download the image given by the url.
func DownLoadImg(fullURLFile string, threadID string) {

    // make file equal to the threadID.
    fileName := threadID + ".png"

    // Put content on file
    downloadFile(httpClient(), fullURLFile, fileName)
}

func downloadFile(client *http.Client, fullURLFile string, fileName string) {
	file, err := os.Create("img/" + fileName)
    checkError(err)
    resp, err := client.Get(fullURLFile)
    checkError(err)
    defer resp.Body.Close()
    io.Copy(file, resp.Body)
    defer file.Close()
}

func httpClient() *http.Client {
    client := http.Client{
        CheckRedirect: func(r *http.Request, via []*http.Request) error {
            r.URL.Opaque = r.URL.Path
            return nil
        },
    }

    return &client
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}

