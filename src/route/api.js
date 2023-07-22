import express from 'express'
// import { homeController } from '../controller/homeController'
// import homeController from '../controller/homeController.js'
// import homeController from '../controller/homeController.js'
import APIController from '../controller/APIController.js';
// homeController = require('../controller/homeController');
let router = express.Router();
const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUser);
    router.post('/create-user', APIController.createNewUser);
    router.put('/update-user', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);

    return app.use('/api/v1/',router)
}

// module.exports = initWebRoute;
export default initAPIRoute;