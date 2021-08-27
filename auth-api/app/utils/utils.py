from app.database.db_logic import UserDB


def check_email(email):
    user = UserDB().get_user(
        email=email
    )
    if user:
        return True
    return False
