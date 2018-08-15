# Stock Forecast

A dynamic stock forecasting report.

The report displays:

* The quantities currently reserved and available in stock in the selected stock locations.
* The planned stock moves for the following days / weeks / months.

![Report](static/description/report.png?raw=true)

## Behavior

When clicking on a blue amount, the detail that composes this amount is displayed.

![Report Links](static/description/report_links.png?raw=true)

Here, when clicking on the amount in stock `8`, the list of Quants is displayed:

![Stock Quants](static/description/stock_quants.png?raw=true)

Here, when clicking on the amount for a given month `128 (+120)`, the list of stock moves is displayed:

![Stock Moves](static/description/stock_moves.png?raw=true)

## Filters

Available filters include `Locations`, `Products`, `Product Categories`, `Start Date` and `End Date`.
When changing the selected filters, the table is automatically updated.

![Filters](static/description/filters.png?raw=true)

## Grouping Rows

The rows can be grouped by `Product` or `Product Category`.

When grouping by categories, all children category are also displayed in the table.

![Group By Category](static/description/group_by_category.png?raw=true)

## Grouping Columns

The columns can be grouped by `Day`, `Week` or `Month`.

By default 6 columns of stock moves are displayed.
By selecting specific `Start Date` and `End Date`, you can see more columns.

![More Columns](static/description/report_with_more_columns.png?raw=true)

## Contributors

* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

## More information

* Meet us at https://bit.ly/numigi-com
