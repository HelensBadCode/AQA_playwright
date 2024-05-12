import BaseController from "./BaseController.js";

export default class CarsController extends BaseController{
    #CREATE_CAR = '/api/cars'
    #UPDATE_CAR = '/api/cars/#'
    #GET_USER_CARS = '/api/cars'
    #GET_USER_CARS_BY_ID_PATH = '/api/cars/#'
    #DELETE_USER_CARS= '/api/cars/#'
    #GET_CARS_BRANDS= '/api/cars/brands'
    #GET_CARS_BRAND_ID = '/api/cars/brands/#'
    #GET_CARS_MODELS = '/api/cars/models'
    #GET_CARS_MODELS_ID = '/api/cars/models/#'

    constructor(request) {
        super(request);
    }

    async createCar(newCar){
        return this._request.post(this.#CREATE_CAR, {data: newCar});
    }

    async updateCar(data,  id){
        return this._request.put(this.#UPDATE_CAR.replace('#', id), {data: data});
    }
    async getUserCars(){
        return this._request.get(this.#GET_USER_CARS);
    }

    async getCarsBrands(){
        return this._request.get(this.#GET_CARS_BRANDS);
    }

    async getUserCarsBrandsID(id){
        return this._request.get(this.#GET_CARS_BRAND_ID.replace('#', id));
    }

    async getCarsModels(){
        return this._request.get(this.#GET_CARS_MODELS);
    }

    async getUserCarsModelsID(id){
        return this._request.get(this.#GET_CARS_MODELS_ID.replace('#', id));
    }

    async getUserCarById(id) {
        return this._request.get(this.#GET_USER_CARS_BY_ID_PATH.replace('#', id));

    }

        async deleteCar(id){
        return this._request.delete(this.#DELETE_USER_CARS.replace('#', id));
    }

}