import ProductCard from "../../../../components/admin/ProductCart";
import { useDeleteOrderMutation, useOrderDetailQuery, useProcessOrderMutation } from "../../../../redux/api/orderApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { TOrder } from "../../../../Types/order-types";
import { server } from "../../../../redux/api/productApi";
import { FaTrash } from "react-icons/fa";







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


const ManageTransaction = () => {

    const { orderId } = useParams<{orderId: string}>();

    const navigate = useNavigate();

    const [processOrder, {isLoading: processLoading}] = useProcessOrderMutation();
    const [deleteOrder, {isLoading: deleteLoading}] = useDeleteOrderMutation();

    const {data, isLoading: orderIsLoading, isSuccess: orderIsSuccess, isError} = useOrderDetailQuery(orderId!);


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


    
    const updateHandler = async (): Promise<void> => {

        //_ Use Optimistic Updates here to update the status of the order
        //* Implement later
        try{
            const res = await processOrder(orderId!);

            if('error' in res) throw new Error((res.error as Error).message);

            if(res.data.status === "success"){
                toast.success(res.data.message);
            }
        }
        catch(err){
            toast.error((err as Error).message);
        }
    };


    const deleteHandler = async (): Promise<void> => {

        //_ Use Optimistic Updates here to update the status of the order
        //* Implement later
        try{
            const res = await deleteOrder(orderId!);

            if('error' in res) throw new Error((res.error as Error).message);

            if(res.data.status === "success"){
                toast.success(res.data.message);
                navigate("/admin/transaction");
            }
        }
        catch(err){
            toast.error((err as Error).message);
        }
    };


    if(isError){
        return <Navigate to='/404' replace />;
    }


    //_ Each orderItem was designed to have ._id property but its not defined currently , check later
    return (
        <section className="main-section flex flex-col gap-4 justify-center mt-8 sm:flex-row">
            {deleteLoading && <h1>Deleting Order...</h1>}
            {!deleteLoading && orderIsLoading && <h1>Loading Order Details...</h1>}
            {!deleteLoading && orderIsSuccess && orderItems.length > 0 &&
                <article className="main-container py-10 lg:px-8 relative bg-primary-100 min-h-[40vh] overflow-y-auto flex flex-col gap-3  sm:min-h-[65vh] md:w-1/3 md:min-h-[85vh] sm:w-1/2 ">
                    <h2 className="title">Order Items</h2>
                    {orderItems.map(i => (
                        <ProductCard
                            key={i.productId}
                            name={i.name}
                            photo={`${server}/${i.photo}`}
                            // productId={i.productId}
                            _id={i.productId}
                            quantity={i.quantity}
                            price={i.price}
                        />
                    ))}
                </article>
            }

            {!deleteLoading && orderIsSuccess && orderItems.length > 0 &&
                <article className="main-container py-10 lg:px-8 bg-primary-100 flex flex-col gap-6 md:gap-8 relative" >
                    <button 
                        onClick={deleteHandler}
                    >
                        <FaTrash className="text-red-400 h-20 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                    </button>
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
                    {
                        status !== 'delivered' &&
                    <button className="bg-cyan-400  rounded-md font-semibold px-3 py-1 mx-auto" onClick={updateHandler}>
                        {
                            processLoading ? "Processing..." : "Process Status"
                        }
                    </button>
                    }
                </article>
            }
        </section>
    );
};

export default ManageTransaction;


