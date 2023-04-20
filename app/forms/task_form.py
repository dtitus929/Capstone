from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):

    name = StringField('List Name', validators=[DataRequired(), Length(
        max=20, message="Must be between 1 to 250 characters.")])
    description = StringField('Description')
    due_date = StringField('Description')
    priority = IntegerField('Priority')
