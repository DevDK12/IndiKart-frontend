import { ICartReducerInitialState } from "./cart-types"
import { TBarChart, TDashboardStats, TLineChart, TPieChart } from "./dashboard-types"
import { TOrder, TOrderItem } from "./order-types"
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

export type SingleProductRequest = {
    status: string,
    data: {
        product: TProduct,
    }
}


export type UpdateProductRequest = {
    formData: FormData,
    productId: string,
}





export type CreateOrderRequest = Omit<ICartReducerInitialState, 'loading' | 'cartItems'> & {
    user: string,
    orderItems: TOrderItem[],
}


export type OrdersResponse = {
    status: string,
    data: {
        orders: TOrder[]
    }
}


export type OrderDetailResponse = {
    status: string,
    data: {
        order: TOrder,
    }
}



export type PaymentIntentResponse = {
    status: string,
    data: {
        clientSecret: string,
    }
}


export type AllUserResponse = {
    status: string,
    data: {
        users: TUser[]
    }
}




export type StatsResponse = {
    status: string,
    data : {
        stats: TDashboardStats;
    }
}







export type PieResponse = {
    status: string,
    data: {
        charts: TPieChart
    }
}



export type BarResponse = {
    status : string,
    data : {
        charts: TBarChart
    }
}


export type LineResponse = {
    status : string,
    data : {
        charts: TLineChart
    }
}