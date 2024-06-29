from flask import request, jsonify
from app import app, db
from models import Class, Tutor
from flask_jwt_extended import jwt_required

@app.route('/classes', methods=['POST'])
@jwt_required()
def create_class():
    data = request.get_json()
    tutor_id = data.get('tutor_id')
    tutor = Tutor.query.get(tutor_id)
    
    if tutor:
        new_class = Class(
            tutor_id=tutor_id,
            title=data['title'],
            class_type=data['class_type'],
            description=data['description'],
            lesson=data['lesson'],
            price=data['price']
        )
        db.session.add(new_class)
        db.session.commit()
        return jsonify({'message': 'Class has been successfully created.'}), 201
    else:
        return jsonify({'message': 'Tutor not found'}), 404


@app.route('/classes', methods=['GET'])
@jwt_required()
def get_all_classes():
    classes = Class.query.all()
    return jsonify([cls.serialize() for cls in classes]), 200


@app.route('/classes/<int:class_id>', methods=['GET'])
@jwt_required()
def get_class(class_id):
    cls = Class.query.get(class_id)
    if cls:
        return jsonify(cls.serialize()), 200
    else:
        return jsonify({'message': 'Class not found'}), 404

        
@app.route('/classes/<int:class_id>', methods=['PUT'])
@jwt_required()
def update_class(class_id):
    data = request.get_json()
    cls = Class.query.get(class_id)
    if cls:
        data = request.json

        cls.title = data.get('title', cls.title)
        cls.class_type = data.get('class_type', cls.class_type)
        cls.description = data.get('description', cls.description)
        cls.lesson = data.get('lesson', cls.lesson)
        cls.price = data.get('price', cls.price)
        # cls.tutor_id = data.get('tutor_id', cls.tutor_id)

        db.session.commit()
        return jsonify({'message': 'Class has been successfully updated.'}), 200
    else:
        return jsonify({'message': 'Class not found'}), 404



@app.route('/classes/<int:class_id>', methods=['DELETE'])
@jwt_required()
def delete_class(class_id):
    cls = Class.query.get(class_id)
    if cls:
        db.session.delete(cls)
        db.session.commit()
        return jsonify({'message': 'Class has been successfully deleted.'}), 200
    else:
        return jsonify({'message': 'Class not found'}), 404