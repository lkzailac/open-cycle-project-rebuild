from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, TextAreaField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Company


def company_exists(form, field):
    print("Checking if company exits", field.data)
    email = field.data
    company = Company.query.filter(Company.admin_email == email).first()
    if company:
        raise ValidationError("Company is already registered.")


class SignUpCompanyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), company_exists])
    admin_email = StringField('admin_email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    logo_url = StringField('logo_url' )
    statement = TextAreaField('statement')
    warehouse_location = StringField('warehouse_location')
    products_sold = IntegerField('products_sold')
    carbon_goal = FloatField('carbon_goal')
    carbon_goal_date = StringField('carbon_goal_date')
