export  type TCartItem = {
    photo: string,
    productId: string,
    name: string,
    price: number,
    quantity: number,
    stock: number,
}



export type TAddress = {
    address: string,
    city: string,
    postalCode: string,
    country: string,
}






export interface ICartReducerInitialState {
    loading: boolean,
    cartItems: TCartItem[],
    subtotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    shippingInfo: TAddress
}