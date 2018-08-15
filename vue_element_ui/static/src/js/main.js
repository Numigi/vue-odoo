
import Many2many from "./Many2many.vue";

Vue.component("many2many", Many2many);

/**
 * Prevent infinite loop with the automatic resize of the el-select component.
 *
 * The height of the input does not need to be resized.
 * Only the width is relevant to resize.
 */
Vue.component("el-select", {
  extends: Vue.options.components.ElSelect,
  methods: {
    handleResize() {
        this.resetInputWidth();
        // The following line caused the infinite loop.
        // if (this.multiple) this.resetInputHeight();
    },
  },
});
