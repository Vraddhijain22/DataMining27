sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
  ], (BaseController, JSONModel,MessageBox) => {
    "use strict";
   
    return BaseController.extend("app.datamining27.controller.UpdateView", {
      onInit() {
   
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        let oRoute = oRouter.getRoute("RouteUpdateView");
        oRoute.attachPatternMatched(this._onPatternMatched, this);
   
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
      onUpdateItem:function(oEvent){
          let oContext = oEvent.getSource().getBindingContext("CustomerModel").getObject();
          console.log("Context object:", oContext)
          this._onUpdateCall(oContext);
      },
     
      _onUpdateCall: function(parm) {
          let key1 = parm.LocId;
          let key2 = parm.LocDesc
          let key3 = parm.MiningResourceAllocated
          key2=key2.replace(/ /g, "%20");
   
          var NoDrill=parseInt(parm.NoOfDrills) 
        //   need to be changed
   
   
     
          let oModel = this.getOwnerComponent().getModel();
          let entity = "/ymin_enSet(LocId='"+key1+"',LocDesc='"+key2+"',MiningResourceAllocated='"+key3+"')";
                                                             
   
          let updatedData = {
              TotalCost: parm.TotalCost,
              ReportOfPossibleMineral: parm.ReportOfPossibleMineral,
              NoOfDrills: NoDrill,
              TypeOfMineral: parm.TypeOfMineral
          };
          console.log("Payload being sent:", updatedData);
          oModel.update(entity, updatedData, {
              method: "PATCH",
              success: (resp) => {
                  MessageBox.success("Record Updated", {
                      onClose: function() {
                          var oRouter = this.getOwnerComponent().getRouter();
                          oRouter.navTo("RouteDataMiningView", {}, true);
                      }.bind(this)
                  });
              },
              error: (err) => {
                  MessageBox.error("Update failed");
              }
          });
      },
      onView:function(){
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteDataMiningView")
       
      }
    });
  });