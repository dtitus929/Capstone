from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_lists():
    list1 = List(name='inbox', type='inbox', user_id=1)
    list2 = List(name='trash', type='trash', user_id=1)
    list3 = List(name='home', type='standard',  user_id=1)
    list4 = List(name='work', type='standard',  user_id=1)
    list5 = List(name='inbox', type='inbox', user_id=2)
    list6 = List(name='trash', type='trash', user_id=2)
    list7 = List(name="Franks' Party", type='standard',  user_id=2)
    list8 = List(name='inbox', type='inbox', user_id=3)
    list9 = List(name='trash', type='trash', user_id=3)

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)
    db.session.add(list8)
    db.session.add(list9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
