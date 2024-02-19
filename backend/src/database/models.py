import os
from datetime import datetime
from typing import Union, Optional
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv  # type:ignore
from flask_migrate import Migrate
from typing import Any

# GET USERNAME AND PASSWORD FROM LOCAL ENV. SEE env_example for more info
load_dotenv()

DATABASE_USERNAME: Optional[str] = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD: Optional[str] = os.getenv("DATABASE_PASSWORD")
DATABASE_DEV_PASSWORD: Optional[str] = os.getenv("DATABASE_DEV_PASSWORD")
DATABASE_HOST: Optional[str] = os.getenv("DATABASE_HOST")
DATABASE_DEV_HOST: Optional[str] = os.getenv("DATABASE_DEV_HOST")


# Define database variables
database_name = "effect_db"

# # Production setup
# database_path = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{database_name}"

# Development setup
database_path: str = f"postgresql://{DATABASE_USERNAME}:{DATABASE_DEV_PASSWORD}@{DATABASE_DEV_HOST}/{database_name}"


# instantiate the database
db: Any = SQLAlchemy()

# Instantiate migration
migrate: Any = Migrate()

"""
setup_db(app)
    binds a flask application and a SQALchemy service
"""


def setup_db(app: Any, database_path: str = database_path) -> None:
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


class CRUD:
    """Creates updates and deletes data from the database"""

    def insert(
        self,
    ) -> None:
        db.session.add(self)
        db.session.commit()

    def update(self) -> None:
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()


class User(db.Model, CRUD):
    __Table__name: str = "users"
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String(80), unique=True, nullable=False)
    email: str = db.Column(db.String(120), unique=True, nullable=False)
    password: str = db.Column(db.Text(), nullable=False)
    created_at: datetime = db.Column(
        db.DateTime, nullable=False, default=datetime.now()
    )
    updated_at: datetime = db.Column(db.DateTime, onupdate=datetime.now())
    image_link: str = db.Column(db.String(450), nullable=True, default="")
    projects = db.relationship("Project", backref="user", lazy=True)
    tasks: Any = db.relationship("Task", backref="user", lazy=True)

    def format(self) -> Any:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def __repr__(self) -> str:
        return f"<User | ID: {self.id} Username: {self.username}>"


class Task(db.Model, CRUD):
    __table__name: str = "tasks"
    id: int = db.Column(db.Integer, primary_key=True)
    description: str = db.Column(db.String, nullable=False)
    duration: int = db.Column(db.Integer, default=25)
    priority: int = db.Column(db.Integer, default=1)

    is_completed: bool = db.Column(db.Boolean, default=False)
    is_delegated: bool = db.Column(db.Boolean, default=False)
    do_immediately: bool = db.Column(db.Boolean, default=False)
    is_due: bool = db.Column(db.Boolean, default=False)
    deadline: datetime = db.Column(db.DateTime)
    created_at: datetime = db.Column(
        db.DateTime, nullable=False, default=datetime.now()
    )
    updated_at: datetime = db.Column(db.DateTime, onupdate=datetime.now())
    category: str = db.Column(db.String(80), default="Inbox")

    user_id: int = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    project_id: int = db.Column(db.Integer, db.ForeignKey("project.id"), nullable=True)

    def format(self) -> dict[str, Union[int, str, datetime, dict[str, bool]]]:
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
                "is_delegated": self.is_delegated,
                "do_immediately": self.do_immediately,
                "is_due": self.is_due,
            },
        }

    def __repr__(self) -> str:
        return f"<Task | ID: {self.id} Description: {self.description}>"


class Project(db.Model, CRUD):
    __Table__name: str = "projects"
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String, nullable=False)
    description: str = db.Column(db.String, nullable=True)
    expected_outcome: str = db.Column(db.String, nullable=True)
    deadline: datetime = db.Column(db.DateTime)
    created_at: datetime = db.Column(
        db.DateTime, nullable=False, default=datetime.now()
    )
    updated_at: datetime = db.Column(db.DateTime, onupdate=datetime.now())

    user_id: int = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    tasks: list[Task] = db.relationship("Task", backref="project")

    def format(self) -> dict[str, Union[int, str, datetime]]:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "expected_outcome": self.expected_outcome,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def __repr__(self) -> str:
        return f"<Project | ID: {self.id} Name: {self.name}>"
