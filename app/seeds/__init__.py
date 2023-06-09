from flask.cli import AppGroup
from .users import seed_users, undo_users
from .lists import seed_lists, undo_lists
from .tasks import seed_tasks, undo_tasks
from .faves import seed_faves, undo_faves
from .contacts import seed_contacts, undo_contacts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_tasks()
        undo_lists()
        undo_users()
        undo_faves()
        undo_contacts()
    seed_users()
    seed_lists()
    seed_tasks()
    seed_faves()
    seed_contacts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_lists()
    undo_users()
    undo_faves()
    undo_contacts()
    # Add other undo functions here
