import ProductCard from "./ProductCard"

import { ProductType } from "../../utils/Shop_products";




interface ProductsProps {
    products: ProductType[],
}

const Products = ({products} : ProductsProps) => {
    return (

        <main className="grid place-items-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {
            products?.map((i) => (
                <ProductCard
                    key={i._id}
                    // productId={i._id}
                    name={i.name}
                    price={i.price}
                    // stock={i.stock}
                    handler={()=>{}}
                    photo={i.photo}
                />
            ))
        }
    </main>
    )
}
export default Products