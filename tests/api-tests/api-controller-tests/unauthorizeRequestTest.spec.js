import CarsController from "../../../src/controllers/CarsController.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";
import {expect, test} from "@playwright/test";
import AuthController from "../../../src/controllers/AuthController.js";

test.describe("Cars API without authorized", () => {
    let carsController;
    let authController;
    const brand = BRANDS.Audi;
    const model = MODELS["1"].Q7;
    const carID = 162146;
    const createdBody = {
        "carBrandId": brand.id,
        "carModelId": model.id,
        "mileage": Math.floor(Math.random() * 100)
    };

    test.beforeEach(async ({request}) => {
        carsController = new CarsController(request);
        authController = new AuthController(request);
        const logOutResponse = await authController.logOut();
    })
    test("Create car", async () => {
            const createResponse = await carsController.createCar(createdBody);
            const createBody = await createResponse.json();

            expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
            expect(createBody.status).toBe(REQUEST_STATUS.STATUS.failed);

    })

    test("Delete car", async () => {
        const deleteResponse = await carsController.deleteCar(carID);
        expect(deleteResponse.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
        const getDeleteBody = await deleteResponse.json();
        expect(getDeleteBody.status).toBe(REQUEST_STATUS.STATUS.failed);

    })

    test("Get car by id", async () => {
        const getUserCarResponse = await carsController.getUserCarById(carID);
        const getUserCarBody = await getUserCarResponse.json();

        expect(getUserCarResponse.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
        expect(getUserCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);

    })

    test("Get cars", async () => {
        const getUserCarsResponse = await carsController.getUserCars();
        const getUserCarsBody = await getUserCarsResponse.json();

        expect(getUserCarsResponse.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
        expect(getUserCarsBody.status).toBe(REQUEST_STATUS.STATUS.failed);

    })

    test("Update car", async () => {
        const updateCarData = {
            "carBrandId": brand.id,
            "carModelId": model.id,
            "mileage": Math.floor(Math.random() * 100)
        }

        const updateCarResponse = await carsController.updateCar(updateCarData, carID);
        const updateCarBody = await updateCarResponse.json();

        expect(updateCarResponse.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
        expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);

    })

})