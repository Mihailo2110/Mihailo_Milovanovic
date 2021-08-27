from typing import List, Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str


class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    password: str


class UserReturn(BaseModel):
    first_name: str
    last_name: str
    email: str


class Login(BaseModel):
    email: str
    password: str


class CheckToken(BaseModel):
    email: str
    token: str


class AllUsers(BaseModel):
    users: List[UserReturn]


class ChangePassword(BaseModel):
    email: str
    old_password: str
    new_password: str
    confirm_password: str
