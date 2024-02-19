from flask import Blueprint, jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity  # type:ignore
from ..database import models
from typing import Any

project = Blueprint("project", __name__, url_prefix="/api/v1")


# [] get categories
@project.get("/projects")
@jwt_required()
def get_projects():
    current_user_id: int = get_jwt_identity()
    projects: Any = models.Project.query.filter_by(  # type:ignore
        user_id=current_user_id
    ).all()

    serialized_projects: list[Any] = (
        [project.format() for project in projects] if projects else []
    )

    return jsonify({"success": True, "code": 200, "projects": serialized_projects})


# [x] POST /projects


@project.post("/projects")
@jwt_required()
def post_project():
    # get user_id
    user_id: int = get_jwt_identity()

    # get request details
    name: int = request.json.get("name", None)  # type:ignore
    description: str = request.json.get("description", None)  # type:ignore
    expected_outcome: int = request.json.get("expected_outcome", None)  # type:ignore
    deadline: str = request.json.get("deadline", None)  # type:ignore

    # check validity of the request
    if not name:
        abort(400, "You must provide project name")

    project = models.Project(
        user_id=user_id,
        name=name,
        description=description,
        expected_outcome=expected_outcome,
        deadline=deadline,
    )
    try:
        project.insert()

        projects: Any = (
            models.Project.query.join(models.User)  # type:ignore
            .filter(user_id == user_id)
            .all()
        )

        # projects_query = None
        serialized_projects: list[Any] = (
            [project.format() for project in projects] if projects else []
        )

        return (
            jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": "project created",
                    "projects": serialized_projects,
                }
            ),
            200,
        )
    except Exception as e:
        print(e)
        abort(500)


# [x] PATCH /projects
@project.route("/projects/<int:project_id>", methods=["PATCH"])
@jwt_required()
def update_project(project_id: int):
    user_id: int = get_jwt_identity()

    # get project description from the request
    new_description = request.json.get("description", None)  # type:ignore
    new_name = request.json.get("name", None)  # type:ignore
    new_expected_outcome = request.json.get("expected_outcome", None)  # type:ignore

    project_to_be_updated: Any = (
        models.Project.query.join(models.User)  # type:ignore
        .filter(user_id == user_id)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not project_to_be_updated:
        abort(404, "no such project exist for this user")

    if new_description:
        project_to_be_updated.description = new_description
    if new_name:
        project_to_be_updated.name = new_name
    if new_expected_outcome:
        project_to_be_updated.expected_outcome = new_expected_outcome

    try:
        project_to_be_updated.insert()
        projects: Any = (
            models.Project.query.join(models.User)  # type:ignore
            .filter(user_id == user_id)
            .all()
        )

        serialized_projects: list[Any] = (
            [project.format() for project in projects] if projects else []
        )

        return jsonify(
            {
                "success": True,
                "code": 200,
                "message": f"project updated",
                "projects": serialized_projects,
            },
            200,
        )
    except Exception:
        abort(500)


# [] DELETE /projects


@project.route("/projects/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id: int):
    user_id: int = get_jwt_identity()

    project_to_be_deleted: Any = (
        models.Project.query.join(models.User)  # type:ignore
        .filter(user_id == user_id)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not project_to_be_deleted:
        abort(404, "no such project exist for this user")

    try:
        project_to_be_deleted.delete()
        projects: Any = (
            models.Project.query.join(models.User)  # type:ignore
            .filter(user_id == user_id)
            .all()  # type:ignore
        )

        serialized_projects = (
            [project.format() for project in projects] if projects else []
        )

        return (
            jsonify(
                {
                    "success": True,
                    "code": 200,
                    "message": f"project deleted",
                    "projects": serialized_projects,
                }
            ),
            200,
        )
    except Exception:
        abort(500)

    # [] create a snippet for getting request details
