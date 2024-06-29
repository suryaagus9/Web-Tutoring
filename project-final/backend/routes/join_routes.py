from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app, db
from models import Join, Class, Student, Tutor
import logging

@app.route('/tutor/joins', methods=['GET'])
@jwt_required()
def get_join_for_tutor():
    try:
        current_user_id = get_jwt_identity()
        logging.info(f"Fetching tutor for user_id: {current_user_id}")
        
        tutor = Tutor.query.filter_by(user_id=current_user_id).first()
        
        if not tutor:
            logging.warning(f"Tutor not found for user_id: {current_user_id}")
            return jsonify({'message': 'Tutor not found'}), 404

        logging.info(f"Tutor found: {tutor.serialize()}")

        classes = Class.query.filter_by(tutor_id=tutor.tutor_id).all()
        if not classes:
            logging.info(f"No Classes found for tutor_id: {tutor.tutor_id}")
            return jsonify([]), 200
        
        class_ids = [cls.class_id for cls in classes]
        logging.info(f"Class IDs for tutor: {class_ids}")

        joins = Join.query.filter(Join.class_id.in_(class_ids)).all()
        if not joins:
            logging.info(f"No joins found for classes: {class_ids}")
            return jsonify([]), 200
        
        result = [{
            'join_id': join.join_id,
            'class_id': join.class_id,
            'student_id': join.student_id,
            'joined_at': join.joined_at,
            'status': join.status,
            'class_title': join.Class.title,
            'student_name': join.student.user.full_name,
            'student_email': join.student.user.email,
        } for join in joins]

        logging.info(f"Joins fetched: {result}")

        return jsonify(result), 200
    
    except Exception as e:
        logging.error(f"Error fetching joins: {str(e)}", exc_info=True)
        return jsonify({'message': 'Internal Server Error'}), 500


@app.route('/joins', methods=['POST'])
@jwt_required()
def create_join():
    data = request.json
    cls = Class.query.get(data['class_id'])
    if not cls:
        return jsonify({'message': 'Class not found'}), 404

    student = Student.query.get(data['student_id'])
    if not student:
        return jsonify({'message': 'Student not found'}), 404

    new_join = Join(
        class_id=data['class_id'],
        student_id=data['student_id'],
        status=data.get('status', 'joined')
    )
    db.session.add(new_join)
    db.session.commit()
    return jsonify({'message': 'Join created successfully', 'join': new_join.serialize()}), 201


@app.route('/joins/student/<int:student_id>', methods=['GET'])
@jwt_required()
def get_joins_by_student(student_id):
    joins = Join.query.filter_by(student_id=student_id).all()
    result = [join.serialize() for join in joins]
    return jsonify(result), 200


@app.route('/joins', methods=['GET'])
@jwt_required()
def get_joins():
    student_id = request.args.get('student_id')
    if student_id:
        joins = Join.query.filter_by(student_id=student_id).all()
    else:
        joins = Join.query.all()
        
    result = [{
        'join_id': join.join_id,
        'class_id': join.class_id,
        'student_id': join.student_id,
        'status': join.status,
        'joined_at': join.joined_at.isoformat(),
        'class_title': join.Class.title, 
        'class_type': join.Class.class_type,
        'class_description': join.Class.description
    } for join in joins]
    return jsonify(result), 200


@app.route('/joins/<int:join_id>', methods=['GET'])
@jwt_required()
def get_join(join_id):
    join = Join.query.get_or_404(join_id)
    result = {
        'join_id': join.join_id,
        'class_id': join.class_id,
        'student_id': join.student_id,
        'status': join.status,
        'joined_at': join.joined_at.isoformat(),
        'class_title': join.Class.title, 
        'class_type': join.Class.class_type,
        'class_description': join.Class.description
    }
    return jsonify(result), 200

@app.route('/joins/<int:join_id>', methods=['PUT'])
@jwt_required()
def update_join(join_id):
    data = request.json
    join = Join.query.get_or_404(join_id)
    join.status = data.get('status', join.status)
    db.session.commit()
    return jsonify({'message': 'Join updated successfully', 'join': join.serialize()}), 200

@app.route('/joins/<int:join_id>', methods=['DELETE'])
@jwt_required()
def delete_join(join_id):
    join = Join.query.get_or_404(join_id)
    db.session.delete(join)
    db.session.commit()
    return jsonify({'message': 'Join deleted successfully'}), 200

