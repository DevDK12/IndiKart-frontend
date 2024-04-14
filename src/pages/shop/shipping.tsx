import { ChangeEvent, FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


import Input from "@ui/Input";
import { TAddress } from "@/Types/cart-types";
import { PaymentIntentResponse } from "@/Types/apiTypes";
import { server } from "@api/productApi";
import { saveShippingInfo } from "@/redux/reducer/cart-slice";






const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const totalAmount = queryParams.get("totalAmount");







    const [shippingInfo, setShippingInfo] = useState<TAddress>({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const addressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }));
    const cityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }));
    const stateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setShippingInfo((prev) => ({ ...prev, state: e.target.value }));
    const countryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => setShippingInfo((prev) => ({ ...prev, country: e.target.value }));
    const pinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setShippingInfo((prev) => ({ ...prev, pinCode: e.target.value }));


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if(!shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.country || !shippingInfo.pinCode){
            toast.error("Please fill all the fields");
            return;
        }
        dispatch(saveShippingInfo(shippingInfo));

        try{
            const res = await fetch(`${server}/api/v1/payment/create`, {
                method: 'POST',
                body: JSON.stringify({
                    amount: totalAmount,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData: PaymentIntentResponse = await res.json();

            const { status } = resData;

            if (status === "error") {
                //_ Customise the error to contain original error from server 
                //* By creating original error type in api types (Later)
                throw new Error("Payment Gateway is not ready");
            }

            toast.success("Payment Gateway is ready");
            const { data: clientSecret } = resData;
            navigate("/checkout", { state:  clientSecret });
        }
        catch (err) {
            toast.error((err as Error).message);
        }
    };


    return (
        <div className="h-full px-10 py-5 flex flex-col gap-10 
        ">

            <button 
                className="bg-primary-100 w-8 h-8 rounded-full grid place-items-center" 
                onClick={() => { navigate(-1) }}
            >
                <BiArrowBack />
            </button>


            <form onSubmit={submitHandler}
                className="grow flex flex-col gap-8 items-center w-full xs:w-3/4 sm:w-2/3 md:w-1/2 xl:w-1/3 mx-auto bg-primary-100 py-8 px-4 rounded-md"
            >

                <h1 className="title lg:text-3xl mb-7">Shipping Address</h1>

                <Input
                    type="text"
                    placeholder="Address"
                    label="Address"
                    value={shippingInfo.address}
                    onChange={addressChangeHandler}
                />

                <Input
                    type="text"
                    placeholder="City"
                    label="City"
                    value={shippingInfo.city}
                    onChange={cityChangeHandler}
                />

                <Input
                    type="text"
                    placeholder="State"
                    label="State"
                    value={shippingInfo.state}
                    onChange={stateChangeHandler}
                />
                <div className="px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full">
                    <label>Country</label>
                    <select
                        className="w-full sm:w-2/3 rounded-md p-1 border-2 text-black border-gray-400 focus:outline-none focus:border-cyan-400 "
                        name="country"
                        required
                        value={shippingInfo.country}
                        onChange={countryChangeHandler}
                    >
                        <option value="">Choose Country</option>
                        <option value="india">India</option>
                    </select>
                </div>

                <Input
                    type="number"
                    placeholder="Pin Code"
                    label="PinCode"
                    value={shippingInfo.pinCode}
                    onChange={pinChangeHandler}
                />

                <button className="bg-cyan-400 px-3 py-2 rounded-md w-full sm:w-1/2" type="submit">Check out</button>
            </form>
        </div>
    );
};

export default Shipping;

