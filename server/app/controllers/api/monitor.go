package controllers

import (
	"fmt"
	"github.com/revel/revel"
	"github.com/yukpiz/kipi/server/app/libs/mongo"
	"github.com/yukpiz/kipi/server/app/models"
	"gopkg.in/mgo.v2/bson"
)

type Monitor struct {
	*revel.Controller
}

func (c Monitor) Get() revel.Result {
	//TODO: Search Query Options.
	collection := mongo.Session.DB("kipi").C("trade_monitor")
	monitors := []models.Monitor{}
	err := collection.Find(bson.M{}).All(&monitors)
	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v\n", monitors)

	data := make(map[string]interface{})
	data["monitors"] = monitors
	return c.RenderJson(data)
}
