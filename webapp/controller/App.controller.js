sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.datamining27.controller.App", {
    onInit() {
      this._getData();
  },
  _getData: function () {
      let entitySet = "/ymin_enSet";
      let oModel = this.getOwnerComponent().getModel();
      oModel.read(entitySet, {
          success: (oData, response) => {
              var oModelData = new sap.ui.model.json.JSONModel(oData.results);
              this.getView().setModel(oModelData, "CustomerModel");
          },
          error: () => { }
      });
  }
  });
});