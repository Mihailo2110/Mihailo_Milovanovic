from sqlalchemy import Column, String, DateTime

from app.database.db import Base


class User(Base):
    __tablename__ = "user"
    email = Column(String(50), nullable=False, primary_key=True, unique=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)


class Token(Base):
    __tablename__ = "token"
    email = Column(String(50), nullable=False, primary_key=True, unique=True)
    token = Column(String(50), nullable=True)
    registered_on = Column(DateTime(50), nullable=True)
