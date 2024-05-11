import BaseController from "./BaseController.js";

export default class AuthController extends BaseController {
    #SIGN_IN_PATH = '/auth/signin'
    #SIGN_UP_PATH = '/auth/signup'
    #LOG_OUT_PATH = '/auth/logout'


    async signUp(userData){
        return this._request.post(this.#SIGN_UP_PATH, {data: userData, headers: {"Content-Type": "application/json"}})
    }


    async signIn({email, password, remember = false}){
        return this._request.post(this.#SIGN_IN_PATH, {
            data : {
                email,
                password,
                remember
            }
        })
    }

    async logOut(){
        return this._request.get(this.#LOG_OUT_PATH)
    }

}