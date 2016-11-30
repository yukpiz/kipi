package mongo

import (
	mgo "gopkg.in/mgo.v2"
	"log"
)

var Session *mgo.Session

func InitMongoDb() {
	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Panicf("Failed to connect: %v\n", err)
	}
	Session = session
}
