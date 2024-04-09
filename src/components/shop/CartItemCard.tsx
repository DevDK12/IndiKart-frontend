import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { TCartItem } from "../../Types/cart-types";
import { server } from "../../redux/api/productApi";




type CartItemProps = {
    cartItem: TCartItem;
    incrementHandler: (cartItem: TCartItem) => void;
    decrementHandler: (cartItem: TCartItem) => void;
    removeHandler: (productId: string) => void;
};

const CartItemCard = ({
    cartItem,
    incrementHandler,
    decrementHandler,
    removeHandler,
}: CartItemProps) => {


    const { photo, productId, name, price, quantity } = cartItem;

    return (
        <div className="bg-primary-200 grid lg:gap-4 grid-cols-5 grid-rows-2 lg:grid-cols-9 rounded-md">
            <img className="rounded-l-md w-36 h-36  col-span-2 row-span-2 " src={`${server}/${photo}`} alt={name} />

            <article className="col-start-3 col-span-3 lg:col-span-5 lg:row-span-2 flex flex-col lg:gap-4 justify-center">
                <Link className="text-xl xs:text-2xl font-thin" to={`/product/${productId}`}>{name}</Link>
                <span className="xs:text-xl font-bold">₹{price}</span>
            </article>

            <div className="md:text-xl col-span-2 lg:col-span-1  lg:row-span-2 place-self-center flex gap-5">
                <button className="bg-primary-100 px-3 hover:opacity-70 rounded-md" onClick={() => decrementHandler(cartItem)}>-</button>
                <p>{quantity}</p>
                <button className="bg-primary-100 px-3 hover:opacity-70 rounded-md" onClick={() => incrementHandler(cartItem)}>+</button>
            </div>

            <button className="text-red-500 lg:text-xl lg:row-span-2  place-self-center" onClick={() => removeHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItemCard;
