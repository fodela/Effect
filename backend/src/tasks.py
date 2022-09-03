from flask import Blueprint


tasks = Blueprint("tasks", __name__, url_prefix="/api/vi/tasks")


@tasks.get("/")
def get_tasks():
    return {"tasks": []}
