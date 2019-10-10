sap.ui.define(["sap/ui/core/mvc/Controller",
			   "sap/ui/model/json/JSONModel"], 
			   function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.Worker", {

		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Worker").attachMatched(this._onRouteMatched, this);
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "data");
		},

		_onRouteMatched: function (oEvent) {

			var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();			

			var XHR = new XMLHttpRequest();
			XHR.open("GET", "http://localhost:2403/worker/"+oArgs.id);
			XHR.send();

			XHR.onload = function () {
				if (XHR.status != 200) {

				} else {
					this.getView().getModel("data").setData(JSON.parse(XHR.response));
					//console.log(this.getView().getModel("data").getData());
				}
			}.bind(this);

			oView.bindElement({
				path: "/",
				model: "data"
			});
		},

		btnEditData: function(oEvent){

			if (oEvent.getSource().getPressed()) {

				this.getView().byId("iname").setEditable(true);
				this.getView().byId("iage").setEditable(true);
				this.getView().byId("icategory").setEditable(true);

			} else {

				var data = JSON.stringify({
					"name": this.getView().byId("iname").mProperties.value,
					"age": this.getView().byId("iage").mProperties.value,
					"category": this.getView().byId("icategory").mProperties.value
				});
	
				var xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				xhr.open("PUT", "http://localhost:2403/worker/"+this.getView().getModel("data").oData.id);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(data);

				this.getView().byId("iname").setEditable(false);
				this.getView().byId("iage").setEditable(false);
				this.getView().byId("icategory").setEditable(false);
			}
		},

		onNavBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Table");
		}
	});

});