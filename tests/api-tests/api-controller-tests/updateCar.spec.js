import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {TEST_USER_STORAGE_STATE_PATH} from "../../../src/constants.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";
import {CAR_DATA} from "../../../src/data/carData.js";


test.describe("Cars API", () => {
    let carsController;
    const brand = BRANDS.Audi;
    const model = MODELS["1"].Q7;

    test.beforeEach(async ({request}) => {
        carsController = new CarsController(request);
    })
    test.describe("Positive case to update car by id", () => {

        test.afterAll(async () => {
            const request = await apiRequest.newContext({storageState: TEST_USER_STORAGE_STATE_PATH})

            carsController = new CarsController(request);

            const carsResponse = await carsController.getUserCars();
            const cars = await carsResponse.json();

            await Promise.all(cars.data.map((car) => carsController.deleteCar(car.id)))
        })

        test("Update car by id", async () => {
            const requestBody = {
                "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
            };

            const createResponse = await carsController.createCar(requestBody);
            const createdBody = await createResponse.json();

            expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);


            const carID = (createdBody.data.id);
            const updateCarData = {
                "carBrandId": createdBody.data.carBrandId,
                "carModelId": createdBody.data.carModelId,
                "carCreatedAt": createdBody.data.carCreatedAt,
                "mileage": createdBody.data.mileage + 1
            }

            const updateResponse = await carsController.updateCar(updateCarData, carID);
            const updateCarBody = await updateResponse.json();

            expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(updateCarBody.data.mileage).toEqual(createdBody.data.mileage + 1);
        })

        test("Negative case - update car by incorrect id", async () => {
            const requestBody = {
                "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
            };

            const createResponse = await carsController.createCar(requestBody);
            const createdBody = await createResponse.json();

            expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);


            const incorrectID = Math.floor(Math.random() * 100);
            const updateCarData = {
                "carBrandId": createdBody.data.carBrandId,
                "carModelId": createdBody.data.carModelId,
                "carCreatedAt": createdBody.data.carCreatedAt,
                "mileage": createdBody.data.mileage + 1
            }

            const updateResponse = await carsController.updateCar(updateCarData, incorrectID);
            const updateCarBody = await updateResponse.json();

            expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.notFound);

        })

        test("Negative case - update car by incorrect body", async () => {
            const requestBody = {
                "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
            };

            const createResponse = await carsController.createCar(requestBody);
            const createdBody = await createResponse.json();

            expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);


            const carID = (createdBody.data.id);
            const incorrectCarData = {
                "brand": "Audi",
                "model": "R8",
                "miles": "333"
            }

            const updateResponse = await carsController.updateCar(incorrectCarData, carID);
            const updateCarBody = await updateResponse.json();

            expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.badRequest);

        })

    })
})
