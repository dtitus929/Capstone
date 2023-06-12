from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Contact
from app.forms import ContactForm


contact_routes = Blueprint('contacts', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@contact_routes.route("/", methods=["GET"])
@login_required
def get_all_user_contacts():
    """
    Gets all contacts by user id
    """
    try:
        contacts = Contact.query.filter(Contact.user_id == current_user.id).all()
        return {'contacts': [contact.to_dict() for contact in contacts]}
    except:
        return {"message": "Failed to get contacts"}, 400


@contact_routes.route('/', methods=['POST'])
@login_required
def post_new_contact():
    """
    Creates a new contact by user session
    """
    form = ContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        contact = Contact(
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            phone=form.data['phone'],
            url=form.data['url'],
            user_id=current_user.id
        )
        db.session.add(contact)
        db.session.commit()
        return contact.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@contact_routes.route('/<int:id>', methods=['PUT'])
@login_required
def contact_edit(id):
    """
    Query for a contact by id, edit that contact, and return that contact in a dictionary
    """
    contact = Contact.query.get(id)

    if not contact:
        return {'message': 'Contact couldn\'t be found', "statusCode": 404}, 404

    if current_user.id != contact.user_id:
        return {'message': 'Forbidden', "statusCode": 403}, 403

    form = ContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        contact.name = form.data['name']
        contact.address = form.data['address']
        contact.city = form.data['city']
        contact.state = form.data['state']
        contact.zip = form.data['zip']
        contact.phone = form.data['phone']
        contact.url = form.data['url']
        db.session.add(contact)
        db.session.commit()
        return contact.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@contact_routes.route('/<int:id>', methods=['DELETE'])
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
