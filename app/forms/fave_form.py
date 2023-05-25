from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, URL


class FaveForm(FlaskForm):

    name = StringField('List Name', validators=[DataRequired(), Length(
        max=30, message="Must be between 1 to 30 characters.")])

    url = URLField('Type', validators=[DataRequired(), URL(
        message="Must be a valid URL")])
