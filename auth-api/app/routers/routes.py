import secrets

from fastapi import APIRouter

from app.api.logic import UserCRUD, Login, MessageSender
from app.api import models as api_models

api = APIRouter()


@api.get("/health-check")
async def health_check():
    message = {
        "HEALTH": "OK"
    }
    return message


@api.get("/user/{email}")
async def get_user(email: str):
    return UserCRUD().get_user(
        email=email
    )


@api.get("/users/all")
async def get_user():
    return UserCRUD().get_all_users()


@api.post("/user")
async def create_user(user: api_models.UserCreate):
    return UserCRUD().create_user(
        user=user
    )


@api.put("/user/{email}")
async def update_user(email: str, user: api_models.UserUpdate):
    return UserCRUD.update_user(
        email=email,
        user=user
    )


@api.delete("/user/{email}")
async def delete_user(email: str):
    return UserCRUD.delete_user(
        email=email
    )


@api.post("/login")
async def login(login_user: api_models.Login):
    return Login.login(
        login_user=login_user
    )


@api.post("/check-token")
async def check_token(token: api_models.CheckToken):
    return Login.check_token(
        token=token
    )


@api.post("/set-token")
async def check_token(email: str):
    return Login.set_token(
        email=email
    )


@api.post("/change-password")
async def change_password(change_pass: api_models.ChangePassword):
    return Login.change_password(
        change_pass=change_pass
    )
