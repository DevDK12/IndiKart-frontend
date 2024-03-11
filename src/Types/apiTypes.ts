import { TProduct } from "./product-types"
import { TUser } from "./user-types"




//_ Response from server api 
export type MesssageResponse = {
    status: string,
    message: string,
}




export type UserResponse = {
    status: string,
    data: {
        user: TUser
    }
}



export type ProductsResponse = {
    status: string,
    data: {
        products: TProduct[]
    }
}





export interface ErrorResponse {
    status: number,
    data: {
        status: string;
        message: string; 
        error?: string;
        stack?: string;
    }
}

