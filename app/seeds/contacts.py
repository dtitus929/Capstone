from app.models import db, Contact, environment, SCHEMA
from sqlalchemy.sql import text


# Add favorite link seed data
def seed_contacts():

    contacts = [
        Contact(name='Magnolia Bakery', address='1240 Avenue of the Americas', city='New York',
                state='NY', zip='10020', phone='212-767-1123', url='https://www.magnoliabakery.com/', user_id=1),
        Contact(name='Domino Pizza', address='1235 Light St', city='Baltimore', state='MD',
                zip='21230', phone='410-752-3030', url='https://www.dominos.com/en/', user_id=1),
        Contact(name='Charlotte Primary Care', address='8332 Pineville Matthews Rd, Suite 205', city='Charlotte', state='NC',
                zip='28226', phone='704-398-3952', url='https://www.onemedical.com/locations/cha/pineville/', user_id=1)
    ]

    for i in contacts:
        db.session.add(i)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_contacts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.contacts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM contacts"))

    db.session.commit()
