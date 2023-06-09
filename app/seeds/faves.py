from app.models import db, Fave, environment, SCHEMA
from sqlalchemy.sql import text


# Add favorite link seed data
def seed_faves():

    faves = [
        Fave(name='Art', url='https://www.art.com/', user_id=1),
        Fave(name='Google', url='https://www.google.com/', user_id=1),
        Fave(name='DB Schema', url='https://dbdiagram.io/d/643dba9f6b31947051bfe073',  user_id=1),
        Fave(name='Art u2', url='https://www.art.com/', user_id=2),
        Fave(name='Google u2', url='https://www.google.com/', user_id=2),
        Fave(name='DB Schema u2', url='https://dbdiagram.io/d/643dba9f6b31947051bfe073',  user_id=2),
        Fave(name='Art u3', url='https://www.art.com/', user_id=3),
        Fave(name='Google u3', url='https://www.google.com/', user_id=3),
        Fave(name='DB Schema u3', url='https://dbdiagram.io/d/643dba9f6b31947051bfe073',  user_id=3),
    ]

    for i in faves:
        db.session.add(i)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_faves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.faves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM faves"))

    db.session.commit()
