sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("task.Task2SAPUI5.controller.Inputs", {

		onInit: function () {},

		navToTable: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("Table");
		},

		navToMain: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("View1");
		}
	});
});