sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.View1", {

		onInit: function () {

			var oModel = new JSONModel();
			this.getView().setModel(oModel);
		
		},

		onListItemPressed : function(oEvent){
			var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("Example",{
				employeeId : oCtx.getProperty("EmployeeID")
			});

		},

		createWorkerObject: function () {

			var dataObject = {
				"name": "",
				"age": "",
				"category": ""
			};

			var workerModel = this.getView().getModel();
			//console.log(this.getView().byId("iname").mProperties.value);
			dataObject.name = this.getView().byId("iname").getValue();
			dataObject.age = this.getView().byId("iage").getValue();
			dataObject.category = this.getView().byId("icategory").getValue();

			workerModel.setData(dataObject);

			sendFormData(workerModel);
			

		},

		navToTable: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Table");
		},

		navToInputs: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Inputs");
		},

		navToExample: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Example");
		},
		
		navToODataExample: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("oDataExample");
		},

		navToMyoData: function() {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("MyoData");
		}
	});

	function sendFormData(oModel) {
		MessageToast.show(oModel.getJSON());
		var XHR = new XMLHttpRequest();
		
		XHR.addEventListener("load", function (event) {
			MessageToast.show("Yeah! Data sent and response loaded.");
		});
		
		XHR.addEventListener("error", function (event) {
			MessageToast.show("Oops! Something went wrong.");
		});
		
		XHR.open("POST", "http://localhost:2403/worker");
		XHR.setRequestHeader("Content-Type", "application/json");
		XHR.send(oModel.getJSON());
	}
});