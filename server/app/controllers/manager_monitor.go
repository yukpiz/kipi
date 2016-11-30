package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"github.com/yukpiz/kipi/server/app/libs/mongo"
	"github.com/yukpiz/kipi/server/app/models"
	"gopkg.in/mgo.v2/bson"
)

type ManagerMonitor struct {
	*revel.Controller
}

func (c ManagerMonitor) Index() revel.Result {
	collection := mongo.Session.DB("kipi").C("trade_monitor")
	monitors := []models.Monitor{}
	err := collection.Find(bson.M{}).All(&monitors)
	if err != nil {
		panic(err)
	}
	//for Dbg
	if len(monitors) == 0 {
		err = collection.Insert(&models.Monitor{Id: bson.NewObjectId(), Word: "testtest1", AccountName: "yuckmb", AccountType: "twitter", Active: true})
		err = collection.Insert(&models.Monitor{Id: bson.NewObjectId(), Word: "testtest2", AccountName: "yuckmb", AccountType: "twitter", Active: true})
		err = collection.Insert(&models.Monitor{Id: bson.NewObjectId(), Word: "testtest3", AccountName: "yuckmb", AccountType: "twitter", Active: true})
	}

	fmt.Printf("%+v\n", monitors)
	return c.Render(monitors)
}

func (c ManagerMonitor) Save() revel.Result {
	return c.Render()
}
