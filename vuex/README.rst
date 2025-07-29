Vuex
====

This module integrates `Vuex <https://vuex.vuejs.org>`_ with the frontend assets of Odoo.

Usage Example
-------------
This example requires that you master of the following topics:

* Creating a Vuejs application with Vuex
* Creating a Odoo javascript extension

Creating a Store
~~~~~~~~~~~~~~~~
Add a file app.js which defines your Vue application.

.. code-block:: javascript

    require("web.dom_ready");

    if (!$("#my_app_node").length) {
      return $.Deferred().reject("DOM doesn't contain '#my_app_node'");
    }

    const store = require("vuex.store");
    const app = new Vue({store}).$mount('#app');

Inside other javascript files, you may register your vuex modules:

.. code-block:: javascript

    const store = require("vuex.store");
    store.registerModule(
        "myModule",
        {
            namespaced: true,
            state: {
                ...
            },
            actions: {
                ...
            },
            mutations: {
                ...
            },
        }      
    )

Contributors
------------

The `Numigi <https://numigi.com/r/home>`_ team is the contributor to this project. We help Quebec companies implement Odoo and Konvergo ERP.
