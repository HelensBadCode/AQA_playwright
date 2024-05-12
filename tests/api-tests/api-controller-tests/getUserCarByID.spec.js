import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {TEST_USER_STORAGE_STATE_PATH} from "../../../src/constants.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";

test.describe("Cars API", () => {
    let carsController;
    test.beforeEach(async ({request}) => {
        carsController = new CarsController(request);
    })
    test.describe("Positive case to get car by id", () => {

        test.afterAll(async () => {
            const request = await apiRequest.newContext({storageState: TEST_USER_STORAGE_STATE_PATH})

            carsController = new CarsController(request);

            const carsResponse = await carsController.getUserCars();
            const cars = await carsResponse.json();

            await Promise.all(cars.data.map((car) => carsController.deleteCar(car.id)))
        })

        test("Get new car by id", async () => {
            const brand = BRANDS.Audi;
            const model = MODELS["1"].Q7;
            let carID;

            const requestBody = {
                "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
            };

            const response = await carsController.createCar(requestBody);
            const body = await response.json();

            const expectedBodyCar = {
                "id": expect.any(Number),
                "carBrandId": requestBody.carBrandId,
                "carModelId": requestBody.carModelId,
                "initialMileage": requestBody.mileage,
                "updatedMileageAt": expect.any(String),
                "carCreatedAt": expect.any(String),
                "mileage": requestBody.mileage,
                "brand": brand.title,
                "model": model.title,
                "logo": brand.logoFilename
            };

            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.create);

            carID = (body.data.id);
            const responseTest = await carsController.getUserCarById(carID);
            const getCarBody = await response.json();

            expect(getCarBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(responseTest.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(getCarBody.data).toEqual(expectedBodyCar);
        })

    })

    test.describe('Negative case for get car by id', () => {
        test('Incorrect car ID', async () => {
            const incorrectID = Math.floor(Math.random() * 100);
            const response = await carsController.getUserCarById(incorrectID);
            const body = await response.json();

            expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
        })
    })
})