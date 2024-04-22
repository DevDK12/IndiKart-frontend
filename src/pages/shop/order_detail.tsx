import { Navigate, useParams } from "react-router-dom";
import { TOrder } from "@/Types/order-types";
import { server } from "@/redux/api/productApi";
import ProductCard from "@/components/admin/ProductCart";
import { useOrderDetailQuery } from "@/redux/api/orderApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";







const defaultOrder : TOrder = {
    _id: '',
    user: {
        name: "",
        email: "",
        _id: '',
    },
    shippingInfo : {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
    status: "processing",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [] ,

}




//_ Make sure to exit this and navigate to diff page if order is not found
//* i.e. someone tries to access order that does not exist


const OrderDetail = () => {

    const {token} = useSelector((state: RootState) => state.userSlice);
    const { orderId } = useParams<{orderId: string}>();



    const {data, isLoading: orderIsLoading, isSuccess: orderIsSuccess, isError} = useOrderDetailQuery({
        orderId: orderId!,
        token: token!.access_token,
    });


    const {
        shippingInfo: {
            address,
            city,
            state,
            country,
            pinCode,
        },
        status,
        subtotal,
        discount,
        shippingCharges,
        tax,
        total,
        orderItems,
        user: {
            name,
            email,
        },
    } = data?.data.order || defaultOrder;


    



    if(isError){
        return <Navigate to='/404' replace />;
    }


    //_ Each orderItem was designed to have ._id property but its not defined currently , check later
    return (
        <section className="main-section flex flex-col gap-4 justify-center mt-8 sm:flex-row">
            {orderIsLoading && <h1>Loading Order Details...</h1>}
            { orderIsSuccess && orderItems.length > 0 &&
                <article className="main-container py-10 lg:px-8 relative bg-primary-100 min-h-[40vh] overflow-y-auto flex flex-col gap-3  sm:min-h-[65vh] md:w-1/3 md:min-h-[85vh] sm:w-1/2 ">
                    <h2 className="title">Order Items</h2>
                    {orderItems.map(i => {
                        const photoUrl =  i.photo.includes('http') ? i.photo : `${server}/${i.photo}`;
                        return (
                            <ProductCard
                                key={i.productId}
                                name={i.name}
                                photo={photoUrl}
                                // productId={i.productId}
                                _id={i.productId}
                                quantity={i.quantity}
                                price={i.price}
                            />
                        )
                    }
                    )}
                </article>
            }

            {orderIsSuccess && orderItems.length > 0 &&
                <article className="main-container py-10 lg:px-8 bg-primary-100 flex flex-col gap-6 md:gap-8 relative" >
                    <h1 className="title"> Order Info</h1>
                    <div>
                        <h5 className="font-extrabold mb-2 md:mb-3" > User Info</h5>
                        <p className="font-light" > Name: {name}</p>
                        <p className="font-light" > Email: {email}</p>
                        <p className="font-light" >
                            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                        </p>
                    </div>
                    <div>
                        <h5 className="font-extrabold mb-2 md:mb-3" > Amount Info</h5>
                        <p className="font-light" > Subtotal: {subtotal}</p>
                        <p className="font-light" > Shipping Charges: {shippingCharges}</p>
                        <p className="font-light" > Tax: {tax}</p>
                        <p className="font-light" > Discount: {discount}</p>
                        <p className="font-light" > Total: {total}</p>
                    </div>
                    <div>

                        <h5 className="font-extrabold mb-2 md:mb-3" > Status Info </h5>
                        <p className="font-light" >
                            Status:{" "}
                            <span
                                className={status === "delivered" ? "text-purple-400" : status === "shipped" ? "text-green-400" : "text-red-400"}
                            >
                                {status}
                            </span>
                        </p>
                    </div>
                </article>
            }
        </section>
    );
};

export default OrderDetail;


