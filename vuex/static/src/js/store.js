odoo.define("vuex.store", function (require) {
"use strict";

const Class = require("web.Class");

Vue.use(Vuex)
return new Vuex.Store({
	actions: {
		hello(context) {
			console.log("hello")
		}
	},
	modules: []
});

});
