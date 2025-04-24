sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
  ],
  
  function(BaseController, Controller, MessageBox,JSONModel) {
    "use strict";
  
    return Controller.extend("app.datamining27.controller.CreateView", {
        onInit: function() {
            let oView = this.getView();
            let fieldIds =  ["LocIdInput", "LocDescInput", "MiningResourceAllocatedInput", "TotalCostInput", "ReportOfPossibleMineralInput", "NoOfDrillsInput", "TypeOfMineralInput" ];
       
            fieldIds.forEach(fieldId => {
                oView.byId(fieldId).attachChange(this.onSetNone, this);
            });
        },
        
        onSetNone: function (oEvent) {
            oEvent.getSource().setValueState("None");
        },
        _clearFields: function () {
            let oView = this.getView();
            ["LocIdInput", "LocDescInput", "MiningResourceAllocatedInput", "TotalCostInput", "ReportOfPossibleMineralInput", "NoOfDrillsInput","TypeOfMineralInput" ].forEach(fieldId => {
                oView.byId(fieldId).setValue("");
                oView.byId(fieldId).setValueState("None");
            });
        },
        onDataMiningView: function () {
            this._clearFields()
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDataMiningView")
        },
        onSubmit: function() {
            var oLocId = this.getView().byId("LocIdInput");
            var oLocDesc = this.getView().byId("LocDescInput");
            var oMiningResourceAllocated = this.getView().byId("MiningResourceAllocatedInput");
            var oTotalCost = this.getView().byId("TotalCostInput");
            var oReportOfPossibleMineral = this.getView().byId("ReportOfPossibleMineralInput");
            var oNoOfDrills = this.getView().byId("NoOfDrillsInput");
            var oTypeOfMineral = this.getView().byId("TypeOfMineralInput");
  
            // Get values
            let sLocId = oLocId.getValue();
            let sLocDesc = oLocDesc.getValue().toUpperCase();
            let sMiningResourceAllocated = oMiningResourceAllocated.getValue().toUpperCase();
            let sTotalCost = oTotalCost.getValue();
            let sReportOfPossibleMineral = oReportOfPossibleMineral.getValue();
            var sNoOfDrills = oNoOfDrills.getValue();
            let sTypeOfMineral = oTypeOfMineral.getValue().toUpperCase();

            sNoOfDrills=parseInt(sNoOfDrills)

            oLocId.setValueState("None");
            oLocDesc.setValueState("None");
            oMiningResourceAllocated.setValueState("None");
            oTotalCost.setValueState("None");
            oReportOfPossibleMineral.setValueState("None");
            oNoOfDrills.setValueState("None");
            oTypeOfMineral.setValueState("None");
 
 
 
                let hasError = false;
                if (!sLocId) {
                    oLocId.setValueState("Error");
                    hasError = true;
                }
                if (!sLocDesc) {
                    oLocDesc.setValueState("Error");
                    hasError = true;
                }
                if (!sMiningResourceAllocated) {
                    oMiningResourceAllocated.setValueState("Error");
                    hasError = true;
                }
                if (!sTotalCost) {
                    oTotalCost.setValueState("Error");
                    hasError = true;
                }
                if (!sReportOfPossibleMineral) {
                    oReportOfPossibleMineral.setValueState("Error");
                    hasError = true;
                }
                if (!sNoOfDrills) {
                    oNoOfDrills.setValueState("Error");
                    hasError = true;
                }
                if (!sTypeOfMineral) {
                    oTypeOfMineral.setValueState("Error");
                    hasError = true;
                }
 
                if (hasError) {
                    MessageBox.error("Please fill in all the fields.");
                    return;
                }
 
            // var odate = new Date(sOdate).getTime();
            // let fdate = "/Date(" + odate + ")/";
  
            let payload = {
                "LocId": sLocId,
                "LocDesc": sLocDesc,
                "MiningResourceAllocated": sMiningResourceAllocated,
                "TotalCost": sTotalCost,
                "ReportOfPossibleMineral": sReportOfPossibleMineral,
                "NoOfDrills": sNoOfDrills,
                "TypeOfMineral": sTypeOfMineral
            };
  
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/ymin_enSet";
            let that = this
  
            oModel.create(entity, payload, {
                success: function() {
                    MessageBox.success("Entry published Successfully", {
                        onClose: function() {
                            that._clearFields()
                            let oRouter = that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteDataMiningView")
                            oLocId.setValue("")
                            oLocDesc.setValue("")
                            oMiningResourceAllocated.setValue("")
                            oTotalCost.setValue("")
                            oReportOfPossibleMineral.setValue("")
                            oNoOfDrills.setValue("")
                            oTypeOfMineral.setValue("")
                            location.reload()
  
                        }
                    })
                },
                error: function(error) {
                    MessageBox.error("Error: " + error.message)
                }
                
            });
        },
        onF4Help: function (oEvent) {
            // let myInputField where the popup actually popped up
            this.inputField = oEvent.getSource().getId();
            let enititySet = `/ymin_enSet`;
            let oModel = this.getOwnerComponent().getModel();
     
            // Fetch data from OData model
            oModel.read(enititySet, {
              success: (oData) => {
                let deepcopy = JSON.parse(JSON.stringify(oData.results));
                let oModelFrag = new JSONModel({ newSuppSet: deepcopy });
     
                if (!this.oDialog) {
                  this.oDialog = sap.ui.core.Fragment.load({
                    fragmentName: "app.datamining27.fragments.popUp",
                    controller: this
                  }).then((dialog) => {
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog);
                    this.getView().setModel(oModelFrag, "FragmentModel");
                    this.oDialog.open();
                  });
                } else {
                  this.oDialog.open();
                }
              },
              error: (oError) => {
                // Handle error
                sap.m.MessageToast.show("Error fetching data");
              }
            });
          },
     
          onConfirmSupplier: function (oEvent) {
            let oSelectedItems = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItems.getProperty("info");
            let onInput = sap.ui.getCore().byId(this.inputField);
            onInput.setValue(sValue);
          }
 
    });
  });