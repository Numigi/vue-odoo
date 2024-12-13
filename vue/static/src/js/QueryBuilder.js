/** @odoo-module **/

import rpc from 'web.rpc';
import session from 'web.session';

class QueryBuilder {
    /**
     * @param {string} model 
     * @param {Array<string>} fields 
     */
    constructor(model, fields) {
        this._model = model;
        this._fields = fields;
        this._domain = [];
    }

    /**
     * @param {Array} domain 
     * @returns {QueryBuilder} 
     */
    filter(domain) {
        this._domain = [...this._domain, ...domain];
        return this;
    }

    /**
     * @returns {Promise<Array<Object>>}
     */
    async searchRead() {
        const result = await rpc.query({
            model: this._model,
            method: "search_read",
            args: [this._domain, this._fields],
            kwargs: {
                context: session.user_context,
            },
        });
        return result;
    }
}

export default QueryBuilder;
