
sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller, Filter, FilterOperator, MessageBox) => {
    "use strict";

    return Controller.extend("app.datamining27.controller.DataMiningView", {
        
        onInit() {
            this._getData();
        },
        _getData: function () {
            let enititySet = "/ymin_enSet"
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "CustomerModel");
                },
                error: () => { }
            })
        },

            onFilter: function() {
                let aFilter = [];
      
                let sLocid = this.getView().byId("idLocid").getValue();
                let sLocdesc = this.getView().byId("idLocdesc").getValue();
                let sMinres = this.getView().byId("onMinres").getValue();
                let sCost = this.getView().byId("onCost").getValue();
                let sType = this.getView().byId("onType").getValue();
    
                if (sLocid) {
                    let filterName = new Filter("LocId", FilterOperator.Contains, sLocid);
                    aFilter.push(filterName);
                }
                if (sLocdesc) {
                    let filterName = new Filter("LocDesc", FilterOperator.Contains, sLocdesc);
                    aFilter.push(filterName);
                }
                if (sMinres) {
                    let filterName = new Filter("MiningResourceAllocated", FilterOperator.Contains, sMinres);
                    aFilter.push(filterName);
                }
                if (sCost) {
                    let filterName = new Filter("TotalCost", FilterOperator.Contains, sCost);
                    aFilter.push(filterName);
                }
                if (sType) {
                    let filterName = new Filter("TypeOfMineral", FilterOperator.Contains, sType);
                    aFilter.push(filterName);
                }
    
                let oTable = this.getView().byId("table");
                let bindingInfo = oTable.getBinding("items");
                if (bindingInfo) {
                    bindingInfo.filter(aFilter);
                }
            },

            onCreate: function() {
                var oRouter = this.getRouter();
                oRouter.navTo("RouteCreateView");
            },

            onDelete: function(oEvent) {
                let oContext = oEvent.getSource().getBindingContext("CustomerModel").getObject();
                MessageBox.confirm("Are you sure about deleting this entry?", {
                    onClose: (choice) => {
                        if (choice === "OK") {
                            this._onDeleteCall(oContext);
                        }
                    }
                });
            },
    
            _onDeleteCall: function(param) {
                let key1 = param.LocId;
                var key2 = param.LocDesc;
                let key3 = param.MiningResourceAllocated;

                key2=key2.replace(/ /g, "%20");

    
                let oModel = this.getOwnerComponent().getModel();
                let entity = `/ymin_enSet(LocId='${key1}',LocDesc='${key2}',MiningResourceAllocated='${key3}')`;
                oModel.remove(entity, {
                    success: (resp) => {
                        MessageBox.success("Entry deleted successfully!",{
                            onClose:function(){
                                this._getData()
                            }.bind(this)
                        })
    
                        // this._refreshPage(); // Call the refresh function after deletion
                    },
                    error: (error) => {
                        MessageBox.error("Deletion failed");
                    }
                });
            },
    
            _refreshPage: function() {
                this.onInit(); // Call the existing onInit function to refresh the page
            },
            
            onRowSelection: function (oEvent) {
                console.log(oEvent)
                           
                           
                var oList = oEvent.getParameter("listItem");
                let sPath=oList.getBindingContextPath();
                let aItem=sPath.split("/");
                let id=aItem[aItem.length-1];
     
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetailView", {
                    index:id
                });
            },
    });
});