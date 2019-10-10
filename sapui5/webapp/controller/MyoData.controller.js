sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.MyoData", {

		onInit: function () {
			var XHR = new XMLHttpRequest();


			XHR.open("GET", "http://localhost:3000/workers/?$format=json");

			XHR.setRequestHeader("Content-Type", "application/json");
			XHR.send();
			var oModel = new sap.ui.model.json.JSONModel();
			XHR.onreadystatechange = function () {
				if (XHR.readyState == 4 && XHR.status == 200) {
					var data = XHR.response;
					oModel.setData(JSON.parse(data))
					console.log(data);
				}
			}
			this.getView().byId("dataoDataTable").setModel(oModel, "datModel");
		},

		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("View1");
		}
	})
});