from app.models.base_user import BaseUser
from flask import Blueprint, jsonify, session, request
from app.models import Company, db
from .forms import LoginCompanyForm
from .forms import SignUpCompanyForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime

cauth_routes = Blueprint('cauth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@cauth_routes.route('/')
def authenticate():
    print("hitting company authhhhhhhhhhh")
    """
    Authenticates a company.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Company Unauthorized']}


@cauth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a company in
    """
    form = LoginCompanyForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the company to the session, we are logged in!
        company = Company.query.filter(Company.admin_email == form.data['admin_email']).first()
        login_user(company.base_user[0])
        return company.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cauth_routes.route('/logout')
def logout():
    """
    Logs a company out
    """
    logout_user()
    return {'message': 'Company logged out'}


@cauth_routes.route('/signup/', methods=['POST'])
def sign_up():

    """
    Creates a new company and logs them in
    """
    form = SignUpCompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        company = Company(
            name=form.data['name'],
            admin_email=form.data['admin_email'],
            password=form.data['password'],
            logo_url=form.data['logo_url'],
            statement=form.data['statement'],
            warehouse_location=form.data['warehouse_location'],
            products_sold=form.data['products_sold'],
            carbon_goal=form.data['carbon_goal'],
            carbon_goal_date=form.data['carbon_goal_date'],
            transparency_score=1,
            c_footprint_mt=0,
            signup_date=datetime.datetime.now()
        )
        db.session.add(company)
        db.session.commit()

        #get this company and create base user
        companies = Company.query.all()
        last_company = companies[-1]
        newBaseC = BaseUser(company_id = last_company.id)

        db.session.add(newBaseC)
        db.session.commit()

        login_user(last_company.base_user[0])
        return last_company.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cauth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Company Unauthorized']}, 401
