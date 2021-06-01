/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastReport.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/StockForecastReport.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
    props: {
        // Filter widgets props
        searchProducts: {
            type: Function,
            required: true
        },
        searchProductCategories: {
            type: Function,
            required: true
        },
        searchStockLocations: {
            type: Function,
            required: true
        },
        searchSuppliers: {
            type: Function,
            required: true
        },

        // Function to call when a filter input (many2many field) was changed.
        onFilterChange: {
            type: Function,
            required: true
        },

        // Injected function for translating the widget labels.
        translate: {
            type: Function,
            required: true
        }
    },
    data: function data() {
        return {
            dateFrom: "",
            dateTo: "",
            dateGroupBy: "month",
            rowGroupBy: "product",
            locations: [],
            productCategories: [],
            products: [],
            suppliers: [],
            rows: [],
            visible: true,
            autocompleteValue: ""
        };
    },

    computed: {
        effectiveDateFrom: function effectiveDateFrom() {
            return this.dateFrom || new Date();
        },
        effectiveDateTo: function effectiveDateTo() {
            return this.dateTo || moment(new Date()).add(6, this.dateGroupBy).toDate();
        },
        dateGroupByOptions: function dateGroupByOptions() {
            return [{ value: "day", label: this.translate("Day") }, { value: "week", label: this.translate("Week") }, { value: "month", label: this.translate("Month") }];
        },
        rowGroupByOptions: function rowGroupByOptions() {
            return [{ value: "product", label: this.translate("Product") }, { value: "category", label: this.translate("Product Category") }];
        },
        filteredRows: function filteredRows() {
            var stringToMatch = (this.autocompleteValue || "").toLowerCase();
            return this.rows.filter(function (r) {
                return r.label.toLowerCase().indexOf(stringToMatch) !== -1;
            });
        }
    },
    methods: {
        setProducts: function setProducts(products) {
            this.products = products.map(function (r) {
                return { id: r[0], name: r[1] };
            });
            this.$refs.products.setItems(products);
        },
        setProductCategories: function setProductCategories(categories) {
            this.categories = categories.map(function (r) {
                return { id: r[0], name: r[1] };
            });
            this.$refs.categories.setItems(categories);
        },
        setLocations: function setLocations(locations) {
            this.locations = locations.map(function (r) {
                return { id: r[0], name: r[1] };
            });
            this.$refs.locations.setItems(locations);
        },
        onRowGroupByChange: function onRowGroupByChange(value) {
            this.onFilterChange();
        },
        onProductChange: function onProductChange(value) {
            this.products = value;
            this.onFilterChange();
        },
        onProductCategoryChange: function onProductCategoryChange(value) {
            this.productCategories = value;
            this.onFilterChange();
        },
        onSupplierChange: function onSupplierChange(value) {
            this.suppliers = value;
            this.onFilterChange();
        },
        onLocationChange: function onLocationChange(value) {
            this.locations = value;
            this.onFilterChange();
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastTable.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/js/StockForecastTable.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
    props: {
        dateFrom: {
            type: Date,
            required: true
        },
        dateTo: {
            type: Date,
            required: true
        },
        dateGroupBy: {
            type: String,
            required: true
        },
        rowGroupBy: {
            type: String,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        translate: {
            type: Function,
            required: true
        },
        firstColumnFixed: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        dateGroups: function dateGroups() {
            return getDateRange(this.dateFrom, this.dateTo, this.dateGroupBy || "month");
        },
        rowGroupLabel: function rowGroupLabel() {
            var label = this.rowGroupBy === "product" ? "Product" : "Product Category";
            return this.translate(label);
        }
    },
    methods: {
        productHasMovesAtDate: function productHasMovesAtDate(row, dateTo) {
            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy || "month").format("YYYY-MM-DD");
            function movesAtDate(move) {
                return dateFrom < move.date && move.date <= dateTo;
            }

            return row.incoming.filter(movesAtDate).length > 0 || row.outgoing.filter(movesAtDate).length > 0;
        },
        getStockValue: function getStockValue(row, dateTo) {
            var stockMoveSum = function stockMoveSum(result, move) {
                return result + move.qty;
            };

            var movesBeforeDate = function movesBeforeDate(move) {
                return move.date <= dateTo;
            };
            var incomingQty = row.incoming.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var outgoingQty = row.outgoing.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var stockAtDate = row.currentStock + incomingQty - outgoingQty;

            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy).format("YYYY-MM-DD");

            function movesAtDate(move) {
                return dateFrom < move.date && move.date <= dateTo;
            }
            var incomingQtyAtDate = row.incoming.filter(movesAtDate).reduce(stockMoveSum, 0);
            var outgoingQtyAtDate = row.outgoing.filter(movesAtDate).reduce(stockMoveSum, 0);

            if (incomingQtyAtDate && outgoingQtyAtDate) {
                return round(stockAtDate) + " (+" + round(incomingQtyAtDate) + " / " + "-" + round(outgoingQtyAtDate) + ")";
            } else if (incomingQtyAtDate) {
                return round(stockAtDate) + " (+" + round(incomingQtyAtDate) + ")";
            } else if (outgoingQtyAtDate) {
                return round(stockAtDate) + " (-" + round(outgoingQtyAtDate) + ")";
            } else {
                return round(stockAtDate);
            }
        },
        displayCurrentStock: function displayCurrentStock(row) {
            return round(row.currentStock);
        },
        displayReservedStock: function displayReservedStock(row) {
            return round(row.reserved);
        },
        displayAvailableStock: function displayAvailableStock(row) {
            return round(row.currentStock - row.reserved);
        },
        displayMinMax: function displayMinMax(row) {
            var min = row.min;
            var max = row.max;
            return (min || 0).toFixed() + " / " + (max || 0).toFixed();
        },
        displayPurchased: function displayPurchased(row) {
            return round(row.purchased);
        },
        currentStockClicked: function currentStockClicked(row) {
            this.$emit('current-stock-clicked', row);
        },
        minMaxClicked: function minMaxClicked(row) {
            this.$emit('min-max-clicked', row);
        },
        purchasedClicked: function purchasedClicked(row) {
            this.$emit('purchased-clicked', row);
        },
        moveAmountClicked: function moveAmountClicked(row, dateTo) {
            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy).add(1, "day").format("YYYY-MM-DD");
            this.$emit('move-amount-clicked', row, dateFrom, dateTo);
        }
    }
};


