
import { useState } from "react";
import { OrderItemType } from "../../../../Types/types";
import ProductCard from "../../../../components/admin/ProductCart";





const img = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";


const orderItems: OrderItemType[] = [
    {
        name: "Puma Shoes",
        photo: img,
        _id: "asdsaasdas",
        quantity: 4,
        price: 2000,
    },
];






const ManageTransaction = () => {

    const [order, setOrder] = useState({
        name: "Puma Shoes",
        address: "77 black street",
        city: "Neyword",
        state: "Nevada",
        country: "US",
        pinCode: 242433,
        status: "Processing",
        subtotal: 4000,
        discount: 1200,
        shippingCharges: 0,
        tax: 200,
        total: 4000 + 200 + 0 - 1200,
        orderItems,
    });

    const {
        name,
        address,
        city,
        country,
        state,
        pinCode,
        subtotal,
        shippingCharges,
        tax,
        discount,
        total,
        status,
    } = order;


    const updateHandler = (): void => {
        setOrder((prev) => ({
            ...prev,
            status: "Shipped",
        }));
    };


    return (
        <section className="main-section flex flex-col gap-4 justify-center mt-8 sm:flex-row">
            <article className="main-container py-10 lg:px-8 relative bg-primary-100 min-h-[40vh] overflow-y-auto flex flex-col gap-3  sm:min-h-[65vh] md:w-1/3 md:min-h-[85vh] sm:w-1/2 ">
                <h2 className="title">Order Items</h2>

                {orderItems.map((i) => (
                    <ProductCard
                        key={i._id}
                        name={i.name}
                        photo={img}
                        // productId={i.productId}
                        _id={i._id}
                        quantity={i.quantity}
                        price={i.price}
                    />
                ))}
            </article>


            <article className="main-container py-10 lg:px-8 bg-primary-100 flex flex-col gap-6 md:gap-8" >
                <h1 className="title"> Order Info</h1>
                <div>
                    <h5 className="font-extrabold mb-2 md:mb-3" > User Info</h5>
                    <p className="font-light" > Name: {name}</p>
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
                            className={status === "Delivered" ? "text-purple-400" : status === "Shipped" ? "text-green-400" : "text-red-400"}
                        >
                            {status}
                        </span>
                    </p>
                </div>
                <button className="bg-cyan-400  rounded-md font-semibold px-3 py-1 mx-auto" onClick={updateHandler}>
                    Process Status
                </button>
            </article>
        </section>
    );
};

export default ManageTransaction;


