# Element-Ui / Odoo Integration

This module allows to render Element-UI (https://element.eleme.io) components in the Odoo web interface.

## Translations

The Element UI components are translated using standard Odoo po files.
This allows editing these transltions without adding javascript code.

Instead of the term being translated, these translations contain the placement of the term.
(i.e. `el.colorpicker.confirm`).

## Many2many Tags Component

The module also adds a many2many component based on the el-select widget.

The component is globally registered as `many2many`.

Example of usage:

```xml
<template>
    <div class="my-component">
        <many2many search="searchProducts" @change="onProductsChange"></many2many>
    </div>
</template>
<script>
export default {
    ...
    methods: {
        searchProducts(query){
            // Search the records however the odoo frameworks allows to.
            rpc.dataset('/web/dataset/name_search', {model: 'product.product', name: query} ...
        },
        onProductsChange(products){
            Do something with the list of products.
        },
    }
}
</script>
```

The rendered component should look like the following:

![Many2many](static/description/many2many.png?raw=true)

This widget does not depend on Odoo's api.
Instead, it enables injecting a search method to handle the queries to the server.

When the selection changes, the change signal is emited.

## Contributors

* Numigi (tm) and all its contributors (https://bit.ly/numigiens)

## More information

* Meet us at https://bit.ly/numigi-com
