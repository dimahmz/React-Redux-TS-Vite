import { AxiosResponse } from "axios";
import axiosInstance from "./config/axiosConfig";


export interface SignInRequestBody{
  reference : number,
  password : string
}


export default class AuthApi{
  static async getCurrentUser(): Promise<AxiosResponse>{
    const response : AxiosResponse = await axiosInstance.get("/current_user");
    return response;
  }

  static async signInUser(signInRequestBody  : SignInRequestBody): Promise<AxiosResponse>{
    const response : AxiosResponse = await axiosInstance.post("/sign_in", {
      ...signInRequestBody
    });
    return response;
  }
}