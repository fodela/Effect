import json

from flask import Blueprint, request, abort, jsonify
from typing import Dict
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..database import models

task = Blueprint("task", __name__, url_prefix="/api/v1")


# [] GET /tasks
@task.get("/tasks")
@jwt_required()
def get_tasks():
    user_id: int = get_jwt_identity()
    print("user_id", user_id)
    tasks_query = models.Task.query.filter_by(user_id=user_id).all()

    if tasks_query:
        tasks = [task.format() for task in tasks_query]
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
def post_tasks() -> Dict[str, str]:

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


# [] PATCH /tasks


# [] DELETE /tasks


# [] create a snippet for getting request details
