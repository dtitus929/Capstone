from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import db, Task, List

from app.forms import TaskForm


task_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@task_routes.route("/", methods=["GET"])
@login_required
def get_all_task_for_user():
    """
    Query for all tasks by user ID, return tasks in a dictionary
    """
    try:
        tasks = Task.query.filter(Task.user_id == current_user.id).all()
        return {'alltasks': [task.to_dict_task() for task in tasks]}
    except:
        return {"message": "Failed to get lists"}, 400


@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def task_edit(id):
    """
    Query for a task by id, edit that task, and return that task in a dictionary
    """
    task = Task.query.get(id)

    if not task:
        return {'message': 'Task couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != task.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task.name = form.data['name']
        task.description = form.data['description']
        task.due_date = form.data['due_date']
        task.priority = form.data['priority']
        task.list_id = form.data['list_id']
        task.completed = form.data['completed']
        db.session.add(task)
        db.session.commit()
        return task.to_dict_task()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def task_delete(id):
    """
    Query for a task by id, delete that list, and return success message
    """
    task = Task.query.get(id)

    if not task:
        return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != task.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    db.session.delete(task)
    db.session.commit()
    return {"message": "Task successfully deleted"}, 200
