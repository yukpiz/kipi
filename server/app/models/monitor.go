package models

import "gopkg.in/mgo.v2/bson"

type Monitor struct {
	Id          bson.ObjectId `bson:"_id"`
	Word        string        `bson:word`
	AccountName string        `bson:account_name`
	AccountType string        `bson:account_type`
	Active      bool          `bson:active`
}
