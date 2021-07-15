odoo.define('algolia.instantsearch', function (require) {
    'use strict';

    require('web.dom_ready');

    if (!$('#o_algolia_search').length) {
        return $.Deferred().reject("DOM doesn't contain '#o_algolia_search'");
    }

    var InstantSearch = Vue.extend(algoliaInstantSearch)

    console.log("Hello World :)")

    new InstantSearch({}).$mount('#o_algolia_search')
});
