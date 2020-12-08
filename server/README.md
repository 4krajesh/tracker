Setup a virtualenv

Install: ~/server# pip install -e .

Run: ~/server/tracker# FLASK_ENV=development FLASK_APP=app/__init__.py flask run --host 0.0.0.0 --port 3001
