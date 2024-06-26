# Remember the Eggs

This is a full stack project developed while a student at App Academy.  It is a clone of the popular to-do list app called Remember the Milk.  The back-end utilizes a Flask server framework with a SQLAlchemy ORM. The front-end is React and makes use of Redux as a data store. No styling frameworks were used... just standard CSS.

Available for view at: [Remember the Eggs](https://davet-capstone.onrender.com/)
* This site may take a minute to spin up.  Give it a minute. 😀 

![remeggs-screenshots-github](https://user-images.githubusercontent.com/111056707/234941747-ab8da574-5844-448d-baff-f73d86df57ab.png)


## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /><img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

* Front-end:
  * React
  * Redux
* Back-end:
  * Flask
  * SQLAlchemy
* Database:
  * SQLite (Development)
  * PostgreSQL (Production)

## Index

[MVP Feature List](https://github.com/dtitus929/Capstone/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/dtitus929/Capstone/wiki/Database-Schema) |
[User Stories](https://github.com/dtitus929/Capstone/wiki/User-Stories) |
[Wire Frames](https://github.com/dtitus929/Capstone/wiki/Wireframes)

## Setup Instructions

The structure for this app includes a root Pipfile for installing dependancies for the back-end Flask server.  The react-app folder contains a package.json file for setting up dependancies the front-end server.

#### Launching the Full Application Locally

1. Download the application as a zip file from GitHub.
2. From within the app folder install the dependent pip packages: `pipenv install`
3. Enter the pipenv shell environment: `pipenv shell`
4. Migrate the SQLAlchemy database schema: `flask db upgrade`
5. Generate SQLAlchemy seed data for testing: `flask seed all`
6. Start the back-end server: `flask run`
7. From within the react-app folder install the dependent npm packages: `npm install`
7. Start the front-end server: `npm start`
