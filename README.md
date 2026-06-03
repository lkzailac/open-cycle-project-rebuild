# [Open/ /Cycle/ /Project](https://open-cycle-project.herokuapp.com)

 *by [Laura Zailac](https://www.linkedin.com/in/laura-zailac/)*
___________________________________________________________________

## What is OCP?
Open Cycle Project is an application where companies hoping to both hold themselves accountable for and be more transparent with the carbon footprints of their products can come to register their products and calculate their carbon and transparency scores. They can also set goals for the future of their carbon output. The transparency scores grow as a company registers more products. This can be seen by the consumers and incentivizes companies to dive deep into their product offering and reflect on what they are willing to share. Consumers can come to the site to look up a company or a product and educate themselves on the impact of the goods they purchase. 

Open Cycle Project was inspired by my background in consumer goods, my passion for nature and keeping the planet healthy, as well as many inspiring green initiatives gaining traction now more than ever. Specifically, I have taken inspiration from the brand [All Birds](https://www.allbirds.com/), who has created an open-source [carbon calculator](https://www.allbirds.com/pages/carbon-footprint-calculator). 

Please check out my wikis for more info and enjoy! 🌱
- [Feature List](https://github.com/lkzailac/open-cycle-project/wiki/Feature-List)
- [Database Schema](https://github.com/lkzailac/open-cycle-project/wiki/Database-Schema---Backend-Routes)
- [Frontend Routes + Components](https://github.com/lkzailac/open-cycle-project/wiki/Frontend-Routes,-Components)
- [Wireframes](https://github.com/lkzailac/open-cycle-project/wiki/Wireframes)


## Installation
2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
CREATE USER ocp_user WITH CREATEDB PASSWORD 'password';
CREATE DATABASE ocp_db WITH OWNER ocp_user;

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Deploy to Heroku
***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


0. Run npm run build in React App
1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a open-cycle-project
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a open-cycle-project
   ```

9. set up your database:

   ```bash
   heroku run -a open-cycle-project flask db upgrade
   heroku run -a open-cycle-project flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.