var nextGroupKey = 1;

function getDateRange(dateFrom, dateTo, dateGroupBy) {
    var dateRange = [];
    var currentMoment = moment(dateFrom);
    var momentTo = moment(dateTo);

    while (currentMoment < momentTo) {
        currentMoment.endOf(dateGroupBy);
        dateRange.push({
            key: nextGroupKey++,
            date: currentMoment.format("YYYY-MM-DD")
        });
        currentMoment.add(1, dateGroupBy);
    }

    return dateRange;
}

function round(amount) {
    return amount ? amount.toFixed(2).replace(" ", " ") : "0";
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastReport.vue?vue&type=template&id=72083510&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/StockForecastReport.vue?vue&type=template&id=72083510& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }
      ],
      staticClass: "stock-forecast-report"
    },
    [
      _c(
        "el-card",
        { staticClass: "stock-forecast-report__filters" },
        [
          _c(
            "el-form",
            {
              attrs: {
                model: _vm.$data,
                "label-width": "150px",
                "label-position": "left",
                inline: ""
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Location") } },
                [
                  _c("many2many", {
                    ref: "locations",
                    attrs: { search: _vm.searchStockLocations },
                    on: { change: _vm.onLocationChange }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Supplier") } },
                [
                  _c("many2many", {
                    ref: "suppliers",
                    attrs: { search: _vm.searchSuppliers },
                    on: { change: _vm.onSupplierChange }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form",
            {
              attrs: {
                model: _vm.$data,
                "label-width": "150px",
                "label-position": "left",
                inline: ""
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Rows") } },
                [
                  _c(
                    "el-select",
                    {
                      on: { change: _vm.onRowGroupByChange },
                      model: {
                        value: _vm.rowGroupBy,
                        callback: function($$v) {
                          _vm.rowGroupBy = $$v
                        },
                        expression: "rowGroupBy"
                      }
                    },
                    _vm._l(_vm.rowGroupByOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.rowGroupBy === "product",
                      expression: "rowGroupBy === 'product'"
                    }
                  ],
                  attrs: { label: _vm.translate("Products") }
                },
                [
                  _c("many2many", {
                    ref: "products",
                    attrs: { search: _vm.searchProducts },
                    on: { change: _vm.onProductChange }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Product Categories") } },
                [
                  _c("many2many", {
                    ref: "categories",
                    attrs: { search: _vm.searchProductCategories },
                    on: { change: _vm.onProductCategoryChange }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form",
            {
              attrs: {
                model: _vm.$data,
                "label-width": "150px",
                "label-position": "left",
                inline: ""
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Columns") } },
                [
                  _c(
                    "el-select",
                    {
                      model: {
                        value: _vm.dateGroupBy,
                        callback: function($$v) {
                          _vm.dateGroupBy = $$v
                        },
                        expression: "dateGroupBy"
                      }
                    },
                    _vm._l(_vm.dateGroupByOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("Start Date") } },
                [
                  _c("el-date-picker", {
                    attrs: { type: "date" },
                    model: {
                      value: _vm.dateFrom,
                      callback: function($$v) {
                        _vm.dateFrom = $$v
                      },
                      expression: "dateFrom"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: _vm.translate("End Date") } },
                [
                  _c("el-date-picker", {
                    attrs: { type: "date" },
                    model: {
                      value: _vm.dateTo,
                      callback: function($$v) {
                        _vm.dateTo = $$v
                      },
                      expression: "dateTo"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-card",
        [
          _c(
            "el-form",
            {
              attrs: {
                model: _vm.$data,
                "label-width": "150px",
                "label-position": "left",
                inline: ""
              }
            },
            [
              _c(
                "el-form-item",
                {
                  staticStyle: { margin: "0" },
                  attrs: { label: _vm.translate("Search") }
                },
                [
                  _c("el-input", {
                    staticClass: "inline-input",
                    staticStyle: { width: "400px" },
                    model: {
                      value: _vm.autocompleteValue,
                      callback: function($$v) {
                        _vm.autocompleteValue = $$v
                      },
                      expression: "autocompleteValue"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("stock-forecast-table", {
        attrs: {
          dateFrom: _vm.effectiveDateFrom,
          dateTo: _vm.effectiveDateTo,
          dateGroupBy: _vm.dateGroupBy,
          rowGroupBy: _vm.rowGroupBy,
          rows: _vm.filteredRows,
          translate: _vm.translate
        },
        on: {
          "current-stock-clicked": function(row) {
            return _vm.$emit("current-stock-clicked", row)
          },
          "min-max-clicked": function(row) {
            return _vm.$emit("min-max-clicked", row)
          },
          "purchased-clicked": function(row) {
            return _vm.$emit("purchased-clicked", row)
          },
          "move-amount-clicked": function(row, dateFrom, dateTo) {
            return _vm.$emit("move-amount-clicked", row, dateFrom, dateTo)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "stock-forecast-table" },
    [
      _c(
        "el-table",
        { attrs: { data: _vm.rows, height: "800", border: "" } },
        [
          _c("el-table-column", {
            attrs: {
              label: _vm.rowGroupLabel,
              width: "300",
              fixed: _vm.firstColumnFixed
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("div", [
                      _vm._v(
                        "\n          " + _vm._s(scope.row.label) + "\n        "
                      )
                    ])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              label: _vm.translate("Stock"),
              width: "150",
              align: "center"
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    scope.row.currentStock
                      ? _c(
                          "div",
                          {
                            staticClass: "stock-forecast-table__link",
                            on: {
                              click: function($event) {
                                _vm.currentStockClicked(scope.row)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n          " +
                                _vm._s(_vm.displayCurrentStock(scope.row)) +
                                "\n        "
                            )
                          ]
                        )
                      : _c("div", [_vm._v("0")])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              label: _vm.translate("Reserved"),
              width: "150",
              align: "center"
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("div", [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.displayReservedStock(scope.row)) +
                          "\n        "
                      )
                    ])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              label: _vm.translate("Available"),
              width: "150",
              align: "center"
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c("div", [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.displayAvailableStock(scope.row)) +
                          "\n        "
                      )
                    ])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              label: _vm.translate("Min / Max"),
              width: "150",
              align: "center"
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "div",
                      {
                        staticClass: "stock-forecast-table__link",
                        on: {
                          click: function($event) {
                            _vm.minMaxClicked(scope.row)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.displayMinMax(scope.row)) +
                            "\n        "
                        )
                      ]
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              label: _vm.translate("Quotation"),
              width: "150",
              align: "center"
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "div",
                      {
                        staticClass: "stock-forecast-table__link",
                        on: {
                          click: function($event) {
                            _vm.purchasedClicked(scope.row)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.displayPurchased(scope.row)) +
                            "\n        "
                        )
                      ]
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _vm._l(_vm.dateGroups, function(dateGroup) {
            return _c("el-table-column", {
              key: dateGroup.key,
              attrs: { label: dateGroup.date, width: "150", align: "center" },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(scope) {
                    return [
                      _vm.productHasMovesAtDate(scope.row, dateGroup.date)
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "stock-forecast-table__link stock-forecast-table__amount",
                              on: {
                                click: function($event) {
                                  _vm.moveAmountClicked(
                                    scope.row,
                                    dateGroup.date
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n          " +
                                  _vm._s(
                                    _vm.getStockValue(scope.row, dateGroup.date)
                                  ) +
                                  "\n        "
                              )
                            ]
                          )
                        : _c("div", [
                            _vm._v(
                              _vm._s(
                                _vm.getStockValue(scope.row, dateGroup.date)
                              )
                            )
                          ])
                    ]
                  }
                }
              ])
            })
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./src/js/StockForecastReport.vue":
/*!****************************************!*\
  !*** ./src/js/StockForecastReport.vue ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockForecastReport.vue?vue&type=template&id=72083510& */ "./src/js/StockForecastReport.vue?vue&type=template&id=72083510&");
/* harmony import */ var _StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockForecastReport.vue?vue&type=script&lang=js& */ "./src/js/StockForecastReport.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/StockForecastReport.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/StockForecastReport.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/js/StockForecastReport.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--0!../../node_modules/vue-loader/lib??vue-loader-options!./StockForecastReport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastReport.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/StockForecastReport.vue?vue&type=template&id=72083510&":
/*!***********************************************************************!*\
  !*** ./src/js/StockForecastReport.vue?vue&type=template&id=72083510& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./StockForecastReport.vue?vue&type=template&id=72083510& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastReport.vue?vue&type=template&id=72083510&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastReport_vue_vue_type_template_id_72083510___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/StockForecastTable.vue":
/*!***************************************!*\
  !*** ./src/js/StockForecastTable.vue ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockForecastTable.vue?vue&type=template&id=429bcb8c& */ "./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c&");
/* harmony import */ var _StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockForecastTable.vue?vue&type=script&lang=js& */ "./src/js/StockForecastTable.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/StockForecastTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/js/StockForecastTable.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/js/StockForecastTable.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--0!../../node_modules/vue-loader/lib??vue-loader-options!./StockForecastTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastTable.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c&":
/*!**********************************************************************!*\
  !*** ./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./StockForecastTable.vue?vue&type=template&id=429bcb8c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/js/StockForecastTable.vue?vue&type=template&id=429bcb8c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockForecastTable_vue_vue_type_template_id_429bcb8c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _StockForecastReport = __webpack_require__(/*! ./StockForecastReport.vue */ "./src/js/StockForecastReport.vue");

var _StockForecastReport2 = _interopRequireDefault(_StockForecastReport);

var _StockForecastTable = __webpack_require__(/*! ./StockForecastTable.vue */ "./src/js/StockForecastTable.vue");

var _StockForecastTable2 = _interopRequireDefault(_StockForecastTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component("stock-forecast-report", _StockForecastReport2.default);
Vue.component("stock-forecast-table", _StockForecastTable2.default);

window.vueStockForecast = { StockForecastReport: _StockForecastReport2.default, StockForecastTable: _StockForecastTable2.default };

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/js/main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });