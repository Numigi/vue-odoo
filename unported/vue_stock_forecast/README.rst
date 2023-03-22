Stock Forecast
==============

A dynamic stock forecasting report.

.. contents:: Table of Contents

The report displays:

* The quantities currently reserved and available in stock in the selected stock locations.
* The planned stock moves for the following days / weeks / months.

.. image:: static/description/report.png

Behavior
--------
When clicking on a blue amount, the detail that composes this amount is displayed.

.. image:: static/description/report_links.png

Here above, when clicking on the amount in stock `8`, the list of Quants is displayed:

.. image:: static/description/stock_quants.png

When clicking on the amount for a given month `128 (+120)`, the list of stock moves is displayed:

.. image:: static/description/stock_moves.png

Filters
-------
Available filters include `Locations`, `Products`, `Product Categories`, `Start Date` and `End Date`.
When changing the selected filters, the table is automatically updated.

.. image:: static/description/filters.png

Supplier Filter
~~~~~~~~~~~~~~~
It is also possible to filter by the list of suppliers of products.

.. image:: static/description/product_suppliers.png

.. image:: static/description/report_supplier_filter.png

.. image:: static/description/report_filtered_by_supplier.png

By default, the module show all products that have at least one price entry for the selected supplier.

The module ``vue_stock_forecast_preferred_supplier`` defines an alternative behavior.
See the module's README for more info.

Grouping Rows
-------------
The rows can be grouped by `Product` or `Product Category`.

When grouping by categories, all children category are also displayed in the table.

.. image:: static/description/group_by_category.png

Grouping Columns
----------------
The columns can be grouped by `Day`, `Week` or `Month`.

By default 6 columns of stock moves are displayed.
By selecting specific `Start Date` and `End Date`, you can see more columns.

.. image:: static/description/report_with_more_columns.png

Min / Max
---------
Since version 1.2.0 of the module, the report shows the aggregated sum of reordering rules (Min / Max).

.. image:: static/description/report_min_max.png

By clicking on the number, the list of reordering rules for this product is displayed.

.. image:: static/description/reordering_rules_list.png

Purchase Quotations
-------------------
Since version 1.2.0 of the module, the report shows the quantities in draft (or sent) purchase quotations.

.. image:: static/description/report_quotations.png

By clicking on the number, the list of purchase order lines for this product is displayed.

.. image:: static/description/purchase_order_line_list.png

Search Bar
----------
Since version 1.2.0 of the module, a new search bar is available to filter the report lines.

.. image:: static/description/search_bar.png

When typing in the search bar, the lines are filtered in real-time.

.. image:: static/description/report_lines_filtered.png

Product Smart Button
--------------------
A smart button is added on the form view of products in order to show the report.

.. image:: static/description/product_form.png

When accessing the report from a product template with multiple variants, the report is displayed for all variants.

.. image:: static/description/report_with_product_variants.png

Purchase Order Smart Button
---------------------------
Since version 1.3.0 of the module, a smart button is also available from a purchase order.

.. image:: static/description/purchase_order_form.png

When I click on the button, the report is opened with the products contained in the purchase order.

.. image:: static/description/report_from_purchase_order.png

Contributors
------------
* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

More information
----------------

* Meet us at https://bit.ly/numigi-com
