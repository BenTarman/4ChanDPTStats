package tests

import (
	"4chanDPTShill/lib"
	"4chanDPTShill/types"
	"encoding/json"
	"io/ioutil"
	"os"
	"testing"
)

var dptTestThread types.Thread

var jsonFile, _ = os.Open("dptTestThread.json")
var byteValue, _ = ioutil.ReadAll(jsonFile)
var _ = json.Unmarshal(byteValue, &dptTestThread)

func TestFindPythonInComment(t *testing.T) {
	comment := "python port of anonymouth but i don't know shit about linguistics"
	actual := lib.FindPythonInComment(comment)
	if actual != 1 {
		t.Error("Test failed")
	}
}

func TestFindCInComment(t *testing.T) {
	comment := "You should learn PowerShell or C# and dotnet."
	actual := lib.FindPythonInComment(comment)

	if actual != 0 {
		t.Error("Test failed")
	}
}

func TestNoPythonFoundInComment(t *testing.T) {
	comment := "... I can't actually improve the speed by fixing the buffering though. Best I've got is"
	actual := lib.FindPythonInComment(comment)
	if actual != 0 {
		t.Error("Test failed")
	}
}

func TestFindPythonInWholeThread(t *testing.T) {
	numFinds := 0
	for _, dptComment := range dptTestThread.Posts {
		numFinds += lib.FindPythonInComment(dptComment.Comment)
	}
	if numFinds != 12 {
		t.Error("Test failed")
	}
}

func TestFindCSharpInWholeThread(t *testing.T) {
	numFinds := 0
	for _, dptComment := range dptTestThread.Posts {
		numFinds += lib.FindCSharpInComment(dptComment.Comment)
	}
	if numFinds != 8 {
		t.Error("Test failed")
	}
}

func TestFindCInWholeThread(t *testing.T) {
	numFinds := 0
	for _, dptComment := range dptTestThread.Posts {
		numFinds += lib.FindCInComment(dptComment.Comment)
	}

	if numFinds != 6 {
		t.Error("Test failed")
	}
}
