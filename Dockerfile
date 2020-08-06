FROM quay.io/numigi/odoo-public:12.latest
MAINTAINER numigi <contact@numigi.com>

COPY vue /mnt/extra-addons/vue
COPY vue_backend /mnt/extra-addons/vue_backend
COPY vue_element_ui /mnt/extra-addons/vue_element_ui
COPY vue_frontend /mnt/extra-addons/vue_frontend
COPY vue_i18n /mnt/extra-addons/vue_i18n
COPY vue_router /mnt/extra-addons/vue_router
COPY vue_stock_forecast /mnt/extra-addons/vue_stock_forecast
COPY vuex /mnt/extra-addons/vuex

COPY .docker_files/main /mnt/extra-addons/main
COPY .docker_files/odoo.conf /etc/odoo
