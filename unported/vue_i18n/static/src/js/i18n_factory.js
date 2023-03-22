odoo.define("vue_i18n.i18nFactory", function (require) {
"use strict";

Vue.use(VueI18n)

const Class = require("web.Class");

const I18nFactory = Class.extend({
  init() {
    this.lang = 'en-US'
    this.messages = {};
  },
  addMessages(messages) {
    this.messages = deepmerge(this.messages, messages)
  },
  setLang(lang) {
    this.lang = lang
  },
  makeI18n(){
    return new VueI18n({
      locale: this.lang,
      messages: this.messages,
    })
  },
})

return new I18nFactory();

});
