/*
    © 2018 Numigi (tm) and all its contributors (https://bit.ly/numigiens)
    License LGPL-3.0 or later (http://www.gnu.org/licenses/LGPL.html).
*/
odoo.define("vue_element_ui.i18n", function(require) {
"use strict";

var rpc = require("web.rpc");
var Class = require("web.Class");
var enLocale = require("vue_element_ui.en");
var utils = require("web.utils");
var _t = require("web.core")._t;

/**
 * Get all Element UI translations from the backend.
 *
 * @param {String} lang - the language code
 * @returns {Array} the translations
 */
function getElementUITranslations(lang){
    return rpc.query({
        model: "ir.translation",
        method: "get_element_ui_translations",
        args: [lang],
    });
}

/**
 * Build the locale for Element UI components for a given array of translations.
 *
 * The result is an object with the same structure as found in the file ./en.js.
 *
 * Given the following array of translations:
 *
 * [['el.colorpicker.confirm', 'OK'],
 *  ['el.colorpicker.clear', 'Effacer'],
 *  ['el.datepicker.now', 'Maintenant'],
 *  ...]
 *
 * The result would be:
 *
 * {
 *   el: {
 *     colorpicker: {
 *       confirm: 'OK',
 *       clear: 'Effacer',
 *     },
 *     datepicker: {
 *       now: 'Maintenant',
 *       ...
 *     },
 *     ...
 *   }
 * }
 *
 * @param {Array} translations - the component translations
 * @returns {Object} the Element UI locale
 */
function buildElementUILocale(translations){
    var userLocale = {};

    translations.forEach(function(translation){
        var keys = translation[0].split(".");
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
    // Otherwise, we get chinese terms by default.
    return $.extend(true, {}, enLocale, userLocale);
}

var isFrontend = odoo.session_info.is_frontend;
var lang = isFrontend ? utils.get_cookie("frontend_lang") : odoo.session_info.user_context.lang;

if(!lang || lang === "en_US"){
    ELEMENT.locale(enLocale);
}
else{
    getElementUITranslations(lang).then(function(translations){
        var userLocale = buildElementUILocale(translations);
        ELEMENT.locale(userLocale);
    });
}

});