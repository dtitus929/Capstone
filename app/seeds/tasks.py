from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    u1l1t1 = Task(
        name='Take Fluffy to the dog groomer',
        description="Remind groomer that Fluffy does NOT like the hair dryer and might bite!",
        due_date='2023-08-20',
        priority=1,
        completed=False,
        list_id=1,
        user_id=1
    )
    u1l1t2 = Task(
        name="Order the cake for Frank's birthday party",
        description="Frank is alergic to strawberries.  Magnolia Bakery phone number is in contacts.",
        due_date='2023-09-04',
        priority=2,
        completed=False,
        list_id=1,
        user_id=1
    )
    u1l1t3 = Task(
        name='Sign the tax returns and send in to US Treasury',
        description="Getting back $300 from federal and $425 from state",
        due_date='',
        priority=3,
        completed=True,
        list_id=1,
        user_id=1
    )
    u1l2t1 = Task(
        name='Find last years tax returns in the basement',
        description="Look in cabinet under the stairs.",
        due_date='2023-04-22',
        priority=1,
        completed=True,
        list_id=2,
        user_id=1
    )
    u1l2t2 = Task(
        name='Buy laundry detergent',
        description="Tide is on sale!",
        due_date='2023-04-23',
        priority=3,
        completed=False,
        list_id=2,
        user_id=1
    )
    u1l3t1 = Task(
        name='Make sure Suzzie takes in the permission slip for her field trip',
        description="Cost is $12.50.  Don't forget to pack a sack lunch.",
        due_date='2023-06-27',
        priority=2,
        completed=False,
        list_id=3,
        user_id=1
    )

    u1l3t11 = Task(
        name='Buy needed supplies for the neigborhood block party',
        description="We're responsible for sodas and chips.",
        due_date='2023-07-03',
        priority=1,
        completed=True,
        list_id=3,
        user_id=1
    )

    u1l4t1 = Task(
        name='Contact HR about the new PTO policies',
        description="There have been changes to both vacation and sick leave.",
        due_date='2023-07-17',
        priority=2,
        completed=False,
        list_id=4,
        user_id=1
    )

    u1l4t11 = Task(
        name='Send travel reciepts to accounting',
        description="Terry went over allowed costs for hotel.  Note this on reciepts.",
        due_date='2023-08-12',
        priority=1,
        completed=False,
        list_id=4,
        user_id=1
    )

    u2l1t1 = Task(
        name='This is task 1 in list 1 for user 2',
        description="Description for task 1, list 1, user 2",
        due_date='',
        priority=3,
        completed=False,
        list_id=5,
        user_id=2
    )

    u2l2t1 = Task(
        name='This is task 1 in list 2 for user 2',
        description="Description for task 1, list 2, user 2",
        due_date='2023-04-27',
        priority=1,
        completed=False,
        list_id=6,
        user_id=2
    )

    u2l3t1 = Task(
        name='This is task 1 in list 3 for user 2',
        description="Description for task 1, list 3, user 2",
        due_date='2023-04-27',
        priority=1,
        completed=True,
        list_id=7,
        user_id=2
    )

    u3l1t1 = Task(
        name='This is task 1 in list 1 for user 3',
        description="Description for task 1, list 1, user 3",
        due_date='2023-05-01',
        priority=1,
        completed=False,
        list_id=8,
        user_id=3
    )

    u3l2t1 = Task(
        name='This is task 1 in list 2 for user 3',
        description="Description for task 1, list 2, user 3",
        due_date='2023-05-01',
        priority=2,
        completed=False,
        list_id=9,
        user_id=3
    )

    db.session.add(u1l1t1)
    db.session.add(u1l1t2)
    db.session.add(u1l1t3)
    db.session.add(u1l2t1)
    db.session.add(u1l2t2)
    db.session.add(u1l4t1)
    db.session.add(u1l3t1)
    db.session.add(u1l3t11)
    db.session.add(u1l4t11)
    db.session.add(u2l1t1)
    db.session.add(u2l2t1)
    db.session.add(u2l3t1)
    db.session.add(u3l1t1)
    db.session.add(u3l2t1)

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
