package types

// Thread = All the info in a Thread.
type Thread struct {
	ThreadInfo `bson:"threadInfo" json:"threadInfo"` // reference to ThreadInfo struct
	ShilledLanguages `bson:"languageCounts" json:"languageCounts"` // reference to ShilledLanguages in the Thread

	Posts []struct {
		PostNum     int    `bson:"no" json:"no"`
		PostDate    string `bson:"now" json:"now"`
		Name        string `bson:"name" json:"name`
		PostSubject string `bson:"sub,omitempty" json:"sub,omitempty"`
		Comment     string `bson:"com" json:"com"`
		Filename    string `bson:"filename,omitempty" json:"filename,omitempty"`
		FileExt     string `bson:"ext,omitempty" json:"ext,omitempty"`
		ImageWidth  int    `bson:"w,omitempty" json:"w,omitempty"`
		ImageHeight int    `bson:"h,omitempty" json:"h,omitempty"`
		TnWidth     int    `bson:"tn_w,omitempty json:"tn_w,omitempty"`
		TnHeight    int    `bson:"tn_h,omitempty" json:"tn_h,omitempty"`
		UnixTime    int    `bson:"time" json:"time"`
		Md5         string `bson:"md5,omitempty" json:"md5,omitempty"`
		Fsize       int    `bson:"fsize,omitempty" json:"fsize,omitempty"`
		Replies     int    `bson:"replies,omitempty" json:"replies,omitempty"`
		Images      int    `bson:"images,omitempty" json:"images,omitempty"`
		UniqueIps   int    `bson:"unique_ips,omitempty" json:"unique_ips,omitempty"`
		Archived	int	   `bson:"archived,omitempty" json:"archived,omitempty"`
	} `bson:"posts" json:"posts"`
}

// ThreadInfo = Informatoin on Thread. Used to get the thread ID and the Threads OP image.
type ThreadInfo struct {
	ID         string `bson:"threadID" json:"threadID"` // thread id
	UnixTime   uint32 `bson:"unixtime" json:"unixtime"` // unix time, won't work after January 2038 lol
	URL 	   string `bson:"URL" json:"URL"` 			// thread url link
	IsActive   int    `bson:"isActive" json:"isActive"` //is thread active
}

// ShilledLanguages = struct to hold number times language is shilled per thread
type ShilledLanguages struct {
	CSharp     int `bson:"C#" json:"C#"`
	JavaScript int `bson:"JavaScript" json:"JavaScript"`
	Python     int `bson:"Python" json:"Python"`
	Java       int `bson:"Java" json:"Java"`
	Sepples    int `bson:"C++" json:"C++"`
	Swift      int `bson:"Swift" json:"Swift"`
	TypeScript int `bson:"TypeScript" json:"TypeScript"`
	Go         int `bson:"Go" json:"Go"`
	Ruby       int `bson:"Ruby" json:"Ruby"`
	PHP        int `bson:"PHP" json:"PHP"`
	Perl       int `bson:"Perl" json:"Perl"`
	Kotlin     int `bson:"Kotlin" json:"Kotlin"`
	Rust       int `bson:"Rust" json:"Rust"`
	Scheme     int `bson:"Scheme" json:"Scheme"`
	Erlang     int `bson:"Erlang" json:"Erlang"`
	Scala      int `bson:"Scala" json:"Scala"`
	Elixir     int `bson:"Elixir" json:"Elixir"`
	Haskell    int `bson:"Haskell" json:"Haskell"`
	Lisp 	   int `bson:"Lisp" json:"Lisp"`
	C          int `bson:"C" json:"C"`
}
