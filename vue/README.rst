================================
Vuejs / Odoo Integration
================================

This module allows rendering Vuejs components in the Odoo web interface.

Querying Odoo Data
------------------

The module adds the following assets for easily querying records from Odoo.

Query Builder
^^^^^^^^^^^^^

The query builder is an object used for easily searching and reading records from the server.

Example of usage:

.. code-block:: javascript

    /** @odoo-module **/

    import QueryBuilder from '@vue/js/QueryBuilder';
    (async function testQueryBuilder() {
        const query = new QueryBuilder("res.partner", ["display_name", "email", "phone"]);
        query.filter([["id", ">", 5]]);
        try {
            const customers = await query.searchRead();
            customers.forEach((customer) => {
                console.log(`Client : ${customer.display_name}, Email : ${customer.email}, Phone : ${customer.phone}`);
            });
        } catch (error) {
            console.error("Name :", error);
        }
    })();

Xml References
^^^^^^^^^^^^^^

The ``getXmlId`` function allows you to easily retrieve an XML ID from Odoo.

Example of usage:

.. code-block:: javascript

    import getXmlId from '@vue/js/GetXmlId';



    (async function testGetXmlId() {
        try {
            const partnerId = await getXmlId("base.res_partner_address_16");
            console.log("ID  :", partnerId);
        } catch (error) {
            console.error("Error :", error);
        }
    })();

Calling ``getXmlId()`` with the same reference multiple times will not trigger multiple HTTP queries.

Contributors
------------

* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

More information
-----------------

* Meet us at https://bit.ly/numigi-com