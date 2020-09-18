Vue-Router
==========

This module integrates `Vue Router <https://router.vuejs.org>`_ with the frontend assets of Odoo.

Usage Example
-------------
This example requires that you master of the following topics:

* Creating a Vuejs application with VueRouter
* Creating a Odoo controller
* Creating a Odoo javascript extension

Creating a VueRouter instance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

First, in a qweb template, you must define where your application will be nested inside Odoo.

The above example inserts the application inside the portal.

.. code-block:: xml

    <template id="my_vuejs_application" name="Vuejs App">
        <t t-call="portal.portal_layout">
            <div id="my_app_node">
                <router-view></router-view>
            </div>
        </t>
    </template>

Finally, create a controller, so that when you navigate to the URL /my/hello/world,
the qweb template above is rendered.

.. code-block:: python

    class PortalWithVueJs(CustomerPortal):

        @route(["/my/hello/world"], type="http", auth="user", website=True)
        def my_vuejs_application(self, **kw):
            return request.render("my_module.my_vuejs_application", {})

Then, add a file app.js which defines your Vue application.

.. code-block:: javascript

    require("web.dom_ready");

    if (!$("#my_app_node").length) {
      return $.Deferred().reject("DOM doesn't contain '#my_app_node'");
    }

    const routerFactory = require("vue_router.routerFactory");
    const router = routerFactory.makeRouter();
    const app = new Vue({router}).$mount('#my_app_node');

Inside other javascript files, you may register your routes:

.. code-block:: javascript

    const HelloWorld = {
        template: `<div>Hello World</div>`,
    }
    const routerFactory = require("vue_router.routerFactory");
    routerFactory.addRoutes(
        [
            {
                path: "/my/hello/world",
                component: HelloWorld,
            }
        ]
    )

The reason to seperate the routes from the application is to make your application extendable.

Different Odoo modules may define their own routes.

The RouterFactory Instance
~~~~~~~~~~~~~~~~~~~~~~~~~~
The module defines a singleton ``RouterFactory`` in javascript that allows to register routes to the Odoo frontend.

This object has 2 methods:

1. ``addRoutes``: takes in parameter an array of routes.
2. ``makeRouter``: takes no parameter and returns a VueRouter instance.

The method ``addRoutes`` can be called multiple times with different arrays of routes.

However, it must be called before ``makeRouter``.
Otherwise, the added routes will not be passed to the VueRouter instance.

Contributors
------------
* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

More information
----------------
* Meet us at https://bit.ly/numigi-com
