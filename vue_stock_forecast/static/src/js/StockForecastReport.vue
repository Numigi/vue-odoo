<template>

<div class="stock-forecast-report">
    <el-card class="stock-forecast-report__filters">
        <el-form :model="$data" label-width="150px" label-position="left" inline>
            <el-form-item :label="translate('Location')">
                <many2many :search="searchStockLocations" @change="onLocationChange"></many2many>
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
                <many2many :search="searchProducts" @change="onProductChange"></many2many>
            </el-form-item>
            <el-form-item :label="translate('Product Categories')">
                <many2many :search="searchProductCategories" @change="onProductCategoryChange"></many2many>
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
            rows: [],
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
        onLocationChange(value){
            this.locations = value;
            this.onFilterChange();
        },
    }
};

</script>
