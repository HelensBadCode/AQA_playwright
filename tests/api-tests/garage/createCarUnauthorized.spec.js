import {test, expect,request} from "@playwright/test";
import {BRANDS} from "../../../src/data/brands.js";
import {MODELS} from "../../../src/data/models.js";
import {ENDPOINTS} from "../../../src/api-data/endPoints.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";

test.describe('Create car', () => {
    test.describe('Negative case', () => {
        test('Create car non authorization user', async ({request}) => {
            const requestBodyCar = {
                "carBrandId": BRANDS.Fiat,
                "carModelId": MODELS["1"].A6,
                "mileage": Math.floor(Math.random() * 100)
            }
            const response = await request.post(ENDPOINTS.cars, {
                data: requestBodyCar
            })
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": REQUEST_STATUS.STATUS.failed,
                "message": REQUEST_STATUS.MASSAGE.unauthorized
            }
            expect(response.status()).toBe(REQUEST_STATUS.CODE.unAuthorize);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        })
    })
})