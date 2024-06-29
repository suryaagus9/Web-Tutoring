
from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    full_name = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.Enum('student', 'tutor', 'admin', name='user_types'), nullable=False)


class Student(db.Model):
    __tablename__ = 'student'
    student_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    student_phone = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(15), nullable=False)
    education = db.Column(db.Text)
    user = db.relationship('User', backref=db.backref('student', uselist=False))

    def serialize(self):
        return {
            'student_id': self.student_id,
            'user_id': self.user_id,
            'student_phone': self.student_phone,
            'age': self.age,
            'education': self.education,
            'user': {
                'user_id': self.user.user_id,
                'username': self.user.username,
                'email': self.user.email,
                'full_name': self.user.full_name
            }
        }

class Tutor(db.Model):
    __tablename__ = 'tutor'
    tutor_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    tutor_phone = db.Column(db.String(50), nullable=False)
    tutor_description = db.Column(db.Text)
    experience = db.Column(db.Text)
    user = db.relationship('User', backref=db.backref('tutor', uselist=False))

    def serialize(self):
        return {
            'tutor_id': self.tutor_id,
            'user_id': self.user_id,
            'tutor_phone': self.tutor_phone,
            'tutor_description': self.tutor_description,
            'experience': self.experience,
            'user': {
                'user_id': self.user.user_id,
                'username': self.user.username,
                'email': self.user.email,
                'full_name': self.user.full_name
            }
        }

class Class(db.Model):
    __tablename__ = 'class'
    class_id = db.Column(db.Integer, primary_key=True)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.tutor_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    class_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    lesson = db.Column(db.Text, nullable=False)
    price = db.Column(db.String(50), nullable=False)
    tutor = db.relationship('Tutor', backref=db.backref('classes', lazy=True))

    def serialize(self):
        return {
            'class_id': self.class_id,
            'tutor_id': self.tutor_id,
            'title': self.title,
            'class_type': self.class_type,
            'description': self.description,
            'lesson': self.lesson,
            'price': self.price,
            'tutor': self.tutor.serialize()
        }

class Join(db.Model):
    __tablename__ = 'join'
    join_id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('class.class_id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('student.student_id'), nullable=False)
    status = db.Column(db.String(50), default='pending')
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    Class = db.relationship('Class', backref=db.backref('joins', lazy=True))
    student = db.relationship('Student', backref=db.backref('joins', lazy=True))

    def serialize(self):
        return {
            'join_id': self.join_id,
            'class': self.Class.serialize() if self.Class else None,
            'student_id': self.student_id,
            'status': self.status,
            'joined_at': self.joined_at,
        }


