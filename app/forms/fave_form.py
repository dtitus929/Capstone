from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, URL


class FaveForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(
        max=30, message="Name must be 1 to 30 characters.")])

    url = URLField('URL', validators=[DataRequired(), URL(
        message="Must be a valid URL")])
