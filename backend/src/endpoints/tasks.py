
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
def post_task():

    # get user_id
    user_id: int = get_jwt_identity()

    # get request details
    description: str = request.json.get("description", None)
    duration: int = request.json.get("duration", None)
    priority: int = request.json.get("priority", None)
    deadline: str = request.json.get("deadline", None)
    
    # check validity of the request
    if not description or not user_id:
        abort(400, "You must provide a description of the task")

    task = models.Task(user_id=user_id,
                       description=description,
                       duration=duration,
                       priority=priority,
                       deadline=deadline
                       )

    # save task   or raise error

    try:
        task.insert()

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
                "message": "task created",
                "tasks":tasks
            }
        ), 200
    except Exception as e:
        print(e)
        abort(500)


# [x] PATCH /tasks
@task.route("/tasks/<int:task_id>", methods=["PATCH"])
@jwt_required()
def update_task(task_id):
    user_id: int = get_jwt_identity()

    # get task description from the request
    new_description = request.json.get("description", None)
    
    new_duration = request.json.get("duration", None)
    new_priority = request.json.get("priority", None)
    new_is_completed = request.json.get("is_completed", None)
    new_is_delegated = request.json.get("is_completed", None)
    new_do_immediately = request.json.get("is_completed", None)
    new_category = request.json.get("category", None)

    task_to_be_updated = models.Task.query.join(models.User).filter(
        user_id == user_id).filter(models.Task.id == task_id).first()

    if task_to_be_updated:
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
            tasks_query = models.Task.query.join(
                models.User).filter(user_id == user_id).all()

            # tasks_query = None
            if tasks_query:
                tasks = [task.format() for task in tasks_query]
                # tasks = tasks
            else:
                tasks = []

            return jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": f"task updated",
                    "tasks":tasks
                }
            ), 200
        except Exception as e:
            abort(500)
    
    abort(404, "no such task exist for this user")



# [] DELETE /tasks


@task.route("/tasks/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):

    user_id: int = get_jwt_identity()

    task_to_be_deleted = models.Task.query.join(models.User).filter(
        user_id == user_id).filter(models.Task.id == task_id).first()

    if task_to_be_deleted:

        try:
            task_to_be_deleted.delete()
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
                    "message": f"task deleted",
                    "tasks": tasks
                }
            ), 200
        except Exception as e:
            abort(500)
    else:
        abort(404, "no such task exist for this user")

    # [] create a snippet for getting request details
