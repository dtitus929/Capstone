from app.models import db, Contact, environment, SCHEMA
from sqlalchemy.sql import text


# Add favorite link seed data
def seed_contacts():

    contacts = [
        Contact(name='Medstar Health', address='3245 West Patrick St., Suite 301', city='Baltimore',
                state='MD', zip='21201', phone='555-123-1234', url='https://www.medstarhealth.org/', user_id=1),
        Contact(name='Domino Pizza', address='1235 Light St', city='Baltimore', state='MD',
                zip='21230', phone='410-752-3030', url='https://www.dominos.com/en/', user_id=1),
        Contact(name='Cab Service', address='2100 Huntingdon Ave', city='Baltimore', state='MD',
                zip='21221', phone='410-685-1212', url='https://koachapp.com/', user_id=1)
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
