
from email.header import Header
import os
from typing import Any, Dict, List
import unittest
import json

from src.database import models
from src import create_app

from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash


# Makes available all environment variables from the .env file
load_dotenv()

DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")


class EffectTestCase(unittest.TestCase):
    """This class represents the effect test case

    """

    def setUp(self):
        """Defines test variables and initialize app."""

        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "effect_test_db"

        self.database_path = (f"postgresql://{DATABASE_USERNAME}:"
                              f"{DATABASE_PASSWORD}@localhost:5432/"
                              f"{self.database_name}")

        models.setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            db = SQLAlchemy()
            db.init_app(self.app)
            models.db_drop_and_create_all()
            # Add user to test database
            test_user = models.User(
                username="user",
                password=generate_password_hash("passwordtest"),
                email="useremail@email.com"
            )
            test_user.insert()
            test_user2 = models.User(
                username="user2",
                password=generate_password_hash("passwordtest"),
                email="user2email@email.com"
            )
            test_user2.insert()

            # Add task to test database
            test_task = models.Task(
                description="Test task description",
                user_id=1,
            )
            test_task.insert()

        # data for testing purposes and keep DRY principle
        self.valid_user = {
            "email": "useremail@email.com",
            "username": "user",
            "password": "passwordtest"
        }

        self.new_user = {
            "username": "Laura",
            "email": "laura@email.com",
            "password": "testpassword"
        }

        self.new_task = {
            "description": "Finish all writing test for all endpoints"
        }

        self.new_category = {
            "name": "academics"
        }

    # FUNCTIONS to keep DRY principle

    def check_data_is_valid(
        self,
        data,
        success: bool,
        code: int,
    ):
        self.assertEqual(data["success"], success)
        self.assertEqual(data["code"], code)

    def get_access_token(self) -> str:
        log = self.client().post("api/v1/auth/login", json=self.valid_user)

        access_token: str = json.loads(log.data)["access_token"]
        return access_token

    def make_api_call(self, address: str, access_token: str = None, body: Dict[str, str] = None, method_type: str = "GET") -> Dict[str, str]:
        if method_type == "GET":
            response = self.client().get(
                f"{address}",
                headers=dict(
                    Authorization=f"Bearer {access_token}"
                )
            )
        elif method_type == "POST":
            response = self.client().post(
                f"{address}",
                headers=dict(
                    Authorization=f"Bearer {access_token}"
                ),
                json=body
            )
        elif method_type == "PATCH":
            response = self.client().patch(
                f"{address}",
                headers=dict(
                    Authorization=f"Bearer {access_token}"
                ),
                json=body
            )
        elif method_type == "DELETE":
            response = self.client().patch(
                f"{address}",
                headers=dict(
                    Authorization=f"Bearer {access_token}"
                )
            )
        else:
            raise KeyError(
                f"{method_type} is not a valid method. Method must be 'GET', 'POST', 'PATCH' or 'DELETE'")
        data = json.loads(response.data)
        return data

    def tearDown(self):
        """Executed after reach test
        """

    # TESTS

    # [x] test_auth_register
    def test_auth_register(self):
        # res = self.client().post("api/v1/auth/register", json=self.new_user)
        data = self.make_api_call(method_type="POST",
                                  address="api/v1/auth/register", body=self.new_user)

        self.check_data_is_valid(data=data, success=True, code=200)
        self.assertTrue(data["message"])
        self.assertTrue(data["user"])
        self.assertEqual(data["user"]["email"], self.new_user["email"])
        self.assertEqual(data["user"]["username"], self.new_user["username"])

    # [x] test_register_errors
    def test_400_auth_register_username_is_less_than_3_characters(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "us",
        #     "email": "usershortemail@email.com",
        #     "password": "testpassword"
        # })

        data = self.make_api_call(method_type="POST", address="api/v1/auth/register", body={
            "username": "us",
            "email": "usershortemail@email.com",
            "password": "testpassword"
        })
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: username is too short. username must be 3 characters or more")

    def test_400_auth_register_password_is_less_than_8_characters(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "user1",
        #     "email": "user1email@email.com",
        #     "password": "passwor"
        # })
        data = self.make_api_call(method_type="POST", address="api/v1/auth/register", body={
            "username": "user1",
            "email": "user1email@email.com",
            "password": "passwor"
        })

        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: password is too short. Password must be at least 8 characters")

    def test_400_auth_register_username_must_alphanumeric(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "#user2",
        #     "email": "user2email@email.com",
        #     "password": "password"
        # })
        data = self.make_api_call(method_type="POST", address="api/v1/auth/register", body={
            "username": "#user2",
            "email": "user2email@email.com",
            "password": "password"
        })
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: username must contain alphabet and numbers only and must not contain spaces")

    def test_400_auth_register_username_must_not_contain_whitespaces(self):
        # res = self.client().post("api/v1/auth/register", json={
        #     "username": "user 3",
        #     "email": "user3email@email.com",
        #     "password": "password"
        # })

        data = self.make_api_call(method_type="POST", address="api/v1/auth/register", body={
            "username": "user 3",
            "email": "user3email@email.com",
            "password": "password"
        })
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: username must contain alphabet and numbers only and must not contain spaces")

    # # [x] test_auth_login
    def test_auth_login(self):
        # res = self.client().post("/api/v1/auth/login", json=self.valid_user)
        data = self.make_api_call(
            method_type="POST", address="/api/v1/auth/login", body=self.valid_user)

        self.assertEqual(data["success"], True)
        self.assertEqual(data["code"], 200)
        self.assertTrue(data["username"])
        self.assertTrue(data["email"])
        self.assertTrue(data["refresh_token"])
        self.assertTrue(data["access_token"])

    # [x] test login errors
    def test_401_auth_login_invalid_email(self):
        # res = self.client().post("api/v1/auth/login", json={
        #     "password": "passwordtest",
        #     "email": "invalid@email.com"
        # })
        data = self.make_api_call(method_type="POST", address="/api/v1/auth/login", body={
            "password": "passwordtest",
            "email": "invalid@email.com"
        })

        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 401)
        self.assertEqual(
            data["message"], "unauthorized: invalid email or password")

    def test_401_auth_login_invalid_password(self):
        # res = self.client().post("api/v1/auth/login", json={
        #     "password": "passwordtes",
        #     "email": "useremail@email.com"
        # })
        data = self.make_api_call(method_type="POST", address="/api/v1/auth/login", body={
            "password": "passwordtes",
            "email": "useremail@email.com"
        })

        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 401)
        self.assertEqual(
            data["message"], "unauthorized: invalid email or password")

    # [] test_get_tasks

    def test_get_tasks(self):
        access_token = self.get_access_token()
        # get data from response
        data = self.make_api_call(
            address="api/v1/tasks", access_token=access_token)

        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertIsInstance(data["tasks"], list)

    # # # [] test_post_tasks

    def test_post_tasks(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(method_type="POST",
                                  address="api/v1/tasks", access_token=access_token, body={"description": "finish backend of effect",
                                                                                           "user_id": 1
                                                                                           })

        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertEqual(data["message"], "task created")

        self.assertEqual(data["success"], True)
        self.assertEqual(data["code"], 200)

    def test_400_post_tasks_request_has_no_description(self):
        # login using the valid test user to get access_token

        access_token = self.get_access_token()

        #  make api call
        data = self.make_api_call(method_type="POST",
                                  address="api/v1/tasks", access_token=access_token, body={
                                      "user_id": 1})
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: You must provide a description of the task")

    # [] test_patch_tasks
    def test_update_tasks(self):
        # login using the valid test user to get access_token
        access_token = self.get_access_token()

        data = self.make_api_call(method_type="PATCH", address="/api/v1/tasks/1", access_token=access_token, body={
            "description": "I updated this task"
        })
        print(data)
        # check success is True
        self.assertEqual(data["success"], True)

        # check status code
        self.assertEqual(data["code"], 200)

        # Ensure that there is a list of tasks
        self.assertEqual(data["message"], "task updated")

        self.assertEqual(data["success"], True)

    # def test_404_update_tasks_task_not_found(self):
    #     access_token = self.get_access_token()
    #     # login using the valid test user to get access_token
    #     access_token = self.get_access_token()

    #     data = self.make_api_call(method_type="PATCH", address="/api/v1/tasks/1", access_token=access_token, body={
    #         "description ": "I updated this task"
    #     })
    #     self.assertEqual(data["success"], False)
    #     self.assertEqual(data["error"], 404)
    #     self.assertEqual(
    #         data["message"], "not found")

    def test_400_update_tasks_request_has_no_description(self):
        # login using the valid test user to get access_token

        access_token = self.get_access_token()

        #  make api call
        data = self.make_api_call(method_type="PATCH",
                                  address="api/v1/tasks/1", access_token=access_token, body={
                                      "user_id": 1})
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: request must contain task description")
    # # [] test_delete_tasks
    # def test_delete_tasks(self):
    #     pass

    # # [] test_get_categories
    # def test_get_categories(self):
    #     pass

    # # [] test_post_categories
    # def test_post_categories(self):
    #     pass

    # # [] test_patch_categories
    # def test_patch_categories(self):
    #     pass

    # # [] test_delete_categories
    # def test_delete_categories(self):
    #     pass


if __name__ == "__main__":
    unittest.main()
