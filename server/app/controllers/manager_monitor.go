package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"github.com/yukpiz/kipi/server/app/libs/mongo"
	"github.com/yukpiz/kipi/server/app/models"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
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

	fmt.Printf("%+v\n", monitors)
	return c.Render(monitors)
}

func (c ManagerMonitor) Save() revel.Result {
	data := make(map[string]interface{})
	body, _ := ioutil.ReadAll(c.Request.Body)

	var params interface{}
	json.Unmarshal(body, &params)
	return c.Render()
}
