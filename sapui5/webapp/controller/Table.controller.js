sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
], function (Controller, UIComponent, JSONModel, Export, ExportTypeCSV) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.Table", {

		onInit: function () {
			var router = UIComponent.getRouterFor(this);
			router.getRoute("Table").attachMatched(this._onRouteMatched, this);
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "data");	
		},

		onListItemPressed: function (oEvent) {
			var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext("data");

			sap.ui.core.UIComponent.getRouterFor(this).navTo("Worker", {
				id: oCtx.getProperty("id")
			});
		},
		
		_onRouteMatched: function (oEvent) {
			var XHR = new XMLHttpRequest();
			XHR.open("GET", "http://localhost:2403/worker");
			XHR.send();

			XHR.onload = function () {
				if (XHR.status != 200) {

				} else {
					this.getView().getModel("data").setData(JSON.parse(XHR.response));
					//console.log(this.getView().getModel("data").getData());
				}
			}.bind(this);
		},

		onSearchEmployeesTable: function (oEvent) {
			// create model filter
			var filters = [];
			var query = oEvent.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			var list = this.getView().byId("dataTable");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		onDelete: function () {
			var oList = this.getView().byId("dataTable");
			var oModel = oList.getModel("data");
			var oRows = oModel.getData();
			var aContexts = oList.getSelectedContexts();

			for (var i = aContexts.length - 1; i >= 0; i--) {
				var oThisObj = aContexts[i].getObject();
				var XHR = new XMLHttpRequest();
				var index = $.map(oRows, function (obj, index) {

					if (obj === oThisObj) {
						return index;
					}
				});

				XHR.open("DELETE", "http://localhost:2403/worker/"+oThisObj.id);
				XHR.send();
				oRows.splice(index, 1);
				
			}
			oModel.setData(oRows);
			oList.removeSelections(true);
		},

		onDataExport : function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel("data"),

				// binding information for the rows aggregation
				rows : {
					path : "/"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "Name",
					template : {
						content : "{name}"
					}
				}, {
					name : "Age",
					template : {
						content : "{age}"
					}
				}, {
					name : "Category",
					template : {
						content : "{category}"
					}
				}, {
					name : "ID",
					template : {
						content : "{id}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},

		navToInputs: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Inputs");
		},

		navToMain: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("View1");
		}
	});
});