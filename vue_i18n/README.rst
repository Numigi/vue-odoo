Vue-I18n
========

This module integrates `Vue I18n <https://kazupon.github.io/vue-i18n>`_ with the frontend assets of Odoo.

Usage Example
-------------
This example requires that you master of the following topics:

* Creating a Vuejs application with VueI18n
* Creating a Odoo javascript extension

Creating a VueI18n instance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In a file app.js, define your Vue application.

.. code-block:: javascript

    require("web.dom_ready");

    if (!$("#my_app_node").length) {
      return $.Deferred().reject("DOM doesn't contain '#my_app_node'");
    }

    const i18nFactory = require("vue_i18n.i18nFactory");
    i18nFactory.setLang("fr_FR")

    const i18n = i18nFactory.makeI18n();
    const app = new Vue({i18n}).$mount('#my_app_node');

Inside other javascript files, you may register your messages:

.. code-block:: javascript

    const i18nFactory = require("vue_i18n.i18nFactory");
    i18nFactory.addMessages(
        {
            en: {
                foo: "bar",
            },
            fr_FR: {
                foo: "baz",
            },
        }
    )

Known Issues
------------
The module does not define how to get the language of the user.

In the example above, it is hardcoded to "fr_FR".

Getting the current user's language from the frontend point of view in Odoo is not trivial.
You may not merely call ``navigator.language``.

Contributors
------------
* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

More information
----------------
* Meet us at https://bit.ly/numigi-com
