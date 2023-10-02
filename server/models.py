from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(512))
    biography = db.Column(db.String(512))
    hobbies = db.Column(db.String(512))
    _password_hash = db.Column("password_hash", db.String(200), nullable=False)
    photo_url = db.Column(db.String(512))
    birth_date = db.Column(db.Date)
    join_date = db.Column(db.Date, default=datetime.utcnow)
    last_login = db.Column(db.Date)
    privacy_settings = db.Column(db.String(100))
    
    def __repr__(self):
        return f'User {self.email}, ID {self.id}'