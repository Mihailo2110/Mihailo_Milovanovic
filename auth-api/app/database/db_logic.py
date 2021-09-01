import sqlite3
from datetime import datetime

from app.database import db_models
from app.database.db import AuthDB


class UserDB:
    def __init__(self):
        self.db = AuthDB().connect()

    def get_user(self, email):
        return self.db.query(db_models.User).filter(db_models.User.email == email).first()

    def get_all_users(self):
        return self.db.query(db_models.User).all()

    def create_user(self, user):
        try:
            current_user = db_models.User()
            current_user.email = user.email
            current_user.first_name = user.first_name
            current_user.last_name = user.last_name
            current_user.password = user.password
            self.db.add(current_user)
            self.db.commit()
            return True
        except Exception as e:
            raise e

    def update_user(self, email, update_user):
        current_user = self.db.query(db_models.User).filter(db_models.User.email == email).first()
        setattr(current_user, "first_name", update_user.first_name)
        setattr(current_user, "last_name", update_user.last_name)
        if update_user.password:
            setattr(current_user, "password", update_user.password)
        else:
            setattr(current_user, "password", current_user.password)
        self.db.commit()
        return True

    def delete(self, email: str):
        try:
            self.db.query(db_models.User).filter(db_models.User.email == email).delete()
            self.db.commit()
            return True
        except Exception as e:
            raise e

    def find_by_email(self, email: str):
        return self.db.query(db_models.User).filter(db_models.User.email == email).first()


class TokenDB:
    def __init__(self):
        self.db = AuthDB().connect()

    def find_by_email(self, email: str):
        return self.db.query(db_models.Token).filter(db_models.Token.email == email).first()

    def create(self, email: str, token: str):
        new_token = db_models.Token()
        new_token.email = email
        new_token.token = token
        new_token.registered_on = datetime.now()
        self.db.add(new_token)
        self.db.commit()
        return new_token

    def update(self, email: str, parameter: dict):
        current_token = self.db.query(db_models.Token).filter(db_models.Token.email == email).first()
        setattr(current_token, list(parameter.keys())[0], list(parameter.values())[0])
        self.db.add(current_token)
        self.db.commit()

    def delete(self, email: str):
        self.db.query(db_models.Token).filter(db_models.Token.email == email).delete()
        self.db.commit()
        return "deleted"
