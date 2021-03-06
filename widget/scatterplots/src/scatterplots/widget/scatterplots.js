/*
    scatterplots
    ========================

    @file      : scatterplots.js
    @version   : 1.0
    @author    : Simon Martyr
    @date      : Tue, 17 Nov 2015 10:24:43 GMT
    @copyright : 
    @license   : 

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "scatterplots/lib/jquery-1.11.2",
    "scatterplots/lib/scatter",
    "dojo/text!scatterplots/widget/template/scatterplots.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery, Plotly, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);
    //var Plotly = scatter; 

    // Declare widget's prototype.
    return declare("scatterplots.widget.scatterplots", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements


        // Parameters configured in the Modeler.
        mfGetData: "",
        main: "",
        yParm: "",
        xParm: "",
        xError: "",
        yError: "",
        modeParm: "",
        bubbleSize: "",
        typeParm: "",
        chartChoice: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _data: null,
        _handles: null,
        _contextObj: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
            this._data = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + ".postCreate");
            this._updateRendering();
            this._setupEvents();
        },


        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },


        // Attach events to HTML dom elements
        _setupEvents: function () {

        },

        // Rerender the interface.
        _updateRendering: function () {
            console.log("Scatter Plot - getting data");
            mx.data.action({
                params: {
                    actionname: this.mfGetData
                },
                callback: dojoLang.hitch(this, this._makeGraph)
            });

        },

        _makeGraph: function (objs) {
            console.log("Scatter Plot - got data, making Graph");

            if (objs.length == 0) { //data checker 
                $(this.domNode).html("no data to show");
                return;
            }

            for (var i in objs) {
                var errorFlag = false,
                    isBubble = false;
                if (this.bubbleSize != '') {
                    isBubble = true;
                }
                if (objs[i].get(this.xError) != '' ||
                    objs[i].get(this.yError) != '') {
                    errorFlag = true;
                }
                this._data.push(this._makeTrace(objs[i], errorFlag, isBubble));
            }

            Plotly.newPlot(this.domNode, this._data);


        },

        // Show an error message.
        _showError: function (message) {
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                "class": "alert alert-danger",
                "innerHTML": message
            });
            dojoConstruct.place(this.domNode, this._alertDiv);
        },

        _makeTrace: function (obj, error, bubble) {
            var newTrace = '';
            if (!error) {
                if (!bubble) {

                    newTrace = {
                        name: obj.get(this.nameParm),
                        x: obj.get(this.xParm).split(","),
                        y: obj.get(this.yParm).split(","),
                        mode: obj.get(this.modeParm),
                        type: obj.get(this.typeParm)
                    };

                } else {

                    newTrace = {
                        name: obj.get(this.nameParm),
                        x: obj.get(this.xParm).split(","),
                        y: obj.get(this.yParm).split(","),
                        mode: obj.get(this.modeParm),
                        type: obj.get(this.typeParm),
                        marker: {
                            size: obj.get(this.bubbleSize).split(",")
                        }
                    };

                }
            } else {
                if (!bubble) {

                    newTrace = {
                        name: obj.get(this.nameParm),
                        x: obj.get(this.xParm).split(","),
                        y: obj.get(this.yParm).split(","),
                        mode: obj.get(this.modeParm),
                        error_y: {
                            type: 'data',
                            array: obj.get(this.yError).split(","),
                            visible: true
                        },
                        error_x: {
                            type: 'data',
                            array: obj.get(this.xError).split(","),
                            visible: true
                        },
                        type: obj.get(this.typeParm)
                    };

                } else {

                    newTrace = {
                        name: obj.get(this.nameParm),
                        x: obj.get(this.xParm).split(","),
                        y: obj.get(this.yParm).split(","),
                        mode: obj.get(this.modeParm),
                        error_y: {
                            type: 'data',
                            array: obj.get(this.yError).split(","),
                            visible: true
                        },
                        error_x: {
                            type: 'data',
                            array: obj.get(this.xError).split(","),
                            visible: true
                        },
                        type: obj.get(this.typeParm),
                        marker: {
                            size: obj.get(this.bubbleSize).split(",")
                        }
                    };
                }
            }

            return newTrace;
        },

        // Add a validation.
        _addValidation: function (message) {
            this._showError(message);
        }


    });
});

require(["scatterplots/widget/scatterplots"], function () {
    "use strict";
});