import frappe
from frappe import _
from frappe.model.document import Document

@frappe.whitelist(allow_guest=True)
def create_expense(**args):
    # Validate required fields
    required_fields = ["amount", "category", "payment_method", "date", "title", "type"]
    for field in required_fields:
        if not args.get(field):
            frappe.throw(_(f"{field.replace('_', ' ').title()} is required"))

    # Ensure Category exists
    category_doc = get_or_create_master("Category", args.get("category"))

    # Ensure Payment Method exists
    payment_method_doc = get_or_create_master("Payment Method", args.get("payment_method"))

    # Create Expense doc
    expense = frappe.new_doc("Expense")
    expense.update({
        "amount": args.get("amount"),
        "category": category_doc.name,
        "payment_method": payment_method_doc.name,
        "date": args.get("date"),
        "title": args.get("title"),
        "type": args.get("type")
    })
    expense.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "message": "Expense created successfully",
        "expense_name": expense.name
    }


def get_or_create_master(doctype, name):
    if not name:
        frappe.throw(_(f"{doctype} name is required"))

    # If already exists, return the doc
    if frappe.db.exists(doctype, name):
        return frappe.get_doc(doctype, name)

    # Create new doc — adjust field according to doctype
    doc = frappe.new_doc(doctype)

    # Handle known special cases
    if doctype == "Payment Method":
        doc.method_name = name
    elif doctype == "Category":
        doc.category_name = name
    else:
        doc.name = name  # fallback, if name is also a field

    doc.insert(ignore_permissions=True)
    return doc

