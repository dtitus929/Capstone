from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, URL, Regexp


class ContactForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(
        max=50, message="Name must be 1 to 50 characters.")])

    phone = StringField('Name', validators=[Regexp(
        regex='^(1-)?\d{3}-\d{3}-\d{4}$', message="Phone format not valid.")])

    url = URLField('URL', validators=[URL(
        message="URL format not valid.")])
