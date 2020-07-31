odoo.define("vue_router.routerFactory", function (require) {
"use strict";

const Class = require("web.Class");

const RouterFactory = Class.extend({
  init() {
    this.routes = [];
  },
  addRoutes(routes) {
    this.routes.push(...routes);
  },
  makeRouter(){
    return new VueRouter({
      mode: "history",
      routes: this.routes,
    })
  },
})

return new RouterFactory();

});
