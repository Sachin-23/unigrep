#!/bin/sh

# Backend
python3 backend/manage.py runserver &

# Frontend
cd frontend/unigrep/
npm start
