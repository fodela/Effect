import os
from datetime import datetime
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
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

    """
    Tasks

    """
    class Task(db.Model):
        __table__name = "Task"

        id = db.Column(db.Integer, primary_key=True)
        description = db.Column(db.String, nullable=False)
        duration = db.Column(db.Integer)
        priority = db.Column(db.Integer)
        user_id = db.ForeignKey("User.id", nullable=False)
        task_state_id = db.ForeignKey("TaskState.id", nullable=False)
        deadline = db.Column(db.DateTime)
        created_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow)
        updated_at = db.Column(db.DateTime)
        task_category = db.relationship(
            "TaskCategory", backref="task", lazy=True)

    class TaskState(db.Model):
        __Table__name = "TaskState"
        id = db.Column(db.Integer, primary_key=True)
        is_completed = db.Column(db.Boolean)
        is_delegated = db.Column(db.Boolean)
        do_immediately = db.Column(db.Boolean)
        is_due = db.Column(db.Boolean)

    class User(db.Model):
        __Table__name = "User"
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String)
        email = db.Column(db.Email)

    class Category(db.Model):
        __Table__name = "Category"
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String)
        task_category = db.relationship(
            "TaskCategory", backref="category", lazy=True)

    class TaskCategory(db.Model):
        __Table__name = "TaskCategory"
        id = db.Column(db.Integer, primary_key=True)
        task_id = db.Column(db.Integer,  db.ForeignKey(
            "Task.id"), nullable=False)
        category_id = db.Column(db.Integer, db.ForeignKey(
            "Category.id"), nullable=False)
