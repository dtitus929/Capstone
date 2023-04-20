from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import db, List, Task

from app.forms import ListForm, TaskForm


list_routes = Blueprint('lists', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@list_routes.route("/", methods=["GET"])
@login_required
def get_all_user_lists():
    """
    Gets all lists by user id
    """
    try:
        lists = List.query.filter(List.user_id == current_user.id).all()
        return {'lists': [list.to_dict() for list in lists]}
    except:
        return {"message": "Failed to get lists"}, 400


@list_routes.route('/', methods=['POST'])
@login_required
def post_new_list():
    """
    Creates a new list by user session
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list = List(
            name=form.data['name'],
            is_default=False,
            user_id=current_user.id
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def list_edit(id):
    """
    Query for a list by id, edit that list name, and return that list in a dictionary
    """
    list = List.query.get(id)

    if not list:
        return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != list.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list.name = form.data['name']
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def list_delete(id):
    """
    Query for a list by id, delete that list, and return success message
    """
    list = List.query.get(id)

    if not list:
        return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != list.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    db.session.delete(list)
    db.session.commit()
    return {"message": "List successfully deleted"}, 200


# ##########  Task Routes ##################


@list_routes.route('/<int:id>/tasks', methods=['GET'])
@login_required
def get_tasks_by_list_id(id):
    """
    Query for all tasks by list id and return that list in a dictionary
    """
    list = List.query.get(id)

    if not list:
        return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != list.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    try:
        tasks = Task.query.filter(Task.list_id == id).all()
        if not tasks:
            return {'message': 'No Tasks could be found', "statusCode": 404}, 404
        return {'tasks': [task.to_dict_task() for task in tasks]}
    except:
        return {"message": "Failed to get tasks"}, 400


@list_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def add_task_by_list_id(id):
    """
    Add a new task by list id
    """
    list = List.query.get(id)

    if not list:
        return {'message': 'List couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != list.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            name=form.data['name'],
            description=form.data['description'],
            due_date=form.data['due_date'],
            priority=form.data['priority'],
            completed=False,
            list_id=id,
            created_at=db.func.now(),
            updated_at=db.func.now()
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict_task()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
