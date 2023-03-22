# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).


def matches_supplier(supplier_info, supplier):
    return (
        supplier_info.name == supplier or
        supplier_info.name.commercial_partner_id == supplier
    )
