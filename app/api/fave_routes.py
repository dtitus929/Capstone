from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Fave
from app.forms import FaveForm


fave_routes = Blueprint('faves', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple fave
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@fave_routes.route("/", methods=["GET"])
@login_required
def get_all_user_faves():
    """
    Gets all faves by user id
    """
    try:
        faves = Fave.query.filter(Fave.user_id == current_user.id).all()
        return {'faves': [fave.to_dict() for fave in faves]}
    except:
        return {"message": "Failed to get faves"}, 400


@fave_routes.route('/', methods=['POST'])
@login_required
def post_new_fave():
    """
    Creates a new fave by user session
    """
    form = FaveForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fave = Fave(
            name=form.data['name'],
            url=form.data['url'],
            user_id=current_user.id
        )
        db.session.add(fave)
        db.session.commit()
        return fave.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@fave_routes.route('/<int:id>', methods=['PUT'])
@login_required
def fave_edit(id):
    """
    Query for a fave by id, edit that fave name, and return that fave in a dictionary
    """
    fave = Fave.query.get(id)

    if not fave:
        return {'message': 'Fave couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != fave.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    form = FaveForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fave.name = form.data['name']
        fave.url = form.data['url']
        db.session.add(fave)
        db.session.commit()
        return fave.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@fave_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def fave_delete(id):
    """
    Query for a fave by id, delete that fave, and return success message
    """
    fave = Fave.query.get(id)

    if not fave:
        return {'message': 'Fave couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != fave.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    db.session.delete(fave)
    db.session.commit()
    return {"message": "Fave successfully deleted"}, 200
