sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
], function (Controller, MessageToast, JSONModel, UIComponent) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.Supplier", {

        onInit: function () {

            var router = UIComponent.getRouterFor(this);
            router.getRoute("Supplier").attachMatched(this._onRouteMatched, this);
            var oModel = new JSONModel();
			this.getView().setModel(oModel, "modelSupplier");

            },

		_onRouteMatched : function (oEvent) {

            var id = oEvent.getParameter("arguments").id;

            this.oDataModel = new sap.ui.model.odata.ODataModel("https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc");
			this.oDataModel.read("/Products("+id+")/Supplier",
			null,
			null,
			false,
			function(oData, oResponse){

			// set the odata JSON as data of JSON model
            this.getView().getModel("modelSupplier").setData(oData);

            this.getView().bindElement({
				path: "/",
				model: "modelSupplier"
			});
            
            //console.log(this.getView().getModel("modelSupplier").getData());

            }.bind(this)          
           );	

		},

		onNavBack: function(){
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("oDataExample");
		}

		
})
});