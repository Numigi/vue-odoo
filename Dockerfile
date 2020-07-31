FROM quay.io/numigi/odoo-public:12.latest
MAINTAINER numigi <contact@numigi.com>

COPY vue /mnt/extra-addons/vue
COPY vue_element_ui /mnt/extra-addons/vue_element_ui
COPY vue_router /mnt/extra-addons/vue_router
COPY vue_stock_forecast /mnt/extra-addons/vue_stock_forecast

COPY .docker_files/main /mnt/extra-addons/main
COPY .docker_files/odoo.conf /etc/odoo
