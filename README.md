# ta-bug-tracker-mern

Welcome to the bugTracker full stack web application! This application is built using the following technologies:

* MongoDB: a popular, flexible, and scalable document-oriented database
* Express: a web application framework for Node.js
* React: a popular JavaScript library for building user interfaces
* Node.js: a JavaScript runtime built on Chrome's V8 JavaScript engine

##To get started with the BugTracker application, follow these steps:

Make sure you have Node.js installed on your system.
Also make sure you have MongoDB set up for your environment variables.

Install the dependencies for the application by running the following command in the root directory of the project:

```npm install```

populate your env file in the mern-auth-client:
```REACT_APP_API_ENDPOINT = http://localhost:8081```

Then run the following command:
```npm start```

In a new terminal window, navigate to the root directory of the project and start the server by running the following command:
populate your env file in the root folder:
```
PORT=8081
JWT_SECRET=
REFRESH_TOKEN_SECRET=
SESSION_EXPIRY = 60 * 15
REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30
MONGO_DB_CONNECTION_STRING=
COOKIE_SECRET=
WHITELISTED_DOMAINS = http://localhost:3000
CLOUD_NAME=
API_KEY=
API_SECRET=

npm start
```

In a web browser, navigate to http://localhost:8081 to access the bugTracker application.
Thank you for using bugTracker! If you have any questions or encounter any issues, please feel free to contact me.
