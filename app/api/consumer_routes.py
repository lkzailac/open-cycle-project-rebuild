from app.models.component import Component
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models import Company
from app.models import Product

consumer_routes = Blueprint('consumer', __name__)


@consumer_routes.route('/')
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@consumer_routes.route('/<int:id>')
def get_user_products(id):

    all_list = []
    products = Product.query.all()
    for product in products:
        dict_prod = product.to_dict()
        dict_prod['company_name'] = Company.query.filter(Company.id == product.company_id).one().to_dict()["name"]
        all_list.append(dict_prod)
    # companies = Company.query.all()
    # for company in companies:
    #     company_list = []
    #     company_list.append(company.to_dict())
    #     # company_dict[company.name] = company.to_dict()
    #     prods = [prod.to_dict() for prod in company.products]
    #     company_list.append(prods)
    #     all_list.append(company_list)

    # print("route id----------------", id)
    # user = User.query.get(id)
    return {"all": all_list}
