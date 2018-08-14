<template>

<div class="stock-forecast-report">
    <el-card class="stock-forecast-report__filters">
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Location')">
                <many2many :searchItems="searchStockLocations" @change="_onLocationChange"></many2many>
            </el-form-item>
        </el-form>

        <!-- Product / Category Options -->
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Rows')">
                <el-select v-model="rowGroupBy" @change="_onRowGroupByChange">
                    <el-option
                        :label="item.label" :value="item.value"
                        v-for="item in rowGroupByOptions" :key="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="translate('Products')" v-show="rowGroupBy === 'product'">
                <many2many :searchItems="searchProducts" @change="_onProductChange"></many2many>
            </el-form-item>
            <el-form-item :label="translate('Product Categories')">
                <many2many :searchItems="searchProductCategories" @change="_onProductCategoryChange"></many2many>
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
        :products="rowGroups"
        :stockData="stockData"
        @current-stock-clicked="(productId) => $emit('current-stock-clicked', productId)"
        @move-amount-clicked="(productId, dateFrom, dateTo) => $emit('move-amount-clicked', productId, dateFrom, dateTo)"
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

        // Function to call when a filter input (many2many field) was changed.
        onFilterChange: {
            type: Function,
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
            dateGroupBy: "",
            dateTo: "",
            rowGroupBy: "product",
            locations: [],
            productCategories: [],
            products: [],
            stockData: new Map(),
            rowGroups: [],
        };
    },
    computed: {
        effectiveDateFrom(){
            return this.dateFrom || new Date();
        },
        effectiveDateTo(){
            return this.dateTo || moment(new Date()).add(6, this.dateGroupBy || "month").toDate();
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
        _onFilterChange(){
            if(this.onFilterChange){
                this.onFilterChange();
            }
        },
        _onRowGroupByChange(value){
            this._onFilterChange();
        },
        _onProductChange(value){
            this.products = value;
            this._onFilterChange();
        },
        _onProductCategoryChange(value){
            this.productCategories = value;
            this._onFilterChange();
        },
        _onLocationChange(value){
            this.locations = value;
            this._onFilterChange();
        },
    }
};

</script>
