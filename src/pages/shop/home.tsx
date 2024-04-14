import { useMemo } from "react";
import toast from "react-hot-toast";
import { ErrorResponse, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


import { useLatestProductsQuery } from '@api/productApi';
import Products from "@components/shop/Products";





const Home = () => {

    const isMd = useMediaQuery({ query: '(max-width: 768px' });
    const isLg = useMediaQuery({ query: '(max-width: 1024px' });
    const isXl = useMediaQuery({ query: '(max-width: 1280px' });


    const productsPerPage = useMemo(() => {
        if (isMd) return 4;
        else if (isLg || isXl) return 3;
        else return 4;
    }, [isMd, isLg, isXl]);

    const { data, isError, isLoading, isSuccess, error } = useLatestProductsQuery({ productsPerPage });


    if (isError) {
        const err = error as ErrorResponse;
        toast.error(err?.data?.message || 'No response from server');
    }
    
    
    let products;
    if (isLoading) {
        products = <p>Loading...</p>
    }

    if (isSuccess && data?.data?.products.length === 0) {
        products = <p>Empty</p>
    }
    else if (isSuccess) {
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
