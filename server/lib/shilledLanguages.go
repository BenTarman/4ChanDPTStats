// GetActiveThreads = Gets Active DPT Threads

package lib

import (
	"4chanDPTShill/types"
	"regexp"
)

// GetShilledLanguageCountInThread = return an ShilledLanguages struct that contanis the counts
func GetShilledLanguageCountInThread(dptThread types.Thread) types.ShilledLanguages {
	// Get shilled language counts
	var shilledLanguagesInThread types.ShilledLanguages
	for _, dptComment := range dptThread.Posts {
		shilledLanguagesInThread.Python += FindPythonInComment(dptComment.Comment)
		shilledLanguagesInThread.CSharp += FindCSharpInComment(dptComment.Comment)
		shilledLanguagesInThread.JavaScript += FindJavaScriptInComment(dptComment.Comment)
		shilledLanguagesInThread.JavaScript += FindJavaInComment(dptComment.Comment)
		shilledLanguagesInThread.Sepples += FindSepplesInComment(dptComment.Comment)
		shilledLanguagesInThread.Swift += FindSwiftInComment(dptComment.Comment)
		shilledLanguagesInThread.TypeScript += FindTypeScriptInComment(dptComment.Comment)
		shilledLanguagesInThread.Go += FindGoInComment(dptComment.Comment)
		shilledLanguagesInThread.Ruby += FindRubyInComment(dptComment.Comment)
		shilledLanguagesInThread.PHP += FindPHPInComment(dptComment.Comment)
		shilledLanguagesInThread.Perl += FindPerlInComment(dptComment.Comment)
		shilledLanguagesInThread.Kotlin += FindKotlinInComment(dptComment.Comment)
		shilledLanguagesInThread.Rust += FindRustInComment(dptComment.Comment)
		shilledLanguagesInThread.Scheme += FindSchemeInComment(dptComment.Comment)
		shilledLanguagesInThread.Erlang += FindErlangInComment(dptComment.Comment)
		shilledLanguagesInThread.Scala += FindScalaInComment(dptComment.Comment)
		shilledLanguagesInThread.Elixir += FindElixirInComment(dptComment.Comment)
		shilledLanguagesInThread.Haskell += FindHaskellInComment(dptComment.Comment)
		shilledLanguagesInThread.Lisp += FindLispInComment(dptComment.Comment)
		shilledLanguagesInThread.C += FindCInComment(dptComment.Comment)
	}
	return shilledLanguagesInThread
}

func findShilledLanguageCount(match string, comment string) int {
	re := regexp.MustCompile(match)
	matches := re.FindAllStringIndex(comment, -1)
	if len(matches) == 0 {
		return 0
	}
	return 1
}

// Python
func FindPythonInComment(comment string) int {
	return findShilledLanguageCount("python|Python", comment)
}

// C#
func FindCSharpInComment(comment string) int {
	return findShilledLanguageCount("csharp|C#|CSharp|c#", comment)
}

// JavaScript
func FindJavaScriptInComment(comment string) int {
	return findShilledLanguageCount("Javascript|JavaScript|javascript|JS", comment)
}

// Java
func FindJavaInComment(comment string) int {
	return findShilledLanguageCount("Java|Java", comment)
}

// C++
func FindSepplesInComment(comment string) int {
	return findShilledLanguageCount("c\\+\\+|C\\+\\+|sepples|Sepples", comment)
}

// Swift
func FindSwiftInComment(comment string) int {
	return findShilledLanguageCount("swift|Swift", comment)
}

// TypeScript
func FindTypeScriptInComment(comment string) int {
	return findShilledLanguageCount("TypeScript|Typescript|typescript", comment)
}

// Go TODO: edit this to not allow search at start
func FindGoInComment(comment string) int {
	return findShilledLanguageCount("goLang|golang|, go| , Go", comment)
}

// Ruby
func FindRubyInComment(comment string) int {
	return findShilledLanguageCount("Ruby|ruby", comment)
}

// PHP
func FindPHPInComment(comment string) int {
	return findShilledLanguageCount("php|Php|PHP", comment)
}

// Perl
func FindPerlInComment(comment string) int {
	return findShilledLanguageCount("perl|Perl", comment)
}

// Kotlin
func FindKotlinInComment(comment string) int {
	return findShilledLanguageCount("Kotlin|kotlin", comment)
}

// Rust
func FindRustInComment(comment string) int {
	return findShilledLanguageCount("rust|Rust", comment)
}

// Scheme
func FindSchemeInComment(comment string) int {
	return findShilledLanguageCount("Scheme|scheme", comment)
}

// Erlang
func FindErlangInComment(comment string) int {
	return findShilledLanguageCount("Erlang|erlang", comment)
}

// Scala
func FindScalaInComment(comment string) int {
	return findShilledLanguageCount("Scala|scala", comment)
}

// Elixir
func FindElixirInComment(comment string) int {
	return findShilledLanguageCount("Elixir|elixir", comment)
}

// Haskell
func FindHaskellInComment(comment string) int {
	return findShilledLanguageCount("Haskell|haskell", comment)
}

// Lisp
func FindLispInComment(comment string) int {
	return findShilledLanguageCount("Lisp|lisp", comment)
}

// C
func FindCInComment(comment string) int {
	return findShilledLanguageCount("<br>C\\s+|\\s+C\\s+|\\s+C\\.", comment)
}
