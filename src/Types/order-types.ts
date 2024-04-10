import { ICartReducerInitialState, TCartItem } from "./cart-types";

export type TOrderItem = Omit<TCartItem, "stock">


export type TOrder = Omit<ICartReducerInitialState, 'loading' | 'cartItems'> & {
    _id: string,
    user: {
        _id: string,
        email: string,
        name: string,
    },
    status: "processing" | "shipped" | "delivered" | "cancelled";
    orderItems: TOrderItem[],
}
//_  '_id' is missing from TOrderItem[], and OrderId is also 



export type TOrderDetail = Omit<TOrder, "shippingInfo" | "user" | "_id" > & {
    name: string,
    email: string,
    address: string, 
    city: string,
    state: string,
    country: string,
    pinCode: string,
}
