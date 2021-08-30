# Auth API Documentation

#### Login Request Example:
POST http://localhost:8080/authorizatoin/login
```json
{
    "email": "example@example.com",
    "password": "password"
}
```

#### Login Response Example:
```json
```
  
How to run:
```
1. first get master branch from git
2. install npm and nodejs
3. type in terminal npm start in project, it should set it on localhost:3000
```

```terminal
no docker:
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 1

docker:
sudo docker-compose up --build
```
