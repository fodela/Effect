
import os
import unittest
import json

from src.database import models
from src import create_app

# from dotenv import load_env

from flask_sqlalchemy import SQLAlchemy

# Makes available all environment variables from the .env file
# load_env()

# DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
# DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

DATABASE_USERNAME = "fodela"
DATABASE_PASSWORD = "f0d3la"


class EffectTestCase(unittest.TestCase):
    """This class represents the effect test case

    """

    def setUp(self):
        """Defines test variables and initialize app."""

        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "effect_test_db"

        self.database_path = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@localhost:5432/{self.database_name} "

        models.setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

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

    def tearDown(self):
        """Executed after reach test
        """

    # # [] test_auth_register
    def test_auth_register(self):
        self.assertEqual(2, "2")

    #     pass

    # # [] test_auth_login
    # def test_auth_login(self):
    #     pass

    # # [x] test_get_tasks
    # # def test_get_tasks(self):
    # #     #  make api call
    # #     res = self.client.get("/tasks")

    # #     # store the data
    # #     data = json.loads(res.data)

    # #     # check success is True
    # #     self.assertEqual(data["success"], True)

    # #     # check status code
    # #     self.assertEqual(data["code"], 200)
    # #     print("worked")
    # #     # Ensure that there is a list of tasks
    # #     self.assertTrue(len(data["tasks"]))
    # #     self.assertIsInstance(data["tasks"], list)

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
