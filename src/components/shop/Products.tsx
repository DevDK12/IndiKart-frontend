import ProductCard from "./ProductCard"

import { ProductType } from "../../utils/Shop_products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cart-slice";
import { TCartItem } from "../../Types/cart-types";
import toast from "react-hot-toast";




interface ProductsProps {
    products: ProductType[],
}

const Products = ({ products }: ProductsProps) => {

    const dispatch = useDispatch();
    
    const addToCartHandler = (cartItem: TCartItem) => {
        if(cartItem.stock < 1) {
            toast.error(`${cartItem.name} Out of stock`);
            return;
        }
        dispatch(addToCart(cartItem));
        toast.success(`Added ${cartItem.name} to cart`);
    }
    
    return (
        <main className="grid  place-items-center gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:gap-4 mb-20 ">
            {
                products?.map((i) => (
                    <ProductCard
                        key={i._id}
                        // productId={i._id}
                        name={i.name}
                        price={i.price}
                        // stock={i.stock}
                        handler={() => addToCartHandler({
                            productId: i._id,
                            name: i.name,
                            price: i.price,
                            photo: i.photo,
                            stock: i.stock,
                            quantity: 1,
                        })}
                        photo={i.photo}
                    />
                ))
            }
        </main>
    )
}
export default Products