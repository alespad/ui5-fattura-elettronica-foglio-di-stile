sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui5.demo.xmlwithstylesheet.controller.Main", {
            onInit: function () {
                this.fetchAndTransform();
              },
          
              fetchAndTransform: function () {
                var that = this;
          
                // Ottieni l'XML dall'API
                jQuery.ajax({
         //         url: "/getXml",
                  url: "test-fattura/IT01234567890_FPR01.xml.txt",
                  method: "GET",
                  success: function (xmlText) {
                    // Ottieni l'XSL dall'API
                    console.log(xmlText);
                    jQuery.ajax({
  //                    url: "/getXsl",
                   url: "test-fattura/FoglioStileAssoSoftware.xsl.txt",
                      method: "GET",
                      success: function (xslText) {
                        // Esegui la trasformazione XSLT
                       var xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml');
                       var xslDoc = new DOMParser().parseFromString(xslText, 'text/xml');


                        var xsltProcessor = new XSLTProcessor();
                        xsltProcessor.importStylesheet(xslDoc);
                        var transformedDoc = xsltProcessor.transformToDocument(xmlDoc);
          
                        // Converti il documento trasformato in una stringa HTML
                        var transformedHtml = new XMLSerializer().serializeToString(transformedDoc);
          
                        // Mostra il risultato nella pagina
                        that.byId("result").setContent(transformedHtml);
                      },
                      error: function (error) {
                        console.error('Errore nel recupero dell\'XSL:', error);
                      }
                    });
                  },
                  error: function (error) {
                    console.error('Errore nel recupero dell\'XML:', error);
                  }
                });
              }
          
            });
          });