
import os
from typing import Any
import unittest
import json

from src.database import models
from src import create_app

from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy

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
            test_user = models.User(
                username="us",
                password="testpassword",
                email="useremail@gmail.com"
            )
            test_user.insert()

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

    def check_data_is_valid(
        self,
        data,
        success: bool,
        code: int,
    ):
        self.assertEqual(data["success"], success)
        self.assertEqual(data["code"], code)

    def tearDown(self):
        """Executed after reach test
        """

    # [x] test_auth_register
    def test_auth_register(self):
        res = self.client().post("api/v1/auth/register", json=self.new_user)
        data = json.loads(res.data)

        self.check_data_is_valid(data=data, success=True, code=200)
        self.assertTrue(data["message"])
        self.assertTrue(data["user"])
        self.assertEqual(data["user"]["email"], self.new_user["email"])
        self.assertEqual(data["user"]["username"], self.new_user["username"])

    # [] test_username_is_too_short
    def test_400_auth_register_username_is_less_than_3_characters(self):
        res = self.client().post("api/v1/auth/register", json={
            "username": "us",
            "email": "useremail@email.com",
            "password": "testpassword"
        })
        data = json.loads(res.data)
        print(data["success"])
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: username is too short. username must be 3 characters or more")

    def test_400_auth_register_password_is_less_than_8_characters(self):
        res = self.client().post("api/v1/auth/register", json={
            "username": "user1",
            "email": "user1email@email.com",
            "password": "passwor"
        })
        data = json.loads(res.data)
        print(data["success"])
        self.assertEqual(data["success"], False)
        self.assertEqual(data["error"], 400)
        self.assertEqual(
            data["message"], "bad request: password is too short. Password must be at least 8 characters")

    # # [] test_auth_login
    # def test_auth_login(self):
    #     pass

    # # [] test_get_tasks

    # def test_get_tasks(self):
    #     #  make api call
    #     res = self.client().get("api/v1/tasks")

    #     # store the data
    #     data = json.loads(res.data)
    # #     # check success is True
    #     self.assertEqual(data["success"], True)

    # #     # check status code
    #     self.assertEqual(data["code"], 200)
    #     print("worked")
    # #     # Ensure that there is a list of tasks
    #     self.assertTrue(len(data["tasks"]))
    #     self.assertIsInstance(data["tasks"], list)

    # # [] test_404_get_tasks
    # def test_404_get_tasks(self):
    #     pass

    # # [] test_post_tasks
    # def test_post_tasks(self):
    #     res = self.client().post("tasks", json=self.new_task)
    #     data = json.loads(res.data)

    #     self.assertEqual(data["success"], True)
    #     self.assertEqual(data["code"], 200)
    #     self.assertEqual(data["message"], "task created")

    # # [] test_patch_tasks
    # def test_patch_tasks(self):
    #     pass

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

    print(__name__)
