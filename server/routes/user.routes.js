//import all the controllers
//routes forward requests to the appropriate controller, and that is connected to the models and the DB. 
//Controllers are the Logic for each route. 
//Routes are just the end points.

import express from 'express';

import { createUser, getAllUsers, getUserInfoByID } from '../controllers/user.controller.js';

const router = express.Router();

//routes
router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByID);

export default router;
