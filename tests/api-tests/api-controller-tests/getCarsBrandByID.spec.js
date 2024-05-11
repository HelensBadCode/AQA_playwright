import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";
import {BRANDS} from "../../../src/data/brands.js";
import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";


test.describe.only("Cars API", ()=>{
    let carsController
    test.beforeEach(async ({request})=>{
        carsController = new CarsController(request);
    })

    test.describe("Positive case to get brand by ID with Controller", ()=>{
        const brand = BRANDS.Audi;

        test("Get car's brand by ID", async ()=>{
            const response = await carsController.getUserCarsBrandsID(brand.id);
            const body = await response.json();
            const expectedResponse =
                {
                    id: brand.id,
                    title: brand.title,
                    logoFilename: brand.logoFilename,
                }

            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expectedResponse);

        })

    })

    test.describe('Negative case for get brand by id', () => {
        test('Incorrect brand ID', async () => {
            const incorrectID = Math.floor(Math.random() * 100);
            const response = await carsController.getUserCarsBrandsID(incorrectID);
            const body = await response.json();

            expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
        })
    })

})