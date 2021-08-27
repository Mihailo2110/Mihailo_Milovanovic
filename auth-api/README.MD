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
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkICIycXRVV1dmQ0x6bDNwd2o2ZF9RVDB0dEphYzh1WU5hTzVrMnFnaEhnSHpBIn0.eyJleHAiOjE2MDA0NjU0MTQsImlhdCI6MTYwMDQzNjYxNCwianRpIjoiYmUyZjRjNTktNjkyOC00ZWRkLThhMjUtNDhkZjhiNjk0YzYwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRlc3QudGhpbmdzb2x2ZXIuY29tL2F1dGgvcmVhbG1zL3NvbHZlciIsImF1ZCI6WyJzb2x2ZXIiLCJhY2NvdW50Il0sInN1YiI6IjYzNDJkMDhhLWI1OTMtNDYxMS05YjU0LWI4NDMyNGY0YzZiMiIsInR5cCI6IkJlYXJlciIsImF6cCI6InNvbHZlciIsInNlc3Npb25fc3RhdGUiOiJjYWU4NzY4MC02NjIyLTQwYTAtYWE1My04YjI0Y2E0NDYwMjQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJzb2x2ZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNvbHZlciJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzb2x2ZXIifQ.WLMuEOjGYSU8gHqVUIcdNpz7fSA-W-ZMQ2rCEqekN41s8hFJapNHRfB5LYmPuD5KueQ3AWIiOPJvUrappt-1oy2j56rfD6bnxHB8jLFkZuwVR0o_nczXISsiErR8DY97tYaadpcg8OfHXVrEdASVbRks6mRv59QVGoPNrpMf3Ob4e7eGOXds1SN5l_eAADkQKqwrB3ptSwIVg5NPo4B6GDsSDFTewm6n809YDJEllB0JxpLoblN4Y1RLyftdDlZp1FTsOzZiWkgfORG54q5FYNVN9b_pr45gpXxcCX0tRm0i75GZklcnBbOi5C8n500KCSJb9FPRwfgNYoeG3S8mig",
    "expires_in": "28800",
    "refresh_expires_in": "1800",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOldUIiwia2lkIiA6ICI1YmUyYjVjMC1jMDYxLTRmYmQtOWEzOS1jN2Y0NzZjZDRjMzQifQ.eyJleHAiOjE2MDA0Mzg0MTQsImlhdCI6MTYwMDQzNjYxNCwianRpIjoiNjVkNTZjMDgtNjdiZS00ZDdlLWE4YzUtOWI1NWU3OTE1YzIwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRlc3QudGhpbmdzb2x2ZXIuY29tL2F1dGgvcmVhbG1zL3NvbHZlciIsImF1ZCI6Imh0dHBzOi8vYXV0aC10ZXN0LnRoaW5nc29sdmVyLmNvbS9hdXRoL3JlYWxtcy9zb2x2ZXIiLCJzdWIiOiI2MzQyZDA4YS1iNTkzLTQ2MTEtOWI1NC1iODQzMjRmNGM2YjIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoic29sdmVyIiwic2Vzc2lvbl9zdGF0ZSI6ImNhZTg3NjgwLTY2MjItNDBhMC1hYTUzLThiMjRjYTQ0NjAyNCIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSJ9.8d-fHMThap9n3aJnC_XebjKWMNYqpQw2SMn8cTAl7yA",
    "token_type": "bearer",
    "not_before_policy": "0",
    "session_state": "cae83680-6622-40a0-aa53-8b24ca46024",
    "scope": "email profile"
}
```

#### Logout Request Example:
POST http://aisuite.example.com/api/auth/logout
```json
{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1YmUyYjVjMC1jMDYxLTRmYmQtOWEzOS1jN2Y0NzZjZDRjMzQifQ.eyJleHAiOjE2MDIxNjczNjksImlhdCI6MTYwMjE2NTU2OSwianRpIjoiOWMzMjRmOTEtOGQ5OS00YTkzLWIzY2UtYWZmMzM3ZGQ4MGZlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRlc3QudGhpbmdzb2x2ZXIuY29tL2F1dGgvcmVhbG1zL3NvbHZlciIsImF1ZCI6Imh0dHBzOi8vYXV0aC10ZXN0LnRoaW5nc29sdmVyLmNvbS9hdXRoL3JlYWxtcy9zb2x2ZXIiLCJzdWIiOiI2MzQyZDA4YS1iNTkzLTQ2MTEtOWI1NC1iODQzMjRmNGM2YjIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoic29sdmVyIiwic2Vzc2lvbl9zdGF0ZSI6IjI2YWQ3ZDEwLWYwMmYtNGRiMi1iNTMzLTJkYmNlNTQ2YmEzZSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSJ9.xjg3qXExoLSiVy2mLYA51BktFtQHFig3pZmIbqdPKYo"
}
```

#### Logout Response Example:
```json
{
    "detail": "User solver logged out successfully"
}
```

#### Login Response Example:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIycXRVV1dmQ0x6bDNwd2o2ZF9RVDB0dEphYzh1WU5hTzVrMnFn.eyJleHAiOjE2MDIxODg3OTAsImlhdCI6MTYwMjE1OTk5MCwianRpIjoiMTY3MjQ0YzUtYzYwOC00MjJhLTkyNDctNzExNGU5ZmFhM2UxIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRlc3QudGhpbmdzb2x2ZXIuY29tL2F1dGgvcmVhbG1zL3NvbHZlciIsImF1ZCI6WyJzb2x2ZXIiLCJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIzNzBmZWZlYy0xNDM2LTRlZWQtODMzZC1mNWQ4NmNmOWUxYjAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzb2x2ZXIiLCJzZXNzaW9uX3N0YXRlIjoiOGY2OTZiODctYTg2Yy00MWMwLThiYzYtMWQyODJiYjc0MjllIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJtYW5hZ2UtY2xpZW50cyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXSwibmFtZSI6IlRlc3QgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSJ9.DoPbX_cWEYHITrvYAf9NOrRG1K763PqCngR6EykLyEijyLZqpzk8cvVBV5uv3fPt7JH-BqvP-cnbDU9WocHKIX4ehuOX8UFApYFXJl6P_WqoP1LygJVncPRt4ysJ2ipQj6J1lhEO2y5XNIe0tBP-hzwHLAnMQ2p5t2x4ycnsrs4tfWBIttfvZrUHIkVls1Moncyv_806vjmA76ANGa6_82FaD_qDNQ61KoQEvFtP9BV4OmBwfJ1gJIlVZFaAKo4Iwe7da2MVuxze-iDyMrxYIQ2qX2TgROQcT_-JkhCh-2xc9xWBz1t7szloiaanJLZ0sTJ2xek2Hq11xwSvkaueJA"
}
```

#### User by token Request Example:
POST http://aisuite.example.com/api/auth/user-by-token
```json
{
    "username": "test",
    "password": "test123"
}
```

#### User by token Response Example:
```json
{
    "sub": "370fefec-1436-4eed-833d-f5d86cf9e1b0",
    "email_verified": true,
    "roles": [
        "offline_access",
        "uma_authorization"
    ],
    "preferred_username": "test",
    "name": "Test Test",
    "given_name": "Test",
    "family_name": "Test",
    "email": "test@example.com"
}
```
  
How to run:  
```shell
docker-compose up --build -d
```

Run tests:  
```shell
docker-compose exec solver-auth-develop pytest /tests/test.py
```
