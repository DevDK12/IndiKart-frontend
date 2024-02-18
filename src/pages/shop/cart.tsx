import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { faker } from '@faker-js/faker'
import CartItemCard from "../../components/shop/CartItemCard";
import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";




const cartItems = [
    {
        _id: "1",
        name: "Product Second one",
        price: 100,
        stock: 10,
        photo: faker.image.url(),
        quantity: 1
    },
    {
        _id: "2",
        name: "Product third ba",
        price: 200,
        stock: 20,
        photo: faker.image.url(),
        quantity: 2
    },
    {
        _id: "3",
        name: "Product sucess",
        price: 300,
        stock: 30,
        photo: faker.image.url(),
        quantity: 3
    },
    {
        _id: "4",
        name: "Product 4",
        price: 400,
        stock: 40,
        photo: faker.image.url(),
        quantity: 4
    },
    {
        _id: "5",
        name: "Product 5",
        price: 500,
        stock: 50,
        photo: faker.image.url(),
        quantity: 5
    }

];






const Cart = () => {

    const subtotal = 100;
    const shippingCharges = 50;
    const tax = 30;
    const discount = 20;
    const total = subtotal + shippingCharges + tax - discount;
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (Math.random() > 0.5) setIsValidCouponCode(true);
            else setIsValidCouponCode(false);
        })

        return () => {
            clearTimeout(timer)
            setIsValidCouponCode(false)
        }
    }, [couponCode])


    return (
        <div className="cart h-full w-full flex flex-col gap-10 px-5 py-4 xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 xl:py-4
            md:flex-row
            ">

            <main className="flex flex-col gap-4 md:w-2/3 px-8 py-4 bg-primary-100 rounded-md overflow-y-auto hide-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((i, idx) => (
                        <CartItemCard
                            incrementHandler={() => { }}
                            decrementHandler={() => { }}
                            removeHandler={() => { }}
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
