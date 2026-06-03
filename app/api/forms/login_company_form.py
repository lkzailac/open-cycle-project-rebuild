from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Company


def company_exists(form, field):
    print("Checking if company exists", field.data)
    admin_email = field.data
    company = Company.query.filter(Company.admin_email == admin_email).first()
    if not company:
        raise ValidationError("This Admin is not registered")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    admin_email = form.data['admin_email']
    company = Company.query.filter(Company.admin_email == admin_email).first()
    if not company:
        raise ValidationError("Password is invalid.")
    if not company.check_password(password):
        raise ValidationError("Password is invalid.")

# def company_names():
#     companies = Company.query.all()
#     return [company.name for company in companies]


class LoginCompanyForm(FlaskForm):
    # name = SelectField('name', validators=[DataRequired()])
    name = StringField('name')
    admin_email = StringField('admin_email', validators=[DataRequired(), company_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])


# class LoginCompanyForm(FlaskForm):
#     pass
