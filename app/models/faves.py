from .db import db, environment, SCHEMA, add_prefix_for_prod


class Fave(db.Model):
    __tablename__ = 'faves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Relationships
    user = db.relationship("User", back_populates="faves")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url,
            'user_id': self.user_id
        }
