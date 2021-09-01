import secrets
import smtplib

from datetime import datetime, timedelta
from app.database.db_models import User, Token
from app.database.db_logic import UserDB, TokenDB
from app.api import models as api_models

from app.utils.utils import check_email

from fastapi.responses import JSONResponse


class UserCRUD:

    @staticmethod
    def get_user(email):
        try:
            user = UserDB().get_user(
                email=email
            )
            if not user:
                return JSONResponse(
                    status_code=400,
                    content={"message": f"Account with email: {email} is not registered!"}
                )
            return user
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"message": str(e)}
            )

    @staticmethod
    def get_all_users():
        try:

            users = UserDB().get_all_users()
            if not users:
                return JSONResponse(
                    status_code=400,
                    content={"message": "There are no accounts in database!"}
                )
            return users
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"message": str(e)}
            )

    @staticmethod
    def create_user(user):
        try:
            if UserDB().create_user(
                    user=user
            ):
                return JSONResponse(
                    status_code=200,
                    content={"message": "Account created successfully!"}
                )
            else:
                return JSONResponse(
                    status_code=400,
                    content={"message": "Confirm password not correct"}
                )
        except Exception as e:
            return JSONResponse(
                status_code=400,
                content={"message": f"There already exists an account registered with this email!"}
            )

    @staticmethod
    def update_user(user, email):
        try:
            if not check_email(email=email):
                return JSONResponse(
                    status_code=400,
                    content={"message": f"Account with email: {email} is not registered!"}
                )
            if UserDB().update_user(
                    email=email,
                    update_user=user
            ):
                return JSONResponse(
                    status_code=200,
                    content={"message": f"Successfully updated account!"}
                )
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"message": str(e)}
            )

    @staticmethod
    def delete_user(email):
        try:
            if not check_email(email=email):
                return JSONResponse(
                    status_code=400,
                    content={"message": f"Account with email: {email} is not registered!"}
                )
            if UserDB().delete(
                    email=email
            ):
                return JSONResponse(
                    status_code=200,
                    content={"message": "Account deleted successfully!"}
                )
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"message": str(e)}
            )


class Login:

    @staticmethod
    def login(login_user):
        try:
            email = getattr(login_user, "email")
            password = getattr(login_user, "password")

            if not check_email(email=email):
                return JSONResponse(
                    status_code=400,
                    content={"message": "E-mail not valid"}
                )
            user = UserDB().get_user(
                email=email
            )
            if password != getattr(user, "password"):
                return JSONResponse(
                    status_code=400,
                    content={"message": "Password not correct!"}
                )
            # email = getattr(user, "email")
            Login.set_token(email)
            return JSONResponse(
                status_code=200,
                content={"message": f"Login successful, token sent on {email}"}
            )
        except Exception as e:
            return str(e)

    @staticmethod
    def set_token(email):
        check_token_exists = TokenDB().find_by_email(
            email=email
        )
        new_token = str(secrets.token_hex(2))
        token = Token(email=email, token=new_token, registered_on=datetime.now())

        if not check_token_exists:
            TokenDB().create(
                email=email,
                token=new_token
            )
        else:
            TokenDB().update(
                email=email,
                parameter={
                    "token": new_token
                }
            )
            TokenDB().update(
                email=email,
                parameter={
                    "registered_on": datetime.now()
                }
            )
        MessageSender.send_message(
            email=email,
            token=new_token
        )

    @staticmethod
    def check_token(token):
        try:
            validation_time_seconds = timedelta(seconds=600)
            email = getattr(token, "email")
            token = getattr(token, "token")
            current_token = TokenDB().find_by_email(
                email=email
            )
            if not current_token:
                return JSONResponse(
                    status_code=404,
                    content={"message": "Token doesn't exist!"}
                )

            delta_seconds = datetime.now() - current_token.registered_on
            if (token == current_token.token) & (delta_seconds <= validation_time_seconds):
                TokenDB().delete(
                    email=email
                )
                return JSONResponse(
                    status_code=200,
                    content={"message": "Successfully logged in"}
                )
            else:
                if delta_seconds >= validation_time_seconds:
                    return JSONResponse(
                        status_code=400,
                        content={"message": "Token expired"}
                    )
                return JSONResponse(
                    status_code=400,
                    content={"message": "Token is not correct"}
                )
        except Exception as e:
            return str(e)

    @staticmethod
    def change_password(change_pass):
        try:
            if not check_email(
                    email=change_pass.email
            ):
                return JSONResponse(
                    status_code=400,
                    content={"message": f"Account with email: {change_pass.email} is not registered!"}
                )
            user = UserDB().get_user(
                email=change_pass.email
            )
            if user.password != change_pass.old_password:
                return JSONResponse(
                    status_code=400,
                    content={"message": "Password not correct!"}
                )

            if change_pass.new_password != change_pass.confirm_password:
                return JSONResponse(
                    status_code=400,
                    content={"message": "Passwords are not the same!"}
                )
            if user.password == change_pass.new_password:
                return JSONResponse(
                    status_code=400,
                    content={"message": "New password is same as previous!"}
                )
            new_user = api_models.UserUpdate(first_name=user.first_name, last_name=user.last_name,
                                             password=change_pass.new_password)
            UserDB().update_user(
                email=change_pass.email,
                update_user=new_user
            )
            return JSONResponse(
                status_code=200,
                content={"message": "Password changed successfully!"}
            )
        except Exception as e:
            return str(e)


class MessageSender:

    @staticmethod
    def send_message(email, token):
        s = smtplib.SMTP("smtp.gmail.com", 587)
        s.starttls()
        try:
            s.login("auth.service.21@gmail.com", "sifra123")
        except smtplib.SMTPAuthenticationError:
            print("Credentials not good")
        s.sendmail("auth.service.21@gmail.com", email, f"Your token is {token}")
        s.quit()
        return JSONResponse(
            status_code=200,
            content={"message": f"Your confirmation code has been sent on {email}"}
        )
