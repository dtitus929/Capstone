"""create tables

Revision ID: 7ca2f0dfc014
Revises:
Create Date: 2023-04-19 20:00:49.789926

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '7ca2f0dfc014'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(length=255), nullable=False),
                    sa.Column('first_name', sa.String(length=50), nullable=False),
                    sa.Column('last_name', sa.String(length=50), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('lists',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('is_default', sa.Boolean(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE lists SET SCHEMA {SCHEMA};")

    op.create_table('tasks',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('description', sa.Text(), nullable=True),
                    sa.Column('due_date', sa.String(length=50), nullable=True),
                    sa.Column('priority', sa.Integer(), nullable=True),
                    sa.Column('completed', sa.Boolean(), nullable=False),
                    sa.Column('list_id', sa.Integer(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE tasks SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('lists')
    op.drop_table('users')
    # ### end Alembic commands ###