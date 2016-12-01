package controllers

import (
	"encoding/json"
	"github.com/revel/revel"
	"io/ioutil"
)

type ManagerMonitor struct {
	*revel.Controller
}

func (c ManagerMonitor) Index() revel.Result {
	return c.Render()
}

func (c ManagerMonitor) Save() revel.Result {
	//Response data.
	//data := make(map[string]interface{})
	body, _ := ioutil.ReadAll(c.Request.Body)

	var params interface{}
	json.Unmarshal(body, &params)
	return c.Render()
}
