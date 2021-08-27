# Database connection
import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Path("./db").mkdir(parents=True, exist_ok=True)
file_path = os.path.abspath(os.getcwd() + "/db/auth.db")
SQLALCHEMY_DATABASE_URL = "sqlite:////" + file_path
Base = declarative_base()


class AuthDB:
    def __init__(self):
        self.db = create_engine(
            SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
        )
        Base.metadata.create_all(bind=self.db)

    def connect(self):
        local_session = sessionmaker(autocommit=False, autoflush=False, bind=self.db)
        session = local_session()
        return session
