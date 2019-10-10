sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.oDataController", {

		onInit: function () {
			this.oDataModel = new sap.ui.model.odata.ODataModel("https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc");
			this.oDataModel.read("/Products",
			null,
			null,
			false,
			function(oData, oResponse){
				
			var table = this.getView().byId("dataProductTable");
           
			// create JSON model
			var oODataJSONModel =  new sap.ui.model.json.JSONModel();
			 
			// set the odata JSON as data of JSON model
			oODataJSONModel.setData(oData.results);
		   
			// store the model
			table.setModel(oODataJSONModel, "localModel");
			//console.log(table.getModel("localModel")); //successful output
			 
			}.bind(this)          
		   );	
			
		
		},

		navToSupplierView: function (oEvent) {
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext("localModel");

			sap.ui.core.UIComponent.getRouterFor(this).navTo("Supplier", {
				id: oCtx.getProperty("ID")
			});
		},

		onNavBack: function(){
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("View1");
		}
})
});