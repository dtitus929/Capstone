from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.String(50))
    priority = db.Column(db.Integer, default=3)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    # Relationships
    list = db.relationship("List", back_populates="tasks")


def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "due_date": self.due_date,
        "priority": self.priority,
        "completed": self.completed,
        "list_id": self.channel_id,
        "completed": self.completed,
        "created_at": self.created_at,
        "updated_at": self.updated_at
    }
