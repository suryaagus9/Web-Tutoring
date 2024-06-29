from flask import Blueprint

user_bp = Blueprint('user', __name__)
student_bp = Blueprint('student', __name__)
tutor_bp = Blueprint('tutor', __name__)
class_bp = Blueprint('class', __name__)
join_bp = Blueprint('join', __name__)

from . import join_routes, user_routes, tutor_routes, student_routes, class_routes
