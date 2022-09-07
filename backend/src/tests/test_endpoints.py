
import os
import unittest

from backend.src import create_app
from backend.src.database.models import setup_db
from dotenv import load_env

from flask_sqlalchemy import SQLAlchemy

# Makes available all environment variables from the .env file
load_env()

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

        self.database_path = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@localhost:5432/{self.database_name} "

        setup_db(self.app, self.database_path)

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

        self.new_category = {
            "name": "academics"
        }

        def tearDown(self):
            """Executed after reach test
            """

        # [] test_auth_register
        def test_auth_register(self):
            pass

        # [] test_auth_login
        def test_auth_login(self):
            pass

        # [] test_get_tasks
        def test_get_tasks(self):
            pass

        # [] test_post_tasks
        def test_post_tasks(self):
            pass

        # [] test_patch_tasks
        def test_patch_tasks(self):
            pass

        # [] test_delete_tasks
        def test_delete_tasks(self):
            pass

        # [] test_get_categories
        def test_get_categories(self):
            pass

        # [] test_post_categories
        def test_post_categories(self):
            pass

        # [] test_patch_categories
        def test_patch_categories(self):
            pass

        # [] test_delete_categories
        def test_delete_categories(self):
            pass
