<template>
<el-select
    v-model="items"
    multiple filterable
    remote
    value-key="id"
    :remote-method="searchItems"
    @focus="onFocus"
    @change="onChange"
    :placeholder="placeholder"
    ref="select"
    >
    <el-option
        v-for="item in selection"
        :key="item.id" :label="item.name" :value="item">
    </el-option>
    <el-option
        v-for="item in invisibleItems"
        :key="item.id" :label="item.name" :value="item" v-show="false">
    </el-option>
</el-select>
</template>
<script>

export default {
    props: {
        /**
         * A function for searching records when the user enters an expression.
         * 
         * The function takes in parameter a string and returns an array of records.
         * Each returned record is an odoo name_get tuple [id, display_name].
         */
        search: {
            type: Function,
            required: true,
        },
        placeholder: {
            type: String,
        },
    },
    data(){
        return {
            items: [],
            selection: [],
        };
    },
    computed: {
        /**
         * These extra items are used to make sure that the el-option widget properly displays
         * the label on each tag.
         */
        invisibleItems(){
            var availableKeys = this.selection.map(p => p.id);
            return this.items.filter(p => availableKeys.indexOf(p.id) === -1);
        },
    },
    methods: {
        onFocus(){
            this.searchItems(this.$refs.select.query);
        },
        searchItems(query){
            this.search(query).then(result => {
                var itemsFound = result.map(r => {
                    return {id: r[0], name: r[1]};
                });
                this.selection = itemsFound;
            });
        },
        onChange(value){
            this.$emit("change", value);
        },
    },
};
    
</script>
