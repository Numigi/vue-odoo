/** @odoo-module **/

import rpc from 'web.rpc';

class XmlReference {
    constructor(ref) {
        const parts = ref.split(".");
        this.module = parts.length === 2 ? parts[0] : false;
        this.name = parts.length === 2 ? parts[1] : parts[0];
        this.query = null;
    }

    async getId() {
        if (!this.query) {
            this.query = rpc.query({
                model: "ir.model.data",
                method: "search_read",
                args: [
                    [["module", "=", this.module], ["name", "=", this.name]],
                    ["res_id", "model"],
                ],
            });
        }
        const result = await this.query;
        return result.length ? result[0].res_id : null;
    }
}

const references = new Map();

export default async function getXmlId(ref) {
    if (!references.has(ref)) {
        references.set(ref, new XmlReference(ref));
    }
    return references.get(ref).getId();
}
