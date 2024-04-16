import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import toast from "react-hot-toast";


import Input from "@ui/Input"
import Products from "@components/shop/Products";
import { useCategoriesQuery, useSearchProductsQuery } from "@api/productApi";
import { ErrorResponse } from "@/Types/apiTypes";




const Search = () => {

    const isMd = useMediaQuery({ query: '(max-width: 768px' });
    const isLg = useMediaQuery({ query: '(max-width: 1024px' });
    const isXl = useMediaQuery({ query: '(max-width: 1280px' });
    const is2Xl = useMediaQuery({ query: '(max-width: 1536px' });


    const productsPerPage = useMemo(() => {
        if (isMd) return 4;
        else if (isLg) return 6;
        else if (isXl) return 3;
        else if (is2Xl) return 4;
        else return 4;
    }, [isMd, isLg, isXl, is2Xl]);


    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<number>(100000);
    const [category, setCategory] = useState<string>('');
    const [page, setPage] = useState<number>(1);





    const { data: categoriesData, isSuccess: categorySuccess, isError: isCategoryError, error: categoryError } = useCategoriesQuery();

    
    useEffect(()=>{
        if (isCategoryError) {
            const err = categoryError as ErrorResponse;
            toast.error(err?.data?.message || 'No response from server');
        }
    },[isCategoryError, categoryError]);


    const { data: productsData, isLoading: productsLoading, isSuccess: productSuccess, isError: isProductsError, error: productsError } = useSearchProductsQuery({
        category,
        page,
        price: maxPrice,
        search,
        sort,
        productsPerPage,
    });
    let totalPage = 1;

    
    useEffect(()=>{
        if (isProductsError) {
            const err = productsError as ErrorResponse;
            toast.error(err?.data?.message || 'No response from server');
        }
    },[isProductsError, productsError]);


    let content: JSX.Element | null = null;
    if (productsLoading) {
        content = <h1>Loading Products...</h1>
    }

    if (productSuccess && productsData.data?.products.length === 0) {
        content = <h1>No Products Found</h1>
    }

    if (productSuccess && productsData?.data.products) {
        totalPage = productsData?.data.totalPage;
        content = <Products
            products={productsData?.data.products}
        />
    }

    const isPrevPage = page <= 1;
    const isNextPage = page >= totalPage;



    return (
        <div className="w-full h-full px-6 py-4 flex flex-col gap-4 lg:flex-row
        ">
            <aside className="bg-primary-100 text-primary-txt rounded-md w-full flex flex-col gap-4 px-3 py-4 lg:w-1/3">
                <h5 className="subtitle">Filters</h5>
                <div className="flex flex-col gap-1 px-4">
                    <label>Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="text-black bg-white rounded-md p-1 focus:outline-none focus:border-cyan-400 border-2 border-gray-400 "
                    >
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>
                <div className="flex flex-col px-4">
                    <label>Max Price (100000)</label>
                    <input
                        type="range"
                        min={100}
                        max={100000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
                <div className="flex flex-col px-4">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="text-black bg-white rounded-md p-1 focus:outline-none focus:border-cyan-400 border-2 border-gray-400 "
                    >
                        <option value="">ALL</option>
                        {categorySuccess && categoriesData?.data.categories.map((i, index) => (
                            <option key={index} value={i}>{i.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </aside>
            <main className="bg-primary-200 text-primary-txt rounded-md px-10 py-4 w-full flex flex-col gap-6 relative">
                <h1 className="title lg:text-4xl">Products</h1>
                <Input
                    variant="SEARCH"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search By Name"
                    value={search}
                />


                {content}


                <article className="w-[200px] flex gap-4 items-center justify-evenly absolute bottom-5 left-1/2 -translate-x-1/2 ">
                    <button
                        className="bg-primary-300 px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={() => { setPage(page => page - 1) }}
                        disabled={isPrevPage}
                    >
                        Prev
                    </button>
                    <span>{page} of {totalPage}</span>
                    <button
                        className="bg-primary-300 px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={() => { setPage(page => page + 1) }}
                        disabled={isNextPage}
                    >
                        Next
                    </button>
                </article>
            </main>
        </div>
    )
}
export default Search