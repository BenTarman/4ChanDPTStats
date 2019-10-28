package types

// Thread = All the info in a Thread.
type Thread struct {
	ThreadInfo // reference to ThreadInfo struct

	Posts []struct {
		PostNum     int    `json:"no"`
		PostDate    string `json:"now"`
		Name        string `json:"name"`
		PostSubject string `json:"sub,omitempty"`
		Comment     string `json:"com"`
		Filename    string `json:"filename,omitempty"`
		FileExt     string `json:"ext,omitempty"`
		ImageWidth  int    `json:"w,omitempty"`
		ImageHeight int    `json:"h,omitempty"`
		TnWidth     int    `json:"tn_w,omitempty"`
		TnHeight    int    `json:"tn_h,omitempty"`
		UnixTime    int    `json:"time"`
		Md5         string `json:"md5,omitempty"`
		Fsize       int    `json:"fsize,omitempty"`
		Replies     int    `json:"replies,omitempty"`
		Images      int    `json:"images,omitempty"`
		UniqueIps   int    `json:"unique_ips,omitempty"`
	} `json:"posts"`
}

// ThreadInfo = Informatoin on Thread. Used to get the thread ID and the Threads OP image.
type ThreadInfo struct {
	ID         string // thread id
	UnixTime   uint32 // unix time, won't work after January 2038 lol
	ImgURLPath string // thread picture
}

// ShilledLanguages = struct to hold number times language is shilled per thread
type ShilledLanguages struct {
	CSharp     int `json:"C#"`
	JavaScript int `json:"JavaScript"`
	Python     int `json:"Python"`
	Java       int `json:"Java"`
	Sepples    int `json:"C++"`
	Swift      int `json:"Swift"`
	TypeScript int `json:"TypeScript"`
	Go         int `json:"Go"`
	Ruby       int `json:"Ruby"`
	PHP        int `json:"PHP"`
	Perl       int `json:"Perl"`
	Kotlin     int `json:"Kotlin"`
	Rust       int `json:"Rust"`
	Scheme     int `json:"Scheme"`
	Erlang     int `json:"Erlang"`
	Scala      int `json:"Scala"`
	Elixir     int `json:"Elixir"`
	Haskell    int `json:"Haskell"`
	Lisp 	   int `json:"Lisp"`
}
