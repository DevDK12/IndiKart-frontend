import { Link } from "react-router-dom";
import { OrderItemType } from "../../types";


const ProductCard = ({
    name,
    photo,
    price,
    quantity,
}: OrderItemType) => (
    <div className="transaction-product-card grid grid-cols-5 grid-rows-2 gap-2 px-2 py-3 shadow-md">
        <div className="w-full col-start-1 col-span-2 row-span-2 grid place-items-center">
            <img className="w-[60px] rounded-md" src={photo} alt={name} />
        </div>
        <Link className="row-start-1 col-start-3 col-span-full text-xs sm:text-sm md:text-base" to={`/product/:productId`}>{name}</Link>
        <span className="row-start-2 col-start-3 col-span-full text-xs sm:text-sm md:text-base">
            ₹{price} X {quantity} = ₹{price * quantity}
        </span>
    </div>
);

export default ProductCard;