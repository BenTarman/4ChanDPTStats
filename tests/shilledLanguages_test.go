package tests

import (
	"testing"
	"4chanDPTShill/api"
)

func TestFindPythonInComment(t *testing.T){
  comment := "python port of anonymouth but i don't know shit about linguistics"
  actual := api.FindPythonInComment(comment)
  if actual != 1 {
    t.Error("Test failed")
  }
}