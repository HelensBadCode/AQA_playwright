import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";

test.describe("Cars API", () => {
    let carsController;
    const brand = BRANDS.Audi;
    const model = MODELS["1"].Q7;
    let carID;

    test.beforeEach(async ({request}) => {
        carsController = new CarsController(request);
    })

    test.afterEach( async ({request})=> {
        carsController = new CarsController(request);
        const response = await carsController.getUserCarById(carID);
        expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);

        const getCarBody = await response.json();
        expect(getCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);
    })

    test.describe("Positive case for delete car", () => {
        test("Delete new car by id", async () => {
            const requestBody = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            };

            const response = await carsController.createCar(requestBody);
            const body = await response.json();
            carID = body.data.id;
            expect(response.status()).toBe(REQUEST_STATUS.CODE.create);

            const deleteResponse = await carsController.deleteCar(carID);
            expect(deleteResponse.status()).toBe(REQUEST_STATUS.CODE.ok);
            const getDeleteBody = await response.json();
            expect(getDeleteBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(getDeleteBody.data.id).toEqual(carID);

        })

    })

    test.describe("Negative case for delete car", () => {
        test("Incorrect car ID", async () => {
            const incorrectID = Math.floor(Math.random() * 100);
            const response = await carsController.deleteCar(incorrectID);
            const body = await response.json();

            expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
        })
    })
})