// This file is just regex to match languages in comments

package lib

import (
	"regexp"
	"strings"

	"github.com/BenTarman/4ChanDPTStats.git/server/types"
)

// GetShilledLanguageCountInThread = return an ShilledLanguages struct that contanis the counts
func GetShilledLanguageCountInThread(dptThread *types.Thread) types.ShilledLanguages {
	// Get shilled language counts
	var shilledLanguagesInThread types.ShilledLanguages

	for i := 0; i < len((*dptThread).Posts); i++ {
		var languageMentions strings.Builder

		dptComment := (*dptThread).Posts[i]
		shilledLanguagesInThread.CSharp += FindCSharpInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Python += FindPythonInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.JavaScript += FindJavaScriptInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.JavaScript += FindJavaInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Sepples += FindSepplesInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Swift += FindSwiftInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.TypeScript += FindTypeScriptInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Go += FindGoInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Ruby += FindRubyInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.PHP += FindPHPInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Perl += FindPerlInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Kotlin += FindKotlinInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Rust += FindRustInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Scheme += FindSchemeInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Erlang += FindErlangInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Scala += FindScalaInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Elixir += FindElixirInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Haskell += FindHaskellInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.Lisp += FindLispInComment(dptComment.Comment, &languageMentions)
		shilledLanguagesInThread.C += FindCInComment(dptComment.Comment, &languageMentions)

		// since passing a pointer this will change what is inserted in the database.
		(*dptThread).Posts[i].LanguageMentions = strings.TrimSuffix(languageMentions.String(), ";")
	}
	return shilledLanguagesInThread
}

func findShilledLanguageCount(match string, comment string, languageMentions *strings.Builder, language string) int {
	re := regexp.MustCompile(match)
	matches := re.FindAllStringIndex(comment, -1)
	if len(matches) == 0 {
		return 0
	}

	(*languageMentions).WriteString(language)

	return 1
}

// Python
func FindPythonInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("python|Python", comment, languageMentions, "python;")
}

// C#
func FindCSharpInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("csharp|C#|CSharp|c#", comment, languageMentions, "C#;")
}

// JavaScript
func FindJavaScriptInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Javascript|JavaScript|javascript|JS", comment, languageMentions, "javascript;")
}

// Java
func FindJavaInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Java|Java", comment, languageMentions, "java;")
}

// C++
func FindSepplesInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("c\\+\\+|C\\+\\+|sepples|Sepples", comment, languageMentions, "sepples;")
}

// Swift
func FindSwiftInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("swift|Swift", comment, languageMentions, "swift;")
}

// TypeScript
func FindTypeScriptInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("TypeScript|Typescript|typescript", comment, languageMentions, "typescript;")
}

// Go TODO: edit this to not allow search at start
func FindGoInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("goLang|golang|, go| , Go", comment, languageMentions, "golang;")
}

// Ruby
func FindRubyInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Ruby|ruby", comment, languageMentions, "ruby;")
}

// PHP
func FindPHPInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("php|Php|PHP", comment, languageMentions, "php;")
}

// Perl
func FindPerlInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("perl|Perl", comment, languageMentions, "perl;")
}

// Kotlin
func FindKotlinInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Kotlin|kotlin", comment, languageMentions, "kotlin;")
}

// Rust
func FindRustInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("rust|Rust", comment, languageMentions, "rust;")
}

// Scheme
func FindSchemeInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Scheme|scheme", comment, languageMentions, "scheme;")
}

// Erlang
func FindErlangInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Erlang|erlang", comment, languageMentions, "erlang;")
}

// Scala
func FindScalaInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Scala|scala", comment, languageMentions, "scala;")
}

// Elixir
func FindElixirInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Elixir|elixir", comment, languageMentions, "elixir;")
}

// Haskell
func FindHaskellInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Haskell|haskell", comment, languageMentions, "haskell;")
}

// Lisp
func FindLispInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("Lisp|lisp", comment, languageMentions, "lisp;")
}

// C
func FindCInComment(comment string, languageMentions *strings.Builder) int {
	return findShilledLanguageCount("<br>C\\s+|\\s+C\\s+|\\s+C\\.", comment, languageMentions, "C;")
}
