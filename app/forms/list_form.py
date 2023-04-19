from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length


class ListForm(FlaskForm):

    name = StringField('List Name', validators=[DataRequired(), Length(
        max=20, message="Must be between 1 to 20 characters.")])
