#!/usr/bin/env python3
from flask import request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv
from datetime import timedelta
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='[%(asctime)s] %(levelname)s in %(module)s: %(message)s')

load_dotenv()


app.secret_key = os.getenv("SECRET_KEY")
print(app.secret_key)





class Home(Resource):
    def get(self):
        return {"message": "Welcome to the server home page!"}





class Signup(Resource):
    def post(self):
        """
        Endpoint to register a new user
        """
        logging.debug(f"Current session state before signup: {session}")
        
        # Get the JSON payload from the request
        json = request.get_json()

        # Check if all necessary fields are provided in the JSON payload
        required_fields = ["first_name", "last_name", "email", "password"]
        missing_fields = [field for field in required_fields if field not in json]
        if missing_fields:
            return {"Message": f"Missing fields: {', '.join(missing_fields)}"}, 422

        # Convert birth_date from string to datetime object if provided
        birth_date_str = json.get("birth_date")
        birth_date = (
            datetime.strptime(birth_date_str, "%Y-%m-%d").date()
            if birth_date_str
            else None
        )

        # Check if user with the provided email already exists
        existing_user = User.query.filter_by(email=json["email"]).first()
        if existing_user:
            return {"Message": "Email already registered"}, 400

        # Create a new user with the provided details
        user = User(
            first_name=json["first_name"],
            last_name=json["last_name"],
            email=json["email"],
            address=json["address"],
            biography=json["biography"],
            hobbies=json["hobbies"],
            photo_url=json.get("photo_url", None),
            birth_date=birth_date,
            privacy_settings=json.get("privacy_settings", None),
        )
        user.password = json["password"]

        # Try saving the new user in the database
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {"Message": "Email already registered"}, 400

        # Set the user ID in the session to indicate the user is logged in
        session["user_id"] = user.id

        # Return the newly created user's details with a 201 Created status
        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "address": user.address,
            "biography": user.biography,
            "hobbies": user.hobbies,
            "photo_url": user.photo_url,
            "birth_date": str(user.birth_date) if user.birth_date else None,
            "privacy_settings": user.privacy_settings,
        }, 201


class SignIn(Resource):
    def post(self):
        """
        Endpoint to sign in a user
        """

        json = request.get_json()

        # Check if email and password are provided
        if not json.get("email") or not json.get("password"):
            return {"Message": "Email and password are required."}, 400

        # Fetch the user from the database by email
        user = User.query.filter_by(email=json["email"]).first()

        # If user doesn't exist or password is wrong
        if not user or not user.verify_password(json["password"]):
            return {"Message": "Invalid email or password."}, 401

        # If user exists and password is correct, set session and return user details
        session["user_id"] = user.id
        session.permanent = True  # Move this line outside of the if block

        return {
            "Message": "Logged in successfully.",
            "id": user.id,
            "email": user.email,
        }, 200



# Define a resource to check the session for the logged-in user's details
class CheckSession(Resource):
    def get(self):
        """
        Endpoint to check if the user is currently logged in
        """

        # Log the session data
        logging.debug(f"Session data: {session}")

        # Get the user from the database using the user ID in the session
        user = User.query.filter(User.id == session.get("user_id")).first()

        if user:
            # If user is found, return the user's details with a 200 OK status
            return {
                "id": user.id,
                "first_name": user.first_name,
                "photo_url": user.photo_url,
                "privacy_settings": user.privacy_settings,
            }, 200
        else:
            # If no user is found, return an unauthorized message with a 401 status
            logging.warning("Unauthorized access attempt detected.")
            return {"Message": "Unauthorized"}, 401



class SignOut(Resource):
    def delete(self):
        """
        Endpoint to sign out a user
        """

        # Check if a user is logged in and then log them out
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204

        # If no user is logged in, return an unauthorized message with a 401 status
        return {"message": "unauthorized"}, 401


class UserList(Resource):
    def get(self):
        """
        Endpoint to get all users
        """

        # Get all users from the database
        users = User.query.all()

        # Return the users as a list of dictionaries
        return [
            {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "address": user.address,
                "biography": user.biography,
                "hobbies": user.hobbies,
                "photo_url": user.photo_url,
                "birth_date": str(user.birth_date) if user.birth_date else None,
                "privacy_settings": user.privacy_settings,
            }
            for user in users
        ], 200


class UserDetail(Resource):
    def get(self, user_id):
        """
        Endpoint to get a user by ID
        """

        # Get the user from the database by ID
        user = User.query.filter(User.id == user_id).first()

        # If user is found, return the user's details with a 200 OK status
        if user:
            return {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "address": user.address,
                "biography": user.biography,
                "hobbies": user.hobbies,
                "photo_url": user.photo_url,
                "birth_date": str(user.birth_date) if user.birth_date else None,
                "privacy_settings": user.privacy_settings,
            }, 200

        # If no user is found, return a message with a 404 status
        return {"Message": "User not found"}, 404

    def patch(self, user_id):
        """
        Endpoint to partially edit a user by ID using PATCH
        """
        user = User.query.filter(User.id == user_id).first()
        if not user:
            return {"Message": "User not found"}, 404

        data = request.json

        # Loop through provided data and update the corresponding attributes of the user
        for attr, value in data.items():
            setattr(user, attr, value)

        # Commit the changes to the database
        db.session.commit()

        return {"Message": "User updated successfully"}, 200

    def delete(self, user_id):
        """
        Endpoint to delete a user by ID
        """

        # Check if a user is logged in
        logged_in_user_id = session.get("user_id")
        if not logged_in_user_id:
            return {"Message": "You must be logged in to delete a profile."}, 401

        # Ensure the logged-in user is trying to delete their own profile
        if logged_in_user_id != user_id:
            return {"Message": "You can only delete your profile!"}, 403

        user = User.query.filter(User.id == user_id).first()
        if not user:
            return {"Message": "User not found"}, 404

        # Delete the user from the database
        db.session.delete(user)
        db.session.commit()
        return {"Message": "User deleted successfully"}, 200


# Adding the resources to the API
api.add_resource(Home, "/")
api.add_resource(UserDetail, "/users/<int:user_id>")
api.add_resource(UserList, "/users")
api.add_resource(CheckSession, "/check_session")
api.add_resource(SignOut, "/sign_out")
api.add_resource(SignIn, "/signin", endpoint="signin")
api.add_resource(Signup, "/signup", endpoint="signup")


# Start the Flask application
if __name__ == "__main__":
    app.run(port=5555, debug=True)


