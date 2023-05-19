### Real Estate Dashbaord 

![Dashboard](https://i.imgur.com/MqWDJXl.png)

MERN DASHBOARD PROJECT
Cloudinary is for serving images
dotenv is for safely storing environment variables
cors for cross origin requests

we added "type": "module" to package.json to use ES6 modules in Node.js
we added "scripts": { "start": "node server.js" } to package.json to run the server with npm start

we use the models we created (via the schemas) to create the instances of the data we want to save in the database

how the new user route works: 
1. We have a user route to create a "user" which is a post route (in user.routes.js) on '/' (app.use('/api/v1/users', userRouter in index.js)
2. That function is called createUser in user.controller.js
3. should return status of 200
