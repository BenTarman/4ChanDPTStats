// Chron job for updating the mongodb database every hour or so
package lib

import (
	"github.com/jasonlvhit/gocron"
	"github.com/BenTarman/4ChanDPTStats.git/server/types"
)

func SumUpStatisticsChronJob() {
	gocron.Every(12).Hours().Do(updateMongoWithNewStatistics)
	<- gocron.Start()
}

func updateMongoWithNewStatistics() {
	var dptActiveThreads []types.Thread = GetAllDPTThreads()
	var totalShilledLanguageCount types.ShilledLanguages

	for _, dptThread := range dptActiveThreads {
		totalShilledLanguageCount.CSharp += dptThread.ShilledLanguages.CSharp
		totalShilledLanguageCount.JavaScript += dptThread.ShilledLanguages.JavaScript
		totalShilledLanguageCount.Python += dptThread.ShilledLanguages.Python
		totalShilledLanguageCount.Java += dptThread.ShilledLanguages.Java
		totalShilledLanguageCount.Sepples += dptThread.ShilledLanguages.Sepples
		totalShilledLanguageCount.Swift += dptThread.ShilledLanguages.Swift
		totalShilledLanguageCount.TypeScript += dptThread.ShilledLanguages.TypeScript
		totalShilledLanguageCount.Go += dptThread.ShilledLanguages.Go
		totalShilledLanguageCount.Ruby += dptThread.ShilledLanguages.Ruby
		totalShilledLanguageCount.PHP += dptThread.ShilledLanguages.PHP
		totalShilledLanguageCount.Perl += dptThread.ShilledLanguages.Perl
		totalShilledLanguageCount.Kotlin += dptThread.ShilledLanguages.Kotlin
		totalShilledLanguageCount.Rust += dptThread.ShilledLanguages.Rust
		totalShilledLanguageCount.Scheme += dptThread.ShilledLanguages.Scheme
		totalShilledLanguageCount.Erlang += dptThread.ShilledLanguages.Erlang
		totalShilledLanguageCount.Scala += dptThread.ShilledLanguages.Scala
		totalShilledLanguageCount.Elixir += dptThread.ShilledLanguages.Elixir
		totalShilledLanguageCount.Haskell += dptThread.ShilledLanguages.Haskell
		totalShilledLanguageCount.Lisp += dptThread.ShilledLanguages.Lisp
		totalShilledLanguageCount.C += dptThread.ShilledLanguages.C
	}

	UpdateTotalStatistics(totalShilledLanguageCount)
}