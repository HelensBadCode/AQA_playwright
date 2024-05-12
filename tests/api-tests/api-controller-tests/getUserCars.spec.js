import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {TEST_USER_STORAGE_STATE_PATH} from "../../../src/constants.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";

test.describe("Cars API", () => {
    test.describe("Positive case to get cars by user", ()=> {
        let carsController;

        test.beforeEach(async ({request})=>{
            carsController = new CarsController(request);
        })

        test.afterAll(async ()=>{
            const request = await apiRequest.newContext({ storageState: TEST_USER_STORAGE_STATE_PATH})

            carsController = new CarsController(request);

            const carsResponse = await carsController.getUserCars();
            const cars = await carsResponse.json();

            await Promise.all(
                cars.data.map((car) => carsController.deleteCar(car.id))
            )
        })

        test("Get cars by user", async ()=>{
            const brand = BRANDS.Audi;
            let counter = 0;
            for (const model of Object.values(MODELS[brand.id])) {
                counter++;
                await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async ()=>{
                    const requestBody = {
                        "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
                    };

                    const response = await carsController.createCar(requestBody);
                    const body = await response.json();

                    expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
                    expect(response.status()).toBe(REQUEST_STATUS.CODE.create);


                    const responseTest = await carsController.getUserCars();
                    const getCarResponse = await responseTest.json();

                    expect(getCarResponse.status).toBe(REQUEST_STATUS.STATUS.success);
                    expect(responseTest.status()).toBe(REQUEST_STATUS.CODE.ok);
                    expect(getCarResponse.data.length).toEqual(counter);
                })
            }

        })

    })

})