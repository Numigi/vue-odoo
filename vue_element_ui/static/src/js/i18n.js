/*
    © 2018 Numigi (tm) and all its contributors (https://bit.ly/numigiens)
    License LGPL-3.0 or later (http://www.gnu.org/licenses/LGPL.html).
*/
odoo.define("vue_element_ui.i18n", function(require) {
"use strict";

var ajax = require("web.ajax");
var Class = require("web.Class");
var core = require("web.core");
var enLocale = require("vue_element_ui.en");
var _t = core._t;

var ElementUITranslationFetcher = Class.extend({
    fetch(){
        var domain = [
            ["name", "=", "addons/vue_element_ui/static/src/js/i18n.js"],
            ["lang", "=", odoo.session_info.user_context.lang],
        ];
        return ajax.rpc("/web/dataset/call_kw/ir.translation/search_read", {
            model: "ir.translation",
            method: "search_read",
            args: [domain],
            kwargs: {},
        }).then(function(result){
            return result.map(function(translation){
                return [translation.source, translation.value];
            });
        });
    },
});

var ElementUILocaleBuilder = Class.extend({
    build(translations){
        var userLocale = {};

        translations.forEach(function(translation){
            var keys = translation[0].split('.');
            var currentDict = userLocale;

            for(var i = 0; i < keys.length - 1; i++){
                var key = keys[i];
                if(!(key in currentDict)){
                    currentDict[key] = {};
                }
                currentDict = currentDict[key];
            }

            var value = translation[1];
            var lastKey = keys[keys.length - 1];
            currentDict[lastKey] = value;
        });

        // Deep merge of the user locale into the en_US locale.
        // Any term that does not exist in the user lang will use the english translation.
        return $.extend(true, {}, enLocale, userLocale);
    },
});

var lang = odoo.session_info.user_context.lang;
if(lang === "en_US"){
    ELEMENT.locale(enLocale);
}
else{
    new ElementUITranslationFetcher().fetch().then(function(translations){
        var userLocale = new ElementUILocaleBuilder().build(translations);
        ELEMENT.locale(userLocale);
    });
}

});