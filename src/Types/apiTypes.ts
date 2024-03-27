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


export type ProductsRequest = {
    productsPerPage: number,
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



export type CategoriesResponse = {
    status: string,
    data: {
        categories: string[]
    }
}


export type SearchProductsResponse = {
    status: string,
    data: {
        products: TProduct[],
        totalPage: number,
    }
}


export type SearchProductsRequest = {
    price: number,
    page: number,
    search: string,
    sort: string,
    category: string,
    productsPerPage: number,
}