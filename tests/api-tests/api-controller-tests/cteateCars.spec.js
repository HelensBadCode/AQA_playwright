import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";

import CarsController from "../../../src/controllers/CarsController.js";
import {TEST_USER_STORAGE_STATE_PATH} from "../../../src/constants.js";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {WRONG_DATA} from "../../../src/data/wrongData.js";
import {ENDPOINTS} from "../../../src/api-data/endPoints.js";



test.describe.only("Cars API", ()=>{
    test.describe("Positive case for create cars", ()=>{
        let carsController

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

        test("Create cars", async ()=>{

            for (const brand of Object.values(BRANDS)) {
                for (const model of Object.values(MODELS[brand.id])) {

                    await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async () => {
                        const requestBodyCar = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        };

                        const response = await carsController.createCar(requestBodyCar);
                        const body = await response.json();
                        const requestBody ={"carBrandId": brand.id};

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

                        const expected = {"carBrandId": requestBody.carBrandId};
                        expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
                        expect(response.status()).toBe(REQUEST_STATUS.CODE.create);
                        expect(body.data).toEqual(expectedBodyCar);
                    })
                }
            }
        })
    })

    test.describe("Negative cases for create car", () => {
        test("Max mileage", async ({request}) => {
            const brand = BRANDS.Audi;
            const model = MODELS["1"].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": WRONG_DATA.mileage.maxMileage
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.maxMill
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);


        })

        test("Min mileage", async ({request}) => {
            const brand = BRANDS.Audi;
            const model = MODELS["1"].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": WRONG_DATA.mileage.minMileage
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.minMill
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);

        })

        test("Incorrect mileage", async ({request}) => {
            const brand = BRANDS.Audi;
            const model = MODELS["1"].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": WRONG_DATA.mileage.incorrectMileage
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.incorrect_mileage
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);

        })

        test("Empty Brand id", async ({request}) => {
            const brand = WRONG_DATA.Empty;
            const model = MODELS["1"].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.brand_required
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        })

        test("Empty Model id", async ({request}) => {
            const brand = BRANDS.BMW;
            const model = WRONG_DATA.Empty;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.model_required
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        })

        test("Brand not found", async ({request}) => {
            const brand = WRONG_DATA.badBrand;
            const model = MODELS["1"].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.fake_brand
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
            expect(responseBodyCar).toEqual(expectedBodyCar);

        })

        test("Model not found", async ({request}) => {
            const brand = BRANDS.Fiat;
            const model = WRONG_DATA.badModel;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.fake_model
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
            expect(responseBodyCar).toEqual(expectedBodyCar);

        })

    })
})