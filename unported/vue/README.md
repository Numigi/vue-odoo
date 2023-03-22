# Vuejs / Odoo Integration

This module allows to render Vuejs components in the Odoo web interface.

## Querying Odoo Data

The module adds the following assets for easily querying records from Odoo.

### Query Builder

The query builder is an object used for easily searching and reading records from the server.

Example of usage:

```javascript
odoo.define("my_module.myFeature", (require) => {

var QueryBuilder = require("vue.QueryBuilder")

var query = new QueryBuilder('res.partner', ['display_name', 'zip', 'city', 'country_id'])
query.filter([['customer', '=', true]])
query.searchRead().then((customers) => {
    // do something with customers
})

})
```

### Xml References

The getXmlId function allows to easily retreive an xml id from Odoo.

Example of usage:

```javascript
odoo.define("my_module.myFeature", (require) => {

var getXmlId = require("vue.getXmlId")

getXmlId("stock.route_warehouse0_mto").then((routeId) => {
    // do something with the route id
})

})
```

Calling getXmlId() with the same reference multiple times will not trigger multiple http queries.

## Contributors

* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

## More information

* Meet us at https://bit.ly/numigi-com
