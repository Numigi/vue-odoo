FROM quay.io/numigi/odoo-public:14.latest
MAINTAINER numigi <contact@numigi.com>

USER root

COPY .docker_files/test-requirements.txt ./test-requirements.txt
RUN pip3 install -r ./test-requirements.txt && rm ./test-requirements.txt

USER odoo

COPY vue /mnt/extra-addons/vue
# COPY vue_backend /mnt/extra-addons/vue_backend
# COPY vue_element_ui /mnt/extra-addons/vue_element_ui
# COPY vue_frontend /mnt/extra-addons/vue_frontend
# COPY vue_i18n /mnt/extra-addons/vue_i18n
# COPY vue_router /mnt/extra-addons/vue_router
# COPY vue_stock_forecast /mnt/extra-addons/vue_stock_forecast
# COPY vue_stock_forecast_preferred_supplier /mnt/extra-addons/vue_stock_forecast_preferred_supplier
# COPY vuex /mnt/extra-addons/vuex

COPY .docker_files/main /mnt/extra-addons/main
COPY .docker_files/odoo.conf /etc/odoo
