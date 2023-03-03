import express from 'express';

import { createProperty, updateProperty, deleteProperty, getAllProperties, getPropertyDetail, } from '../controllers/property.controller.js';

//create instance of our router
const router = express.Router();

//routes
router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyDetail);
router.route('/').post(createProperty);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);

export default router;