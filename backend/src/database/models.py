from enum import unique
import os
from datetime import datetime
import string
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv


# GET USERNAME AND PASSWORD FROM LOCAL ENV. SEE env_example for more info
load_dotenv()

DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")


# Define database variables
database_name = "effect_db"

database_path = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{'localhost:5432'}/{database_name}"


# instantiate the database
db = SQLAlchemy()

"""
setup_db(app)
    binds a flask application and a SQALchemy service
"""


def setup_db(app, database_path=database_path):
    """binds a flask application and SQLALchemy service

    args:
    app -- this is the name of the application
    database -- this is the DATABASE URI used to configure the app
    """

    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


"""
CRUD 
    add CRUD to each model while respecting the DRY (Don't Repeat Yourself) principle

"""


class CRUD():
    """Creates updates and deletes data from the database
    """

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


"""
Task

"""


class Task(db.Model, CRUD):
    __table__name = "Task"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer)
    priority = db.Column(db.Integer)
    user_id = db.ForeignKey("User.id", nullable=False)
    task_state_id = db.ForeignKey("TaskState.id", nullable=False)
    deadline = db.Column(db.DateTime)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    category_id = db.ForeignKey("Category", nullable=False)
    # task_category = db.relationship(
    #     "TaskCategory", backref="task", lazy=True)

    def format(self):
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "priority": self.priority,
            "user_id": self.user_id,
            "task_state_id": self.task_state_id,
            "deadline": self.deadline,
            "created_at": self.created_at,
            "updated_at": self.updated_at

        }

    def __repr__(self):
        return f"<Task | ID: {self.id} Description: {self.description}>"


"""
TaskState

"""


class TaskState(db.Model, CRUD):
    __Table__name = "TaskState"
    id = db.Column(db.Integer, primary_key=True)
    is_completed = db.Column(db.Boolean)
    is_delegated = db.Column(db.Boolean)
    do_immediately = db.Column(db.Boolean)
    is_due = db.Column(db.Boolean)

    def format(self):
        return {
            "id": self.id,
            "is_delegated": self.is_delegated,
            "do_immediately": self.do_immediately,
            "is_completed": self.is_completed,
            "is_due": self.is_due
        }

    def __repr__(self):
        return f"<TaskState | ID: {self.id} {'Completed' if self.is_completed else 'Not completed'} {'Delegated' if self.is_delegated else ''} {'Due' if self.is_due else ''}>"


"""
User

"""


class User(db.Model, CRUD):
    __Table__name = "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    def format(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

    def __repr__(self):
        return f"<User | ID: {self.id} Username: {self.username}>"


"""
Category

"""


class Category(db.Model, CRUD):
    __Table__name = "Category"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    # task_category = db.relationship(
    #     "TaskCategory", backref="category", lazy=True)

    def format(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    def __repr__(self):
        return f"<Category | ID: {self.id} Name: {self.name}>"


"""
TaskCategory

"""


# class TaskCategory(db.Model, CRUD):
#     __Table__name = "TaskCategory"
#     id = db.Column(db.Integer, primary_key=True)
#     task_id = db.Column(
#         db.Integer,
#         db.ForeignKey("Task.id"),
#         nullable=False
#     )
#     category_id = db.Column(
#         db.Integer,
#         db.ForeignKey("Category.id"),
#         nullable=False
#     )

#     def __repr__(self):
#         return f"<TaskCategory | ID: {self.id}>"
