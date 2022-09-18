import json
import string

from flask import Blueprint, request, abort, jsonify
from typing import Dict
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_

from ..database import models

task = Blueprint("task", __name__, url_prefix="/api/v1")


# [] GET /tasks
@task.get("/tasks")
@jwt_required()
def get_tasks():
    user_id: int = get_jwt_identity()
    tasks_query = models.Task.query.join(
        models.User).filter(user_id == user_id).all()

    # tasks_query = None
    if tasks_query:
        tasks = [task.format() for task in tasks_query]
        tasks = tasks
    else:
        tasks = []

    return jsonify(
        {
            "success": True,
            "code": 200,
            "tasks": tasks
        }
    )

# [x] POST /tasks


@task.post("/tasks")
@jwt_required()
def post_task() -> Dict[str, str]:

    # get user_id
    user_id: int = get_jwt_identity()

    # get request details
    description: str = request.json.get("description", None)
    duration: int = request.json.get("duration", None)
    priority: int = request.json.get("priority", None)
    task_state_id: int = request.json.get("task_state_id", None)
    deadline: str = request.json.get("deadline", None)

    # check validity of the request
    if not description or not user_id:
        abort(400, "You must provide a description of the task")

    task = models.Task(user_id=user_id,
                       description=description,
                       duration=duration,
                       priority=priority,
                       task_state_id=task_state_id,
                       deadline=deadline
                       )

    # save task   or raise error

    try:
        task.insert()

        return jsonify(
            {
                "success": True,
                "code": 200,
                "message": "task created"
            }
        ), 200
    except Exception as e:
        abort(500)


# [x] PATCH /tasks
@task.route("/tasks/<int:task_id>", methods=["PATCH"])
@jwt_required()
def update_task(task_id) -> Dict[str, str]:
    user_id: int = get_jwt_identity()

    # get task description from the request
    new_description = request.json.get("description", None)
    new_duration = request.json.get("duration", None)
    new_priority = request.json.get("priority", None)

    task_to_be_updated = models.Task.query.join(models.User).filter(
        user_id == user_id).filter(models.Task.id == task_id).first()
    if new_description:

        if task_to_be_updated:
            task_to_be_updated.description = new_description
            if new_duration:
                task_to_be_updated.duration = new_duration
            if new_priority:
                task_to_be_updated.priority = new_priority

            try:
                task_to_be_updated.insert()

                return jsonify(
                    {
                        "success": True,
                        "code": 200,
                        "message": f"task updated"
                    }
                ), 200
            except Exception as e:
                abort(500)
        else:
            abort(404, "no such task exist for this user")

    abort(400, "request must contain task description")

# [] DELETE /tasks

    # [] create a snippet for getting request details
