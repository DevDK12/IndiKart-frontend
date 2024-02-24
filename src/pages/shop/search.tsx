import Input from "../../components/ui/Input"

import { data } from "../../utils/Shop_products";
import Products from "../../components/shop/Products";
import { useState } from "react";





const Search = () => {

    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<number>(100000);
    const [category, setCategory] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const isPrevPage = page <= 1;
    const isNextPage = page >= 4;




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
                        <option value="mac">Mac</option>
                        <option value="windows">Windows</option>
                    </select>
                </div>
            </aside>
            <main className="bg-primary-100 text-primary-txt rounded-md px-10 py-4 w-full h-full flex flex-col gap-6 relative">
                <h1 className="title lg:text-4xl">Products</h1>
                <Input
                    variant="SEARCH"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search By Name"
                    value={search}
                />

                <Products
                    products={data.products}
                />
                <article className="mx-auto flex gap-4 items-center absolute bottom-5 left-1/2 -translate-x-1/2">
                    <button
                        className="bg-primary-300 px-2 py-1 rounded disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={() => { setPage(page => page - 1) }}
                        disabled={isPrevPage}
                    >
                        Prev
                    </button>
                    <span>{page} of 4</span>
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