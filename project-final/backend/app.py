from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})

from routes import user_routes, tutor_routes, student_routes

from models import User, Student, Tutor


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.user_id)
        user_data = {
            'access_token': access_token,
            'user_type': user.user_type
        }
        
        if user.user_type == 'tutor':
            tutor = Tutor.query.filter_by(user_id=user.user_id).first()
            if tutor:
                user_data['tutor_id'] = tutor.tutor_id

        if user.user_type == 'student':
            student = Student.query.filter_by(user_id=user.user_id).first()
            if student:
                user_data['student_id'] = student.student_id

        return jsonify(user_data), 200
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({
            'username': user.username,
            'full_name': user.full_name,
            'email': user.email,
            'user_type': user.user_type
        }), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200

if __name__ == '__main__':
    app.run(debug=True)

