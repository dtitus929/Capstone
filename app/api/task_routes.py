from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import db, Task, List

# from app.forms import TaskForm


task_routes = Blueprint('tasks', __name__)


@task_routes.route("/", methods=["GET"])
@login_required
def get_alltasks_by_listid():

    return "hi"


# @task_routes.route("/<list_id>", methods=["GET"])
# @login_required
# def get_alltasks_by_listid(list_id):

#     list = List.query.get(list_id)

#     if not list:
#         return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

#     if (list.user_id != current_user.id):
#         return {'message': 'Forbidden', "statusCode": 403}, 403

#     try:
#         tasks = db.session.query(Task).filter(Task.list_id == list_id).all()
#         task_data = {"Tasks": []}
#         for task in tasks:
#             task_data = task.to_dict()
#             task_data["Tasks"].append(task_data)
#         return task_data
#     except:
#         return {"message": "Failed to get tasks"}, 400
