import { ChangeEvent, FormEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";






const Shipping = () => {

    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                    onChange={changeHandler}
                />

                <Input
                    type="text"
                    placeholder="City"
                    label="City"
                    value={shippingInfo.city}
                    onChange={changeHandler}
                />

                <Input
                    type="text"
                    placeholder="State"
                    label="State"
                    value={shippingInfo.state}
                    onChange={changeHandler}
                />
                <div className="px-4 flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center w-full">
                    <label>Country</label>
                    <select
                        className="w-full sm:w-2/3 rounded-md p-1 border-2 text-black border-gray-400 focus:outline-none focus:border-cyan-400 "
                        name="country"
                        required
                        value={shippingInfo.country}
                        onChange={changeHandler}
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
                    onChange={changeHandler}
                />

                <button className="bg-cyan-400 px-3 py-2 rounded-md w-full sm:w-1/2" type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default Shipping;
