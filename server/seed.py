#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, db
from config import bcrypt


fake = Faker()


def create_random_user():
    """Generate a random user using Faker."""
    u = User()
    u.first_name = fake.first_name()
    u.last_name = fake.last_name()
    u.email = fake.email()
    u.address = fake.address()
    u.biography = fake.text(max_nb_chars=512)
    u.hobbies = rc(
        [
            "Reading",
            "Gardening",
            "Painting or Drawing",
            "Hiking",
            "Cooking or Baking",
            "Playing a Musical Instrument",
            "Photography",
            "Knitting or Crocheting",
            "Dancing",
            "Bird Watching",
        ]
    )
    plain_password = fake.password()  # Generate a random password
    u._password_hash = bcrypt.generate_password_hash(plain_password).decode("utf-8")

    # Print out the email and plain password for testing
    print(f"Email: {u.email}, Password: {plain_password}")

    u.photo_url = rc(
        [
            "https://cdn1.iconfinder.com/data/icons/business-character-1/128/8-512.png",
            "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Salesman_1-512.png",
            "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Teacher-512.png",
            "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Golf_Atlet-512.png",
            "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Musician_2-512.png",
            "https://cdn0.iconfinder.com/data/icons/music-flat-1/512/hippie-512.png",
            "https://cdn0.iconfinder.com/data/icons/music-flat-1/512/music_lover-512.png",
        ]
    )
    u.birth_date = fake.date_of_birth(minimum_age=8, maximum_age=80)
    u.join_date = fake.date_this_decade()
    u.last_login = fake.date_this_month()
    u.privacy_settings = rc(["public", "private"])

    return u


if __name__ == "__main__":
    with app.app_context():
        print("Deleting all records...")

        User.query.delete()

        print("Starting seed...")

        # Create 100 random users
        for _ in range(10):
            user = create_random_user()
            db.session.add(user)

        # Commit the changes to the database
        db.session.commit()

        print("Seeding completed!")

