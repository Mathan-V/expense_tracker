from frappe import _

def get_data():
    return [
        {
            "module_name": "Expense Tracker",
            "category": "Modules",
            "label": _("Expense Tracker"),
            "color": "#16a34a",  # Tailwind green-600
            "icon": "octicon octicon-repo",  # use any valid icon
            "type": "module",
            "name": "Expense Tracker",
            "description": "Track your expenses"
        },
        {
            "label": _("Expense Tracker"),
            "icon": "octicon octicon-list-unordered",
            "type": "link",
            "name": "Expense",
            "link": "List/Expense/List",  # ← This opens the Expense list view in Desk
            "module_name": "Expense Tracker"
        },
    ]
