package tests

import (
	"4chanDPTShill/api"
	"4chanDPTShill/types"
  "testing"
  "encoding/json"
  "os"
  "io/ioutil"
)

var dptTestThread types.Thread

var jsonFile, _ = os.Open("dptTestThread.json")
var byteValue, _ = ioutil.ReadAll(jsonFile)
var _ = json.Unmarshal(byteValue, &dptTestThread)


func TestFindPythonInComment(t *testing.T) {
	comment := "python port of anonymouth but i don't know shit about linguistics"
	actual := api.FindPythonInComment(comment)
	if actual != 1 {
		t.Error("Test failed")
	}
}

func TestNoPythonFoundInComment(t *testing.T) {
	comment := "... I can't actually improve the speed by fixing the buffering though. Best I've got is"
	actual := api.FindPythonInComment(comment)
	if actual != 0 {
		t.Error("Test failed")
	}
}



func TestFindPythonInWholeThread(t *testing.T) {
  numFinds := 0
  for _, dptComment := range dptTestThread.Posts {
    numFinds += api.FindPythonInComment(dptComment.Comment)
  }

  if numFinds != 12 {
		t.Error("Test failed")
	}
}

