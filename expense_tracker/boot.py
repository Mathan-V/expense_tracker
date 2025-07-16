import frappe

def custom_boot_session(bootinfo):
    bootinfo["custom_roles"] = frappe.get_roles(frappe.session.user)

