import {test, expect, request as apiRequest} from "../../../src/fixtures/userLogInStateFixture.js";
import CarsController from "../../../src/controllers/CarsController.js";

import {REQUEST_STATUS} from "../../../src/api-data/statuses.js";
import {MODELS} from "../../../src/data/models.js";


test.describe.only("Cars API", ()=>{
    test.describe("Get all car's models with Controller", ()=>{
        let carsController
        const allModels =  Object.values(MODELS);
        const expectTitles = allModels.flatMap(modelsObject =>
            Object.values(modelsObject).map(model => model.title)
        );

        test.beforeEach(async ({request})=>{
            carsController = new CarsController(request);
        })

        test("Get car's models", async ()=>{
            const response = await carsController.getCarsModels();
            const body = await response.json();
            const expectedResponse = [
                {
                    id: expect.any(Number),
                    carBrandId: expect.any(Number),
                    title: expect.any(String),
                },
            ];

            const titlesFromResponse = body.data.map(model => model.title);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expect.objectContaining(expectedResponse));
            expect(titlesFromResponse).toEqual(expect.objectContaining(expectTitles));
        })

    })

})