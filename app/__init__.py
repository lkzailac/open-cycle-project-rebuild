
import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager


from .models.base_user import BaseUser
from .models import db, User, Company
from .api.consumer_routes import consumer_routes
from .api.company_routes import company_routes
from .api.auth_routes import auth_routes
from .api.company_auth_routes import cauth_routes

from .seeds import seed_commands

from .config import Config
app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
# login.login_view = 'cauth.unauthorized'
login.login_view = 'auth.unauthorized'

# @login.request_loader
# def load_user_from_req(request):
#     print("request URL---------", request.url)
#     if request.url == "http://localhost:5000/api/cauth/":
#         @login.user_loader
#         def load_company(id):
#             return Company.query.get(int(id))
#     else:
#         @login.user_loader
#         def load_user(id):
#             return User.query.get(int(id))

# @login.request_loader
# def load_user_from_req(request):
#     print("request URL---------", request.url)
#     if request.url == "http://localhost:5000/api/cauth/":
#         @login.user_loader
#         def load_company(id):
#             return Company.query.get(int(id))

# @login.user_loader
# def load_user(id):
#     return User.query.get(int(id))


# @login.user_loader
# def load_company(id):
#     if request.url == "http://localhost:5000/api/cauth/":
#         return Company.query.get(int(id))

# @login.user_loader
# def load_user(id):
#     if request.url == "http://localhost:5000/api/auth/":
#         return User.query.get(int(id))


@login.user_loader
def load_user(id):
    # need base user where the id that comes through is not null
    base = BaseUser.query.get(id)
    if base.company_id:
        return Company.query.get(base.company_id)
    if base.user_id:
        return User.query.get(base.user_id)



# @login.user_loader
# def load_user(id):
#     return User.query.get(int(id))



# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(consumer_routes, url_prefix='/api/consumer')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(cauth_routes, url_prefix='/api/cauth')
app.register_blueprint(company_routes, url_prefix='/api/company')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# .........

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
