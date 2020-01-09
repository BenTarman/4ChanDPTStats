// Chron job for updating the mongodb database every hour or so
package lib

import (
	"github.com/jasonlvhit/gocron"
	"github.com/BenTarman/4ChanDPTStats.git/server/types"
)

func UpdateThreadsChronJob() {
	gocron.Every(5).Seconds().Do(updateMongoWithNewThreads)
	<- gocron.Start()
}

func updateMongoWithNewThreads() {
	var dptActiveThreads []types.Thread = GetActiveDPTThreads()

	//update mongo
	InsertActiveDPTThreads(dptActiveThreads)
}