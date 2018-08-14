<template>
<div>
    <el-select
        v-model="items"
        multiple filterable
        remote :remote-method="_searchItems"
        value-key="id"
        @change="_onChange"
        :placeholder="placeholder"
        ref="select"
        >
        <el-option
            v-for="item in selection"
            :key="item.id" :label="item.name" :value="item">
        </el-option>
    </el-select>
</div>
</template>
<script>

import { removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
    props: {
        searchItems: {
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
    watch: {
        items(){
            this._addMissingItems();
        },
    },
    methods: {
        _searchItems(query){
            this.searchItems(query).then(result => {
                var itemsFound = result.map(r => {
                    return {id: r[0], name: r[1]};
                });
                this.selection = itemsFound;
                this._addMissingItems();
            });
        },
        _addMissingItems(){
            var availableKeys = this.selection.map(p => p.id);
            var missingItems = this.items.filter(p => availableKeys.indexOf(p.id) === undefined);
            if(missingItems.length){
                this.selection = this.selection.concat(missingItems);
            }
        },
        _onChange(value){
            this.$emit("change", value);
        },
    },
};
    
</script>
