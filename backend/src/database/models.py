from email.policy import default
import os
from datetime import datetime
from typing import Dict, Union
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_migrate import Migrate

# GET USERNAME AND PASSWORD FROM LOCAL ENV. SEE env_example for more info
load_dotenv()

DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")


# Define database variables
database_name = "effect_db"
database_path = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{'localhost:5432'}/{database_name}"


# instantiate the database
db = SQLAlchemy()

# Instantiate migration
migrate = Migrate()

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
    migrate.init_app(app, db)


def db_drop_and_create_all() -> None:
    """drop and recreates all tables. Also creates a demo user & task testing

    Args:
        db (_type_): an instance of our database
    """
    db.drop_all()
    db.create_all()


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
User

"""


class User(db.Model, CRUD):
    __Table__name = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    tasks = db.relationship("Task", backref="user", lazy=True)

    def format(self) -> Dict[str, str]:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<User | ID: {self.id} Username: {self.username}>"


"""
Task

"""


class Task(db.Model, CRUD):
    __table__name = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer)
    priority = db.Column(db.Integer)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )
    is_completed = db.Column(db.Boolean, default=False)
    is_delegated = db.Column(db.Boolean, default=False)
    do_immediately = db.Column(db.Boolean, default=False)
    is_due = db.Column(db.Boolean, default=False)
 
    deadline = db.Column(db.DateTime)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())
    category = db.Column(db.String(80))

    def format(self) ->Dict[str, Union[str, Dict[str, str]]]:
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "priority": self.priority,
            "user_id": self.user_id,
            "deadline": self.deadline,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "task_state": {
                "is_completed": self.is_completed,
                "is_delegated" : self.is_delegated,
                "do_immediately": self.do_immediately,
                "is_due": self.is_due
            }
        }


    def __repr__(self):
        return f"<Task | ID: {self.id} Description: {self.description}>"

class Project(db.Model, CRUD):
    __Table__name = "projects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)

    def format(self) ->Dict[str, str]:
        return {
            "id": self.id,
            "name": self.duration,
            "description": self.description,
        }
    
    def __repr__(self):

        return f"<Project | ID: {self.id} Name: {self.name}>"

   
