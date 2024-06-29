from flask import request, jsonify
from app import app, db
from models import User, Tutor
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/tutors', methods=['POST'])
@jwt_required()
def create_tutor():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        if user.user_type != 'tutor':
            return jsonify({'message': 'User type is not tutor'}), 400

        new_tutor = Tutor(
            user=user,
            tutor_phone=data['tutor_phone'],
            tutor_description=data['tutor_description'],
            experience=data['experience']
        )
        db.session.add(new_tutor)
        db.session.commit()
        return jsonify({'message': 'Tutor created successfully'}), 201
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/tutors', methods=['GET'])
def get_all_tutors():
    tutors = Tutor.query.all()
    return jsonify([tutor.serialize() for tutor in tutors]), 200

@app.route('/tutors/<int:tutor_id>', methods=['GET'])
def get_tutor(tutor_id):
    tutor = Tutor.query.get_or_404(tutor_id)
    if tutor:
        return jsonify(tutor.serialize()), 200
    else:
        return jsonify({'message': 'Tutor not found'}), 404

@app.route('/tutor/profile', methods=['GET'])
@jwt_required()
def get_tutor_profile():
    current_user_id = get_jwt_identity()
    tutor = Tutor.query.filter_by(user_id=current_user_id).first()
    if tutor:
        return jsonify(tutor.serialize()), 200
    else:
        return jsonify({'message': 'Tutor tidak ditemukan'}), 404


@app.route('/tutors/<int:tutor_id>', methods=['PUT'])
@jwt_required()
def update_tutor(tutor_id):
    current_user_id = get_jwt_identity()
    tutor = Tutor.query.filter_by(user_id=current_user_id).first()
    if tutor and tutor.tutor_id == tutor_id:
        data = request.get_json()
        tutor.tutor_phone = data.get('tutor_phone', tutor.tutor_phone)
        tutor.tutor_description = data.get('tutor_description', tutor.tutor_description)
        tutor.experience = data.get('experience', tutor.experience)
        db.session.commit()
        return jsonify({'message': 'Tutor updated successfully'}), 200
    else:
        return jsonify({'message': 'Tutor not found'}), 404
    
@app.route('/tutors/<int:tutor_id>', methods=['DELETE'])
@jwt_required()
def delete_tutor(tutor_id):
    tutor = Tutor.query.get(tutor_id)
    if tutor:
        db.session.delete(tutor)
        db.session.commit()
        return jsonify({'message': 'Tutor deleted successfully'}), 200
    else:
        return jsonify({'message': 'Tutor not found'}), 404
