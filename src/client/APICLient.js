import CarController from "../controllers/CarsController.js";
import AuthController from "../controllers/AuthController.js";
import UserController from '../controllers/UserController.js';

import {request} from "@playwright/test";

export default class APIClient {
    constructor(request) {
        this.auth = new AuthController(request);
        this.cars = new CarController(request);
        this.user = new UserController(request);
    }

    static async authenticateWithNewUser(registerData){
        const client = await request.newContext();
        const authController = new AuthController(client);
        await authController.signUp(registerData);
        return new APIClient(client);
    }

    static async authenticate(userData){
        const client = await request.newContext();
        const authController = new AuthController(client);
        await authController.signIn(userData);
        return new APIClient(client);
    }
}