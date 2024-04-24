import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import {MODELS} from "../../../src/data/models.js";
import {BRANDS} from "../../../src/data/brands.js";
import {ENDPOINTS} from "../../../src/api-data/endPoints.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";


test.describe("Cars API", () => {
    test.describe("Create new car", () => {
        let carIDs = [];

        test("Create cars all brands and models", async ({request}) => {
            for (const brand of Object.values(BRANDS)) {
                for (const model of Object.values(MODELS[brand.id])) {

                    await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async () => {
                        const requestBodyCar = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        };
                        const response = await request.post(ENDPOINTS.cars, {
                            data: requestBodyCar
                        });

                        const responseBodyCar = await response.json();
                        const expectedBodyCar = {
                            "id": expect.any(Number),
                            "carBrandId": requestBodyCar.carBrandId,
                            "carModelId": requestBodyCar.carModelId,
                            "initialMileage": requestBodyCar.mileage,
                            "updatedMileageAt": expect.any(String),
                            carCreatedAt: expect.any(String),
                            "mileage": requestBodyCar.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        };

                        expect(responseBodyCar.status).toBe(REQUEST_STATUS.STATUS.success);
                        expect(response.status()).toBe(REQUEST_STATUS.CODE.create);
                        expect(responseBodyCar.data).toEqual(expectedBodyCar);
                        carIDs.push(responseBodyCar.data.id);

                    })
                }
            }

        })

        test.afterEach("Delete car", async ({request}) => {
            for (const carId of carIDs) {
                const response = await request.delete(`${ENDPOINTS.cars}/${carId}`);
                expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            }
        })
    })
})