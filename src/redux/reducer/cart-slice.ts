import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartReducerInitialState, TCartItem } from "../../Types/cart-types";



const initialState : ICartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        country: "",
        postalCode: "",
    }
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<TCartItem>) {
            state.loading = true;
            const prodIndex = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            if(prodIndex === -1){
                state.cartItems.push(action.payload);
            }
            else{
                state.cartItems[prodIndex].quantity += action.payload.quantity
            }
            state.loading = false;
        },
        incrementCartItem(state, action: PayloadAction<string>) {
            state.loading = true;
            const cartItem = state.cartItems.find((item) => item.productId === action.payload);
            if(cartItem)
                cartItem.quantity += 1;
        
            state.loading = false;
        },
        decrementCartItem(state, action: PayloadAction<string>) {
            state.loading = true;
            const cartItem = state.cartItems.find((item) => item.productId === action.payload);
            if(cartItem)
                cartItem.quantity -= 1;
        
            if(cartItem?.quantity === 0) 
                state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
        
            state.loading = false;
        },
        deleteFromCart(state, action: PayloadAction<string>) {
            state.loading = true;
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload);
            state.loading = false;
        },
        clearCart(state) {
            state.loading = true;
            state.cartItems = [];
            state.loading = false;
        },

        calculatePrice(state) {
            const subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

            state.subtotal = subtotal
            state.tax = Math.round(state.subtotal * 0.18);
            state.shippingCharges = subtotal > 1000 ? 0 : 200;
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
        }
    }
});


export const {addToCart, deleteFromCart, clearCart, incrementCartItem, decrementCartItem, calculatePrice} = cartSlice.actions;