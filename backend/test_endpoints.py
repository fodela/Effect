import os
from typing import Any, Dict, Optional
import unittest
import json

from src.database import models
from src import create_app

from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash


# Makes available all environment variables from the .env file
load_dotenv()

DATABASE_USERNAME: Optional[str] = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD: Optional[str] = os.getenv("DATABASE_DEV_PASSWORD")


class EffectTestCase(unittest.TestCase):
    """This class represents the effect test case"""

    def setUp(self) -> None:
        """Defines test variables and initialize app."""

        self.app: Any = create_app()
        self.client: Any = self.app.test_client
        self.database_name = "effect_test_db"

        self.database_path: str = (
            f"postgresql://{DATABASE_USERNAME}:"
            f"{DATABASE_PASSWORD}@localhost:5432/"
            f"{self.database_name}"
        )

        models.setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            db = SQLAlchemy()
            db.init_app(self.app)
            models.db_drop_and_create_all()

            test_user = models.User(
                username="user",
                password=generate_password_hash("passwordtest"),
                email="useremail@email.com",
            )
            test_user.insert()
            test_user2 = models.User(
                username="user2",
                password=generate_password_hash("passwordtest"),
                email="user2email@email.com",
            )
            test_user2.insert()

            test_task = models.Task(
                description="Test task description",
                user_id=1,
                is_completed=False,
                is_delegated=False,
                do_immediately=False,
                is_due=False,
            )
            test_task.insert()

            # Add project to test database
            test_project = models.Project(
                name="Test project name", user_id=1, expected_outcome="I expect success"
            )
            test_project.insert()

        # data for testing purposes and keep DRY principle
        self.valid_user: dict[str, str] = {
            "email": "useremail@email.com",
            "username": "user",
            "password": "passwordtest",
        }

        self.new_user: dict[str, str] = {
            "username": "Laura",
            "email": "laura@email.com",
            "password": "testpassword",
        }

        self.new_task: dict[str, str] = {
            "description": "Finish all writing test for all endpoints"
        }

        self.new_category: dict[str, str] = {"name": "academics"}

    # FUNCTIONS to keep DRY principle

    def check_data_is_valid(
        self,
        data: dict[str, str],
        success: bool,
        code: int,
    ) -> None:
        self.assertEqual(data["success"], success)
        self.assertEqual(data["code"], code)

    def get_access_token(self) -> str:
        log: Any = self.client().post("api/v1/auth/login", json=self.valid_user)

        access_token: str = json.loads(log.data)["access_token"]
        return access_token

    def get_refresh_token(self) -> str:
        log: Any = self.client().post("api/v1/auth/login", json=self.valid_user)

        refresh_token: str = json.loads(log.data)["refresh_token"]
        return refresh_token

    def make_api_call(
        self,
        address: str,
        access_token: Optional[str] = None,
        body: Optional[Dict[str, Any]] = None,
        method_type: str = "GET",
    ) -> Dict[str, str]:
        if method_type == "GET":
            response: Any = self.client().get(
                f"{address}", headers=dict(Authorization=f"Bearer {access_token}")
            )
        elif method_type == "POST":
            response = self.client().post(
                f"{address}",
                headers=dict(Authorization=f"Bearer {access_token}"),
                json=body,
            )
        elif method_type == "PATCH":
            response = self.client().patch(
                f"{address}",
                headers=dict(Authorization=f"Bearer {access_token}"),
                json=body,
            )
        elif method_type == "DELETE":
            response = self.client().delete(
                f"{address}", headers=dict(Authorization=f"Bearer {access_token}")
            )
        else:
            raise KeyError(
                f"{method_type} is not a valid method. Method must be 'GET', 'POST', 'PATCH' or 'DELETE'"
            )
        data = json.loads(response.data)
        return data

    def tearDown(self):
        """Executed after reach test"""

    # TESTS

    # [x] test_auth_register
    def test_auth_register(self) -> None:
        # res = self.client().post("api/v1/auth/register", json=self.new_user)
        data: dict[str, str] = self.make_api_call(
            method_type="POST", address="api/v1/auth/register", body=self.new_user
        )

        self.check_data_is_valid(data=data, success=True, code=200)
        self.assertTrue(data["message"])
        self.assertTrue(data["user"])
        self.assertEqual(data["user"]["email"], self.new_user["email"])
        self.assertEqual(data["user"]["username"], self.new_user["username"])

    # [x] test_register_errors
    def test_400_auth_register_username_is_less_than_4_characters(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "us",
        #     "email": "usershortemail@email.com",
        #     "password": "testpassword"
        # })

        data = self.make_api_call(
            method_type="POST",
            address="api/v1/auth/register",
            body={
                "username": "us",
                "email": "usershortemail@email.com",
                "password": "testpassword",
            },
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"],
            "bad request: username is too short. username must be 4 characters or more",
        )

    def test_400_auth_register_password_is_less_than_8_characters(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "user1",
        #     "email": "user1email@email.com",
        #     "password": "passwor"
        # })
        data = self.make_api_call(
            method_type="POST",
            address="api/v1/auth/register",
            body={
                "username": "user1",
                "email": "user1email@email.com",
                "password": "passwor",
            },
        )

        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"],
            "bad request: password is too short. Password must be at least 8 characters",
        )

    def test_400_auth_register_username_must_alphanumeric(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "#user2",
        #     "email": "user2email@email.com",
        #     "password": "password"
        # })
        data = self.make_api_call(
            method_type="POST",
            address="api/v1/auth/register",
            body={
                "username": "#user2",
                "email": "user2email@email.com",
                "password": "password",
            },
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"],
            "bad request: username must contain alphabet and numbers only and must not contain spaces",
        )

    def test_400_auth_register_username_must_not_contain_whitespaces(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "user 3",
        #     "email": "user3email@email.com",
        #     "password": "password"
        # })

        data: Any = self.make_api_call(
            method_type="POST",
            address="api/v1/auth/register",
            body={
                "username": "user 3",
                "email": "user3email@email.com",
                "password": "password",
            },
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"],
            "bad request: username must contain alphabet and numbers only and must not contain spaces",
        )

    # [x] test_auth_login
    def test_auth_login(self):
        # res = self.client().post("/api/v1/auth/login", json=self.valid_user)
        data = self.make_api_call(
            method_type="POST", address="/api/v1/auth/login", body=self.valid_user
        )

        self.assertEqual(data["success"], True)
        self.assertEqual(data["code"], 200)
        self.assertTrue(data["username"])
        self.assertTrue(data["email"])
        self.assertTrue(data["refresh_token"])
        self.assertTrue(data["access_token"])

    # [x] test login errors
    # def test_401_auth_login_invalid_email(self):
    #     # res = self.client().post("api/v1/auth/login", json={
    #     #     "password": "passwordtest",
    #     #     "email": "invalid@email.com"
    #     # })
    #     data = self.make_api_call(
    #         method_type="POST",
    #         address="/api/v1/auth/login",
    #         body={"password": "passwordtest", "email": "invalid@email.com"},
    #     )
    #     print("==>", data)
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["error"], 401)
    #     self.assertEqual(data["message"], "unauthorized: invalid email or password")

    # def test_401_auth_login_invalid_password(self):
    #     data = self.make_api_call(
    #         method_type="POST",
    #         address="/api/v1/auth/login",
    #         body={"password": "passwordtes", "email": "useremail@email.com"},
    #     )

    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["error"], 401)
    #     self.assertEqual(data["message"], "unauthorized: invalid email or password")

    # [] test refresh token
    def test_refresh_token(self) -> None:
        refresh_token: str = self.get_refresh_token()

        data: dict[str, str] = self.make_api_call(
            address="api/v1/auth/refresh", access_token=refresh_token
        )
        print(">>>>>>>>", data)

        self.assertEqual(data["success"], True)
        self.assertEqual(data["code"], 200)
        self.assertTrue(data["access_token"])

    # [x] test_get_tasks

    def test_get_tasks(self) -> None:
        access_token: str = self.get_access_token()
        # get data from response
        data: dict[str, str] = self.make_api_call(
            address="api/v1/tasks", access_token=access_token
        )

        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertIsInstance(data["tasks"], list)
        self.assertEqual(data["tasks"][0]["description"], "Test task description")  # type: ignore

        # self.assertFalse(True)
        self.assertEqual(data["tasks"][0]["task_state"], {"do_immediately": False, "is_completed": False, "is_delegated": False, "is_due": False})  # type: ignore

    # [x] test_post_tasks

    def test_post_tasks(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="POST",
            address="api/v1/tasks",
            access_token=access_token,
            body={"description": "finish backend of effect"},
        )

        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        self.assertEqual(data["message"], "task created")

        # Ensure that there is a list of tasks
        self.assertIsInstance(data["tasks"], list)

    def test_400_post_tasks_request_has_no_description(self):
        # login using the valid test user to get access_token

        access_token = self.get_access_token()

        #  make api call
        data = self.make_api_call(
            method_type="POST",
            address="api/v1/tasks",
            access_token=access_token,
            body={"user_id": 1},
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: You must provide a description of the task"
        )

    # [] test_patch_tasks
    def test_update_tasks(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="PATCH",
            address="/api/v1/tasks/1",
            access_token=access_token,
            body={"description": "I updated this task"},
        )
        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertEqual(data["message"], "task updated")

        self.assertEqual(data["success"], True)

        # Ensure that there is a list of tasks
        self.assertIsInstance(data["tasks"], list)

    def test_404_update_tasks_task_not_found(self):
        access_token = self.get_access_token()
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="PATCH",
            address="/api/v1/tasks/99999",
            access_token=access_token,
            body={"description": "I updated this task"},
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 404)
        self.assertEqual(data["message"], "not found: no such task exist for this user")

    # def test_400_update_tasks_request_has_no_description(self):
    #     # login using the valid test user to get access_token

    #     access_token = self.get_access_token()

    #     #  make api call
    #     data = self.make_api_call(method_type="PATCH",
    #                               address="api/v1/tasks/1", access_token=access_token, body={
    #                                   "user_id": 1})
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["error"], 400)
    #     self.assertEqual(
    #         data["message"], "bad request: request must contain task description")

    # [x] test_delete_tasks
    def test_delete_task(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="DELETE", address="/api/v1/tasks/1", access_token=access_token
        )
        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertEqual(data["message"], "task deleted")

        # Ensure that there is a list of tasks
        self.assertIsInstance(data["tasks"], list)

    def test_404_delete_task_invalid_task_id(self) -> None:
        # login using the valid test user to get access_token
        access_token: str = self.get_access_token()

        data: dict[str, str] = self.make_api_call(
            method_type="DELETE",
            address="/api/v1/tasks/99999",
            access_token=access_token,
        )
        # check success is True
        self.assertEqual(data["success"], False)

        # check status code
        self.assertEqual(data["error"], 404)

        # Ensure that there is a list of tasks
        self.assertEqual(data["message"], "not found: no such task exist for this user")

    # def test_logout(self) -> None:
    #     access_token = self.get_access_token()
    #     data: dict[str, str] = self.make_api_call(
    #         address="api/v1/auth/logout", access_token=access_token
    #     )

    #     self.assertEqual(data["success"], True)
    #     self.assertEqual(data["code"], 200)

    # [] test_get_projects
    def test_get_projects(self) -> None:
        access_token: str = self.get_access_token()
        data: dict[str, str] = self.make_api_call(
            address="api/v1/projects", access_token=access_token
        )

        self.assertEqual(data["success"], True)
        self.assertEqual(data["code"], 200)
        # self.assertIsInstance(data["projects"],list])

    # [] test_post_projects
    def test_post_projects(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="POST",
            address="api/v1/projects",
            access_token=access_token,
            body={"name": "effect"},
        )

        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        self.assertEqual(data["message"], "project created")

        # Ensure that there is a list of projects
        self.assertIsInstance(data["projects"], list)

    def test_400_post_projects_request_has_no_name(self):
        # login using the valid test user to get access_token

        access_token = self.get_access_token()

        #  make api call
        data = self.make_api_call(
            method_type="POST",
            address="api/v1/projects",
            access_token=access_token,
            body={"user_id": 1},
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"],
            "bad request: You must provide project name",
        )

    # [] test_patch_projects
    def test_update_projects(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="PATCH",
            address="/api/v1/projects/1",
            access_token=access_token,
            body={"name": "I updated this project"},
        )
        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of projects
        self.assertEqual(data["message"], "project updated")

        self.assertEqual(data["success"], True)

        # Ensure that there is a list of projects
        self.assertIsInstance(data["projects"], list)

    def test_404_update_projects_project_not_found(self):
        access_token = self.get_access_token()
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="PATCH",
            address="/api/v1/projects/99999",
            access_token=access_token,
            body={"description": "I updated this project"},
        )
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 404)
        self.assertEqual(
            data["message"], "not found: no such project exist for this user"
        )

    # def test_400_update_projects_request_has_no_description(self):
    #     # login using the valid test user to get access_token

    #     access_token = self.get_access_token()

    #     #  make api call
    #     data = self.make_api_call(method_type="PATCH",
    #                               address="api/v1/projects/1", access_token=access_token, body={
    #                                   "user_id": 1})
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["error"], 400)
    #     self.assertEqual(
    #         data["message"], "bad request: request must contain project description")

    # [x] test_delete_projects
    def test_delete_project(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(
            method_type="DELETE",
            address="/api/v1/projects/1",
            access_token=access_token,
        )
        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of projects
        self.assertEqual(data["message"], "project deleted")

        # Ensure that there is a list of projects
        self.assertIsInstance(data["projects"], list)

    def test_404_delete_project_invalid_project_id(self) -> None:
        # login using the valid test user to get access_token
        access_token: str = self.get_access_token()

        data: dict[str, str] = self.make_api_call(
            method_type="DELETE",
            address="/api/v1/projects/99999",
            access_token=access_token,
        )
        # check success is True
        self.assertEqual(data["success"], False)

        # check status code
        self.assertEqual(data["error"], 404)

        # Ensure that there is a list of projects
        self.assertEqual(
            data["message"], "not found: no such project exist for this user"
        )


if __name__ == "__main__":
    unittest.main()
