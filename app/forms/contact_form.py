from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, URL


class ContactForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(
        max=50, message="Name must be 1 to 50 characters.")])

    url = URLField('URL', validators=[DataRequired(), URL(
        message="Must be a valid URL")])
