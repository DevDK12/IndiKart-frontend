import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/shop/CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);


const Checkout = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const clientSecret : string | null = location?.state?.clientSecret;

    if(!clientSecret){
        navigate('/shop/cart');
        throw new Error("Client secret not found");
    }

    const options = {
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}

export default Checkout;

