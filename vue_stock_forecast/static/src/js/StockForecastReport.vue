<template>

<div class="stock-forecast-report" v-show="visible">
    <el-card class="stock-forecast-report__filters">
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Location')">
                <many2many ref="locations" :search="searchStockLocations" @change="onLocationChange"></many2many>
            </el-form-item>
            <el-form-item :label="translate('Supplier')">
                <many2many ref="suppliers" :search="searchSuppliers" @change="onSupplierChange"></many2many>
            </el-form-item>
        </el-form>

        <!-- Product / Category Options -->
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Rows')">
                <el-select v-model="rowGroupBy" @change="onRowGroupByChange">
                    <el-option
                        :label="item.label" :value="item.value"
                        v-for="item in rowGroupByOptions" :key="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="translate('Products')" v-show="rowGroupBy === 'product'">
                <many2many ref="products" :search="searchProducts" @change="onProductChange"></many2many>
            </el-form-item>
            <el-form-item :label="translate('Product Categories')">
                <many2many ref="categories" :search="searchProductCategories" @change="onProductCategoryChange"></many2many>
            </el-form-item>
        </el-form>

        <!-- Date Options -->
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Columns')">
                <el-select v-model="dateGroupBy">
                    <el-option
                        :label="item.label" :value="item.value"
                        v-for="item in dateGroupByOptions" :key="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="translate('Start Date')">
                <el-date-picker type="date" v-model="dateFrom"></el-date-picker>
            </el-form-item>
            <el-form-item :label="translate('End Date')">
                <el-date-picker type="date" v-model="dateTo"></el-date-picker>
            </el-form-item>
        </el-form>
    </el-card>
    <stock-forecast-table
        :dateFrom="effectiveDateFrom"
        :dateTo="effectiveDateTo"
        :dateGroupBy="dateGroupBy"
        :rowGroupBy="rowGroupBy"
        :rows="rows"
        :translate="translate"
        @current-stock-clicked="(row) => $emit('current-stock-clicked', row)"
        @move-amount-clicked="(row, dateFrom, dateTo) => $emit('move-amount-clicked', row, dateFrom, dateTo)"
        />
</div>

</template>

<script>

export default {
    props: {
        // Filter widgets props
        searchProducts: {
            type: Function,
            required: true,
        },
        searchProductCategories: {
            type: Function,
            required: true,
        },
        searchStockLocations: {
            type: Function,
            required: true,
        },
        searchSuppliers: {
            type: Function,
            required: true,
        },

        // Function to call when a filter input (many2many field) was changed.
        onFilterChange: {
            type: Function,
            required: true,
        },


        // Injected function for translating the widget labels.
        translate: {
            type: Function,
            required: true,
        },
    },
    data(){
        return {
            dateFrom: "",
            dateTo: "",
            dateGroupBy: "month",
            rowGroupBy: "product",
            locations: [],
            productCategories: [],
            products: [],
            suppliers: [],
            rows: [],
            visible: true,
        };
    },
    computed: {
        effectiveDateFrom(){
            return this.dateFrom || new Date();
        },
        effectiveDateTo(){
            return this.dateTo || moment(new Date()).add(6, this.dateGroupBy).toDate();
        },
        dateGroupByOptions(){
            return [
                {value: "day", label: this.translate("Day")},
                {value: "week", label: this.translate("Week")},
                {value: "month", label: this.translate("Month")},
            ];
        },
        rowGroupByOptions(){
            return [
                {value: "product", label: this.translate("Product")},
                {value: "category", label: this.translate("Product Category")},
            ];
        },
    },
    methods: {
        setProducts(products){
            this.products = products.map((r) => {return {id: r[0], name: r[1]}});
            this.$refs.products.setItems(products);
        },
        setProductCategories(categories){
            this.categories = categories.map((r) => {return {id: r[0], name: r[1]}});
            this.$refs.categories.setItems(categories);
        },
        setLocations(locations){
            this.locations = locations.map((r) => {return {id: r[0], name: r[1]}});
            this.$refs.locations.setItems(locations);
        },
        onRowGroupByChange(value){
            this.onFilterChange();
        },
        onProductChange(value){
            this.products = value;
            this.onFilterChange();
        },
        onProductCategoryChange(value){
            this.productCategories = value;
            this.onFilterChange();
        },
        onSupplierChange(value){
            this.suppliers = value;
            this.onFilterChange();
        },
        onLocationChange(value){
            this.locations = value;
            this.onFilterChange();
        },
    }
};

</script>
