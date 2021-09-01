# Auth API Documentation
## Table of contents
* [Description](#description)
* [Routes](#routes)
* [Installation](#installation) 
* [Directory Structure](#directory-structure)
* [Maintainers](#mainteners)
## Description
Service for two-factor authentication that gives an extra level of security,
in which users provide two different authentication factors to verify themselves.
Two-factor authentication methods rely on a user providing a password as the first factor and a second, different factor, in our case a security token.
it adds an additional layer of security to the authentication process
by making it harder for attackers to gain access to a person's devices or online accounts because,
even if the victim's password is hacked, a password alone is not enough to pass the authentication check.
## Routes
```
Health check - checks if service is up and running.
    - Route: GET http://localhost:8080/authorization/health-check 
```
```
Get user - returns user
    - Route: GET http://localhost:8080/authorization/user/{email}
```
```
Get all users - return list of available users
    - Route: GET http://localhost:8080/authorization/users/all
```
```
Create user - creates a user
    - Route: POST http://localhost:8080/authorization/user
```
```
Update user - udates users info
    - Route: PUT http://localhost:8080/authorization/user/{email}
```
```
Delete user - deletes users account
    - Route: DELETE http://localhost:8080/authorization/user/{email}
```
```
Login - sends token on email if password is correct
    - Route: POST http://localhost:8080/authorization/login
```
```
Check-token - checks if sent token is correct
    - Route: POST http://localhost:8080/authorization/check-token
```
```
Change-password - changes users password
    - Route: POST http://localhost:8080/authorization/change-password
```
## Installation
GUI(JS)
```
1. first get master branch from git
2. install npm and nodejs
3. type in terminal npm start in project, it should set it on localhost:3000
```
Python
```terminal
no docker:
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 1

docker:
sudo docker-compose up --build
```
## Directory Structure
 Code is structured as follows:
 ```
 - app:
     - api: logic implementations and pydantic models: 
         - logic.py: logic implementation for all endpoints
         - models.py: request model definition
     - database:
         - db.py - Database connection class
         - db_logic.py - Database Query logic
         - db_models.py - Defined Database models
     - routes: endpoint routes for requests
     - utils: all additional scrips and utilities for manipulation and calculation
         - utils.py: helper methods
     - main.py: main script for registering the application and celery tasks
 - docker-compose: docker-compose file for item api service
 - Dockerfile: instructions and commands for building a Docker image
 - requirements.txt: dependencies and their versions to be installed
 - run_server.sh: script for building and running a gateway
 ```