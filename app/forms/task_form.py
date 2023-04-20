from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):

    name = StringField('Task Name', validators=[DataRequired(), Length(
        max=250, message="Must be between 1 to 250 characters.")])
    description = StringField('Description')
    due_date = StringField('Description')
    priority = IntegerField('Priority')
    list_id = IntegerField('List')
    completed = BooleanField('Completed')
