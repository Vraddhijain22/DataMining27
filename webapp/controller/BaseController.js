sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (Controller) => {
    "use strict";
  
    return Controller.extend("app.datamining27.controller.BaseController", {
        onInit() {},
        getRouter: function() {
            return this.getOwnerComponent().getRouter()
        },
        getModel: function(model) {
            return this.getOwnerComponent().getModel(model)
        }
    });
  });