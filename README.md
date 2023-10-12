# bugTracker

Welcome to the BugTracker full stack web application! This application utilizes a combination of cutting-edge technologies to help you track and manage software bugs effectively. Here's a breakdown of the key technologies used:

- **MongoDB:** A versatile and scalable document-oriented database.
- **Express:** A robust web application framework designed for Node.js.
- **React:** A widely adopted JavaScript library for crafting user interfaces.
- **Node.js:** A JavaScript runtime built on the powerful V8 engine from Google Chrome.

## Getting Started

To begin using the BugTracker application, follow these straightforward steps:

1. **Node.js Installation:** Ensure that you have Node.js installed on your system.

2. **Environment Setup:** Configure your environment variables with the necessary settings, including MongoDB and Cloudinary.

3. **Install Dependencies:** In the root directory of the project, install the required dependencies by executing the following command:

   ```
   npm install
   ```

4. **Configuration for the Frontend:** Populate your environment file in the "mern-auth-client" directory with the following content:

   ```
   REACT_APP_API_ENDPOINT=http://localhost:8081
   ```

5. **Start the Frontend:** Launch the frontend of the application with this command:

   ```
   npm start
   ```

6. **Configuration for the Backend:** In a new terminal window, navigate to the root directory of the project and set up your environment variables in the root folder. Ensure that you fill in the following fields as needed:

   ```
   PORT=8081
   JWT_SECRET=
   REFRESH_TOKEN_SECRET=
   SESSION_EXPIRY=900  # 15 minutes
   REFRESH_TOKEN_EXPIRY=2592000  # 30 days
   MONGO_DB_CONNECTION_STRING=
   COOKIE_SECRET=
   WHITELISTED_DOMAINS=http://localhost:3000
   CLOUD_NAME=
   API_KEY=
   API_SECRET=
   ```

7. **Start the Backend:** Run the following command to start the server:

   ```
   npm start
   ```

8. **Database and Cloudinary Setup:** You will need to set up an account with MongoDB and Cloudinary and obtain the necessary keys for proper functionality.

9. **Access the Application:** Open a web browser and go to [http://localhost:8081](http://localhost:8081) to access the BugTracker application.

Thank you for choosing BugTracker! If you have any questions or encounter issues, please don't hesitate to reach out for assistance.

---

For additional guidance on setting up environment variables, such as JWT_SECRET, COOKIE_SECRET, and more, check out my [mern-auth-server README](https://github.com/TylerGeorgeAlexander/mern-auth-server).
