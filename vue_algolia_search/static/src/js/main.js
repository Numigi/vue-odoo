import InstantSearch from "./InstantSearch.vue";
import 'instantsearch.css/themes/satellite-min.css';

Vue.component("vue-instantsearch", InstantSearch);

window.vueAlgoliaSearch = {InstantSearch};
