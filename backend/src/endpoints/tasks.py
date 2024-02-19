from flask import Blueprint, request, abort, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity  # type:ignore
from ..database import models
from typing import Any

task = Blueprint("task", __name__, url_prefix="/api/v1")


# [] GET /tasks
@task.get("/tasks")
@jwt_required()
def get_tasks():
    try:
        user_id: int = get_jwt_identity()
        tasks: Any = models.Task.query.filter_by(  # type:ignore
            user_id == user_id
        ).all()
        serialized_tasks: list[Any] = [task.format() for task in tasks] if tasks else []

        return jsonify({"success": True, "code": 200, "tasks": serialized_tasks})
    except Exception:
        abort(500)


@task.post("/tasks")
@jwt_required()
def post_task():
    # get user_id
    user_id: int = get_jwt_identity()

    # get request details
    description: str = request.json.get("description", None)  # type:ignore
    duration: int = request.json.get("duration", None)  # type:ignore
    priority: int = request.json.get("priority", None)  # type:ignore
    deadline: str = request.json.get("deadline", None)  # type:ignore

    # check validity of the request
    if not description or not user_id:
        abort(400, "You must provide a description of the task")

    task = models.Task(
        user_id=user_id,
        description=description,
        duration=duration,
        priority=priority,
        deadline=deadline,
    )
    try:
        task.insert()

        tasks: Any = models.Task.query.filter_by(  # type:ignore
            user_id == user_id
        ).all()
        # tasks: Any = models.Task.query.filter_by(  # type:ignore
        #     user_id == user_id
        # ).all()

        serialized_tasks: list[Any] = [task.format() for task in tasks] if tasks else []

        return (
            jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": "task created",
                    "tasks": serialized_tasks,
                }
            ),
            200,
        )

    except Exception:
        abort(500)


# [x] PATCH /tasks
@task.route("/tasks/<int:task_id>", methods=["PATCH"])
@jwt_required()
def update_task(task_id: int):
    user_id: int = get_jwt_identity()

    # get task description from the request
    new_description = request.json.get("description", None)  # type:ignore

    new_duration = request.json.get("duration", None)  # type:ignore
    new_priority = request.json.get("priority", None)  # type:ignore
    new_is_completed = request.json.get("is_completed", None)  # type:ignore
    new_is_delegated = request.json.get("is_completed", None)  # type:ignore
    new_do_immediately = request.json.get("is_completed", None)  # type:ignore
    new_category = request.json.get("category", None)  # type:ignore

    task_to_be_updated: Any = (
        models.Task.query.join(models.User)  # type:ignore
        .filter(user_id == user_id)
        .filter(models.Task.id == task_id)
        .first()
    )

    if not task_to_be_updated:
        abort(404, "no such task exist for this user")

    if new_description:
        task_to_be_updated.description = new_description
    if new_duration:
        task_to_be_updated.duration = new_duration
    if new_priority:
        task_to_be_updated.priority = new_priority

    if new_is_completed:
        task_to_be_updated.is_completed = new_is_completed

    if new_is_delegated:
        task_to_be_updated.is_delegated = new_is_delegated

    if new_do_immediately:
        task_to_be_updated.do_immediately = new_do_immediately

    if new_category:
        task_to_be_updated.category = new_category

    try:
        task_to_be_updated.insert()
        tasks: Any = (
            models.Task.query.join(models.User)  # type:ignore
            .filter(user_id == user_id)
            .all()
        )

        # tasks_query = None
        serialized_tasks = [task.format() for task in tasks] if tasks else []

        return (
            jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": f"task updated",
                    "tasks": serialized_tasks,
                }
            ),
            200,
        )
    except Exception:
        abort(500)


# [] DELETE /tasks


@task.route("/tasks/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id: int):
    user_id: int = get_jwt_identity()

    task_to_be_deleted: Any = (
        models.Task.query.join(models.User)  # type:ignore
        .filter(user_id == user_id)
        .filter(models.Task.id == task_id)
        .first()
    )

    if not task_to_be_deleted:
        abort(404, "no such task exist for this user")
    try:
        task_to_be_deleted.delete()
        tasks: Any = (
            models.Task.query.join(models.User)  # type:ignore
            .filter(user_id == user_id)
            .all()
        )

        # tasks_query = None

        serialized_tasks = [task.format() for task in tasks] if tasks else []

        return (
            jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": f"task deleted",
                    "tasks": serialized_tasks,
                }
            ),
            200,
        )
    except Exception:
        abort(500)

    # [] create a snippet for getting request details
