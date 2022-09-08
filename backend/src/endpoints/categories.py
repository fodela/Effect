from flask import Blueprint

category = Blueprint("category", __name__, url_prefix="/api/v1")


# [] get categories
@category.get("categories")
def get_categories(self):
    pass


# [] post categories
@category.post("categories")
def post_categories(self):
    pass


# [] patch categories
@category.patch("categories")
def patch_categories(self):
    pass


# [] delete categories
@category.delete("categories")
def delete_categories(self):
    pass
