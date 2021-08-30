# Auth API Documentation



## How to use:

#### Changes:

#### Requirements:


#### Login Request Example:
POST http://localhost:8080/authorizatoin/login
```json
{
    "username": "mica",
    "password": "sifra123"
}
```

#### Login Response Example:
```json

```
  
How to run:  
```terminal 
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 1
```
