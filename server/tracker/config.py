import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # ...
    DATABASE_URL="mysql+pymysql://tracker:tracker@0.0.0.0:3306/tracker?charset=utf8mb4"
    SQLALCHEMY_DATABASE_URI = DATABASE_URL or os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
