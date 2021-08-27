#!/usr/bin/env bash

echo Starting Gunicorn.

pip install -r requirements.txt
exec uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 1
