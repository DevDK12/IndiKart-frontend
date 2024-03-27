import ProductCard from "./ProductCard"

import { ProductType } from "../../utils/Shop_products";




interface ProductsProps {
    products: ProductType[],
}

const Products = ({ products }: ProductsProps) => {
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
                        handler={() => { }}
                        photo={i.photo}
                    />
                ))
            }
        </main>
    )
}
export default Products