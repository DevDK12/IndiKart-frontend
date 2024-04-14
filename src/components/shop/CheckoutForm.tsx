import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { CreateOrderRequest } from '../../Types/apiTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ICartReducerInitialState, TCartItem } from '../../Types/cart-types';
import { clearCart } from '../../redux/reducer/cart-slice';
import { RootState } from '../../redux/store';




const CheckoutForm = () => {


    
    const [createOrder] = useCreateOrderMutation();

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {tax, shippingCharges, total, subtotal, discount, cartItems, shippingInfo} = useSelector((state:  { cartSlice: ICartReducerInitialState }) => state.cartSlice);

    //_ Use rootState later
    // const {user} = useSelector((state: {userSlice: IUserReducerInitialState}) => state.userSlice);
    const {user} = useSelector((state: RootState) => state.userSlice);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);





    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);


        const orderPayload: CreateOrderRequest = {
            shippingInfo,
            user: user?._id as string,
            tax,
            shippingCharges,
            total,
            subtotal,
            discount,
            orderItems: cartItems.map((item: TCartItem) => ({
                photo: item.photo,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }))
        };


        try{
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin,
                },
                redirect: 'if_required',
            });

            if (error)  throw error;


            
            
            if(paymentIntent?.status === 'succeeded') {
                const res = await createOrder(orderPayload);
                if ('error' in res) throw new Error((res.error as Error).message);
                
                if (res.data.status === "success") {
                    dispatch(clearCart());
                    toast.success(res.data.message);
                    navigate("/orders");
                }
            }

            setIsProcessing(false);
        }
        catch (err) {
            setIsProcessing(false);
            toast.error((err as Error).message || "An error occurred while processing the payment");
        }
    }





    return (
        <div className='grid place-items-center h-full'>
            <form
                className='flex flex-col gap-10 w-1/2 bg-white/60 px-4 py-8 rounded-md'
                onSubmit={submitHandler}
            >
                <PaymentElement />
                <button 
                    disabled={isProcessing}
                    type='submit'
                    className='bg-cyan-400 w-1/3 rounded-md mx-auto px-4 py-2 font-bold' 
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;