import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItemCard from "../../components/shop/CartItemCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICartReducerInitialState, TCartItem } from "../../Types/cart-types";
import { applyDiscount, calculatePrice, decrementCartItem, deleteFromCart, incrementCartItem } from "../../redux/reducer/cart-slice";
import toast from "react-hot-toast";
import { server } from "../../redux/api/productApi";





const Cart = () => {

    const dispatch = useDispatch();

    const {cartItems, subtotal, shippingCharges, tax, discount, total} = useSelector((state: {cartSlice: ICartReducerInitialState}) => state.cartSlice);


    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


    //_ Using De-Bouncing effect 
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if(couponCode === "") return setIsValidCouponCode(false);

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {signal});
                const couponData = await res.json();

                if (res.status !== 200 || couponData.status === 'error') throw new Error(couponData.message);

                const {discount} = couponData.data;

                setIsValidCouponCode(true);
                dispatch(applyDiscount(discount));
            } 
            catch (err) {
                setIsValidCouponCode(false);
            }
        }, 500);
        return () => {
            abortController.abort(); //_ Abort fetch request
            setIsValidCouponCode(false);
            dispatch(applyDiscount(0));
            clearTimeout(timer);
        }
    }, [couponCode, dispatch]);




    
    useEffect(()=>{
        dispatch(calculatePrice());
    },[dispatch, cartItems])

    const incrementHandler = (cartItem: TCartItem) => {
        if(cartItem.quantity >= cartItem.stock){
            toast.error(`${cartItem.name} Limited Stock`);
            return;
        }
        dispatch(incrementCartItem(cartItem.productId));
    }
    const decrementHandler = (cartItem: TCartItem) => {
        dispatch(decrementCartItem(cartItem.productId));
    }

    const removeHandler = (productId: string) => {
        dispatch(deleteFromCart(productId));
    }


    return (
        <div className="cart h-full w-full flex flex-col gap-10 px-5 py-4 xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 xl:py-4
            md:flex-row
            ">

            <main className="flex flex-col gap-4 md:w-2/3 px-8 py-4 bg-primary-100 rounded-md overflow-y-auto hide-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((i, idx) => (
                        <CartItemCard
                            incrementHandler={incrementHandler}
                            decrementHandler={decrementHandler}
                            removeHandler={removeHandler}
                            key={idx}
                            cartItem={i}
                        />
                    ))
                ) : (
                    <h1>No Items Added</h1>
                )}
            </main>

            <aside className="bg-primary-100 grow px-8 py-4 rounded-md flex flex-col gap-4 justify-center">
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: <em className="text-red-500"> - ₹{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>

                <input
                    className="w-full rounded-md p-2 border-2 border-gray-400 focus:outline-none focus:border-cyan-400 text-secondary-txt"
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="text-green-500">
                            ₹{discount} off using the <code className="bg-gray-300 text-gray-500 select-text px-2 py-1 rounded-md">{couponCode}</code>
                        </span>
                    ) : (
                        <span className="text-red-500 flex items-center gap-2 font-semibold mx-auto">
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link className="bg-cyan-400 font-semibold px-3 py-2 rounded-md text-center" to="/shipping">Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;
