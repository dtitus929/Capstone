from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, URL, Regexp, Optional


class ContactForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(
        max=50, message="Name must be 1 to 50 characters.")])

    address = StringField('Name', validators=[Optional()])

    city = StringField('Name', validators=[Optional()])

    state = StringField('Name', validators=[Optional()])

    zip = StringField('Name', validators=[Optional()])

    phone = StringField('Name', validators=[Optional(), Regexp(
        regex='^(1-)?\d{3}-\d{3}-\d{4}$', message="Phone format not valid.")])

    url = URLField('URL', validators=[Optional(), URL(
        message="URL format not valid.")])
