from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    u1l1t1 = Task(
        name='This is task 1 in list 1 for user 1',
        description="Description for task 1, list 1, user 1",
        due_date='2023-04-20',
        priority=1,
        completed=False,
        list_id=1
    )
    u1l1t2 = Task(
        name='This is task 2 in list 1 for user 1',
        description="Description for task 2, list 1, user 1",
        due_date='2023-05-20',
        priority=2,
        completed=False,
        list_id=1
    )
    u1l1t3 = Task(
        name='This is task 3 in list 1 for user 1',
        description="Description for task 3, list 1, user 1",
        due_date='',
        priority=3,
        completed=True,
        list_id=1
    )
    u1l2t1 = Task(
        name='This is task 1 in list 2 for user 1',
        description="Description for task 1, list 2, user 1",
        due_date='2023-04-22',
        priority=3,
        completed=False,
        list_id=2
    )
    u1l2t2 = Task(
        name='This is task 2 in list 2 for user 1',
        description="Description for task 2, list 2, user 1",
        due_date='2023-04-23',
        priority=3,
        completed=True,
        list_id=2
    )
    u1l3t1 = Task(
        name='This is task 1 in list 3 for user 1',
        description="Description for task 1, list 3, user 1",
        due_date='2023-04-27',
        priority=3,
        completed=False,
        list_id=3
    )
    u2l1t1 = Task(
        name='This is task 1 in list 1 for user 2',
        description="Description for task 1, list 1, user 2",
        due_date='',
        priority=3,
        completed=False,
        list_id=4
    )

    u2l2t1 = Task(
        name='This is task 1 in list 2 for user 2',
        description="Description for task 1, list 2, user 2",
        due_date='2023-04-27',
        priority=3,
        completed=False,
        list_id=5
    )

    u3l1t1 = Task(
        name='This is task 1 in list 1 for user 3',
        description="Description for task 1, list 2, user 2",
        due_date='2023-05-01',
        priority=2,
        completed=False,
        list_id=6
    )

    db.session.add(u1l1t1)
    db.session.add(u1l1t2)
    db.session.add(u1l1t3)
    db.session.add(u1l2t1)
    db.session.add(u1l2t2)
    db.session.add(u1l3t1)
    db.session.add(u2l1t1)
    db.session.add(u2l2t1)
    db.session.add(u3l1t1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
