import { ErrorResponse, Link } from "react-router-dom";
import { useLatestProductsQuery } from '../../redux/api/productApi';
import Products from "../../components/shop/Products";
import toast from "react-hot-toast";





const Home = () => {

    const { data, isError, isLoading, isSuccess, error } = useLatestProductsQuery();


    let products;
    if (isError) {
        const err = error as ErrorResponse;
        toast.error(err?.data?.message || 'No response from server');
    }
    if (isLoading) {
        products = <p>Loading...</p>
    }
    if (isSuccess && data?.data?.products.length === 0) {
        products = <p>Empty</p>
    }
    if (isSuccess) {
        const { data: { products: latestProducts } } = data;
        products = <Products products={latestProducts} />
    }



    return (
        <div className="flex flex-col gap-24 overflow-auto hide-scrollbar h-full w-full 
            px-5 py-4 xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 xl:py-4"
        >
            <section className="w-full h-[18.75rem">
                <div className="cover-image h-[18.75rem] rounded-md"></div>
            </section>

            <section className="px-4 py-2 flex flex-col gap-12">
                <div className="flex justify-between items-baseline">
                    <h1 className="title lg:text-4xl lg:tracking-wide lg:font-normal">Latest Products</h1>
                    <Link to="/search" className="subtitle lg:text-lg underline">
                        More
                    </Link>
                </div>
                {products}
            </section>
        </div>
    );
};

export default Home;
