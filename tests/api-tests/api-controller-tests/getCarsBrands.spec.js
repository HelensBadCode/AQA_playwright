import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {BRANDS} from "../../../src/data/brands.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";


test.describe.only("Cars API", ()=>{
    test.describe("Get all car's brands with Controller", ()=>{
        let carsController
        const expectBrands =  Object.values(BRANDS);

        test.beforeEach(async ({request})=>{
            carsController = new CarsController(request);
        })

        test("Get car's brands", async ()=>{
            const response = await carsController.getCarsBrands();
            const body = await response.json();
            const expectedResponse = [
                {
                    id: expect.any(Number),
                    title: expect.any(String),
                    logoFilename: expect.any(String),
                },
            ];
            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expect.objectContaining(expectedResponse));
            expect(body.data).toEqual(expect.objectContaining(expectBrands));
        })

    })

})