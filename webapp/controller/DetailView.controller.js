sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("app.datamining27.controller.DetailView", {

        onInit() {
 
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            let oRoute = oRouter.getRoute("RouteDetailView");
            oRoute.attachPatternMatched(this._onPatternMatched, this);
            // this._getData();
        },

        onRouteMatched: function (oEvent) {
            let index = oEvent.getParameter("arguments").index;
            let sPath = "CustomerModel>/" + index;
            let oView = this.getView();
            oView.bindElement(sPath);

        },
        _onPatternMatched: function () {
            this._getData();
        },


        _getData: function () {
            let enititySet = `/ymin_enSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "CustomerModel");
                },
                error: () => { }
            })
        },
        onUpdate: function (oEvent) {
            var oButton = oEvent.getSource(); // Get the button that was clicked
            var oContext = oButton.getBindingContext("CustomerModel"); // Get the binding context of the button
            var sPath = oContext.getPath(); // Get the path of the context
            let aItems = sPath.split("/");
            let id = aItems[aItems.length - 1];

            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteUpdateView", {
                index: id
            });
        },
        onDataminingView: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDataMiningView")
        }

    });
});