from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app, db
from models import User, Student, Tutor, Class, Join
from werkzeug.security import generate_password_hash

@app.route('/home', methods=['GET'])
@jwt_required()
def home():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.user_type != 'student':
        return jsonify({"msg": "Unauthorized"}), 403
    return jsonify({"msg": "Welcome to the home page for students"}), 200

@app.route('/tutorhome', methods=['GET'])
@jwt_required()
def tutor_home():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.user_type != 'tutor':
        return jsonify({"msg": "Unauthorized"}), 403
    return jsonify({"msg": "Welcome to the home page for tutors"}), 200

@app.route('/adminhome', methods=['GET'])
@jwt_required()
def admin_home():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.user_type != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403
    return jsonify({"msg": "Welcome to the admin dashboard"}), 200


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    password_hash = generate_password_hash(data['password'])
    new_user = User(
        username=data['username'],
        password_hash=password_hash,
        email=data['email'],
        full_name=data['full_name'],
        user_type=data['user_type']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([{
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name,
        'user_type': user.user_type
    } for user in users]), 200

@app.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'full_name': user.full_name,
        'user_type': user.user_type
    }), 200


@app.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if 'password' in data:
        user.password_hash = generate_password_hash(data['password'])

    user.username = data['username']
    user.email = data['email']
    user.full_name = data['full_name']
    user.user_type = data['user_type']

    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        student = Student.query.filter_by(user_id=user_id).first()
        if student:
            joins = Join.query.filter_by(student_id=student.student_id).all()
            for app in joins:
                db.session.delete(app)
        
        if student:
            db.session.delete(student)

        tutor = Tutor.query.filter_by(user_id = user_id).first()
        if tutor:
            cls = Class.query.filter_by(tutor_id=tutor.tutor_id).all()
            for app in cls:
                db.session.delete(app)

        if tutor:
            db.session.delete(tutor)
        
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message' : 'User Not Found'}), 404

