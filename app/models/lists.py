from .db import db, environment, SCHEMA, add_prefix_for_prod


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    is_default = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Relationships
    user = db.relationship("User", back_populates="lists")
    tasks = db.relationship("Task", back_populates="list")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'is_default': self.is_default,
            'user_id': self.user_id
        }
