package lib

import (
	"context"
	"log"
	"time"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/BenTarman/4ChanDPTStats.git/server/types"
)

// InsertActiveDPTThreads = insert active dpt threads into mongo. Don't insert duplicates.
func InsertActiveDPTThreads(dptThreads []types.Thread) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
        log.Fatal(err)
    }

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }
	defer client.Disconnect(ctx)

    dptShillDB := client.Database("DPTShill")
	threadsCollection := dptShillDB.Collection("Threads")
	
	for _, p := range dptThreads {
		var currThread types.Thread
		threadsCollection.FindOne(context.Background(), bson.M{ "threadInfo.threadID": p.ThreadInfo.ID }).Decode(&currThread)

		// If in the collection just ignore
		if currThread.ThreadInfo.ID == p.ThreadInfo.ID {
			continue
		}

		// else insert into mongo
		threadsCollection.InsertOne(context.Background(), p)
	}

}
