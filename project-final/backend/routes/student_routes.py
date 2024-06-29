from flask import request, jsonify
from app import app, db
from models import User, Student
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/students', methods=['POST'])
@jwt_required()
def create_student():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        if user.user_type != 'student':
            return jsonify({'message': 'User type is not student'}), 400

        new_student = Student(
            user=user,
            student_phone=data['student_phone'],
            age=data['age'],
            education=data['education']
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student created successfully', 'student': new_student.serialize()}), 201
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/students', methods=['GET'])
@jwt_required()
def get_all_students():
    students = Student.query.all()
    return jsonify([student.serialize() for student in students]), 200

@app.route('/student/profile', methods=['GET'])
@jwt_required()
def get_student_profile():
    current_user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=current_user_id).first()
    if student:
        return jsonify(student.serialize()),200
    else :
        return jsonify({'message' : 'Student tidak ditemukan'}), 404
    

@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get(student_id)
    if student:
        return jsonify(student.serialize()), 200
    else:
        return jsonify({'message': 'Student not found'}), 404


@app.route('/students/<int:student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
    current_user_id = get_jwt_identity()
    student = Student.query.filter_by(user_id=current_user_id).first()
    if student and student.student_id == student_id:
        data = request.get_json()
        student.student_phone = data.get('student_phone', student.student_phone)
        student.age = data.get('age', student.age)
        student.education = data.get('education', student.education)
        db.session.commit()
        return jsonify({'message': 'Student updated successfully'}), 200
    else:
        return jsonify({'message': 'Student not found'}), 404

@app.route('/students/<int:student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    student = Student.query.get(student_id)
    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully'}), 200
    else:
        return jsonify({'message': 'Student not found'}), 404