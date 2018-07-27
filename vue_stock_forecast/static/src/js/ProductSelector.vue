<template>
<div>
    <el-select
        v-model="products"
        multiple
        value-key="key"
        placeholder="Select"
        :remote-method="_searchProducts"
        @change="_onChange"
        @visible-change="_onVisibleChange"
        >
        <el-option
            v-for="item in _selection"
            :key="item.key" :label="item.label" :value="item.key">
        </el-option>
    </el-select>
</div>
</template>
<script>

export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
        // An Odoo web.DataSet instance
        dataSet: {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            _selection: [],
        };
    },
    watch: {
        products(){
            this._addMissingProducts();
        },
        _selection(){
            this._addMissingProducts();
        },
    },
    methods: {
        async _searchProducts(query){
            var nameSearchResult = await this.dataset.name_search(query, [], 'ilike', 20);
            var productsFound = nameSearchResult.map(r => {
                return {key: r[0], label: r[1]};
            });
            this._selection = productsFound;
        },
        _addMissingProducts(){
            var availableKeys = this._selection.map(p => p.key);
            var missingProducts = this.products.filter(p => availableKeys.indexOf(p.key) === undefined);
            this._selection = this._selection.concat(missingProducts);
        },
        _onChange(){

        },
        _onVisibleChange(){

        },
    },
};
    
</script>
