from app.seeds.companies import seed_companies, undo_companies
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .country_grids import seed_country_grids, undo_country_grids
from .manufacturing_processes import seed_manufacturing_processes, undo_manufacturing_processes
from .factories import seed_factories, undo_factories
from .transport_modes import seed_transport_modes, undo_transport_modes
from .consumer_uses import seed_consumer_uses, undo_consumer_uses
from .components import seed_components, undo_components
from .products import seed_products, undo_products
from .component_table import seed_component_table, undo_component_table
from .use_table import seed_use_table, undo_use_table
from .base_users import seed_base_users, undo_base_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_companies()
    seed_base_users()
    seed_country_grids()
    seed_manufacturing_processes()
    seed_factories()
    seed_transport_modes()
    seed_consumer_uses()
    seed_components()
    seed_products()
    seed_component_table()
    seed_use_table()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_base_users()
    undo_users()
    undo_companies()
    undo_country_grids()
    undo_manufacturing_processes()
    undo_factories()
    undo_transport_modes()
    undo_consumer_uses()
    undo_components()
    undo_products()
    undo_component_table()
    undo_use_table()
    # Add other undo functions here
