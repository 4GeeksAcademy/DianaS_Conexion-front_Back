from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if email == "" or password == "":
        return jsonify({"msg": "El email y password son obligatorios"}), 400
    if user_exist is None:
        new_user = User(
            email=email,
            password=password,
        )
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 201
    else:
        return jsonify({"msg": "El usuario ya existe"}), 409
    

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if email == "" or password == "":
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400
    if email != user_exist.email or password != user_exist.password:
        return jsonify({"msg": "El email o password no son correctos"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token),200
