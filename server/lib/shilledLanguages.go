// This file is just regex to match languages in comments
package lib

import (
	"fmt"
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
		// used to keep track on where to insert span classes.
		var offset int = 0
		dptComment := (*dptThread).Posts[i]

		// increment language counts in these functions. Also inserts span classes where a programming language is found
		// EX) "I like python a lot" => "I like <span class="python"> a lot".
		shilledLanguagesInThread.CSharp += FindCSharpInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.JavaScript += FindJavaScriptInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Python += FindPythonInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.JavaScript += FindJavaInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Sepples += FindSepplesInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Swift += FindSwiftInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.TypeScript += FindTypeScriptInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Go += FindGoInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Ruby += FindRubyInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.PHP += FindPHPInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Perl += FindPerlInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Kotlin += FindKotlinInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Rust += FindRustInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Scheme += FindSchemeInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Erlang += FindErlangInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Scala += FindScalaInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Elixir += FindElixirInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Haskell += FindHaskellInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.Lisp += FindLispInComment(&dptComment.Comment, &languageMentions, &offset)
		shilledLanguagesInThread.C += FindCInComment(&dptComment.Comment, &languageMentions, &offset)

		// since passing a pointer this will change what is inserted in the database.
		(*dptThread).Posts[i].LanguageMentions = strings.TrimSuffix(languageMentions.String(), ";")
		(*dptThread).Posts[i].Comment = dptComment.Comment
	}
	return shilledLanguagesInThread
}

func findShilledLanguageCount(match string, comment *string, languageMentions *strings.Builder, language string, offset *int) int {
	matchLang := fmt.Sprintf("(\\s+(%s)\\s+)|(^(%s)$)|(\\s+(%s)$)|(^(%s)\\s+)", match, match, match, match)
	re := regexp.MustCompile(matchLang)
	matches := re.FindAllStringIndex(*comment, -1)

	if len(matches) == 0 {
		return 0
	}

	for i := 0; i < len(matches); i++ {
		firstIdx := matches[i][0]
		lastIdx := matches[i][1] 

		*offset = len(fmt.Sprintf("<span class=\"%s\">", strings.TrimSuffix(language, ";"))) + len("</span>")
		*comment = (*comment)[:firstIdx] + fmt.Sprintf("<span class=\"%s\">", strings.TrimSuffix(language, ";")) + (*comment)[firstIdx:lastIdx] + "</span>" + (*comment)[lastIdx:]
	}
	
	(*languageMentions).WriteString(language)
	return 1
}

// Python
func FindPythonInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("python|Python", comment, languageMentions, "python;", offset)
}

// C#
func FindCSharpInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("csharp|C#|CSharp|c#", comment, languageMentions, "C#;", offset)
}

// JavaScript
func FindJavaScriptInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Javascript|JavaScript|javascript|JS", comment, languageMentions, "javascript;", offset)
}

// Java
func FindJavaInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Java|java", comment, languageMentions, "java;", offset)
}

// C++
func FindSepplesInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("c\\+\\+|C\\+\\+|sepples|Sepples", comment, languageMentions, "sepples;", offset)
}

// Swift
func FindSwiftInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("swift|Swift", comment, languageMentions, "swift;", offset)
}

// TypeScript
func FindTypeScriptInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("TypeScript|Typescript|typescript", comment, languageMentions, "typescript;", offset)
}

// Go TODO: edit this to not allow search at start
func FindGoInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("goLang|golang|Go", comment, languageMentions, "golang;", offset)
}

// Ruby
func FindRubyInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Ruby|ruby", comment, languageMentions, "ruby;", offset)
}

// PHP
func FindPHPInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("php|Php|PHP", comment, languageMentions, "php;", offset)
}

// Perl
func FindPerlInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("perl|Perl", comment, languageMentions, "perl;", offset)
}

// Kotlin
func FindKotlinInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Kotlin|kotlin", comment, languageMentions, "kotlin;", offset)
}

// Rust
func FindRustInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("rust|Rust", comment, languageMentions, "rust;", offset)
}

// Scheme
func FindSchemeInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Scheme|scheme", comment, languageMentions, "scheme;", offset)
}

// Erlang
func FindErlangInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Erlang|erlang", comment, languageMentions, "erlang;", offset)
}

// Scala
func FindScalaInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Scala|scala", comment, languageMentions, "scala;", offset)
}

// Elixir
func FindElixirInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Elixir|elixir", comment, languageMentions, "elixir;", offset)
}

// Haskell
func FindHaskellInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Haskell|haskell", comment, languageMentions, "haskell;", offset)
}

// Lisp
func FindLispInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("Lisp|lisp", comment, languageMentions, "lisp;", offset)
}

// C
func FindCInComment(comment *string, languageMentions *strings.Builder, offset *int) int {
	return findShilledLanguageCount("C|c", comment, languageMentions, "C;", offset)
}
