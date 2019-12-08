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

	// Update everything in database to be archived
	threadsCollection.UpdateMany(ctx, bson.M{}, bson.D{
        {"$set", bson.D{{"threadInfo.isActive", 0}}},
	})
	
	for _, p := range dptThreads {
		var currThread types.Thread
		threadsCollection.FindOne(context.Background(), bson.M{ "threadInfo.threadID": p.ThreadInfo.ID }).Decode(&currThread)

		// If in the collection just delete it (and will reinsert correct one).
		if currThread.ThreadInfo.ID == p.ThreadInfo.ID {
			threadsCollection.DeleteOne(ctx, bson.M{"threadInfo.threadID": currThread.ThreadInfo.ID})
		}

		// else insert into mongo (will have isActive=1)
		threadsCollection.InsertOne(context.Background(), p)
	}
}


func GetAllDPTThreads() []types.Thread {
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

	// Select everything in the mongodb database database database database
	var ret []types.Thread
	cur, _ := threadsCollection.Find(context.Background(), bson.D{})
	cur.All(ctx, &ret)

	return ret
}