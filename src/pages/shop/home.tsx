import { Link } from "react-router-dom";
import { faker } from '@faker-js/faker'

import ProductCard from "../../components/shop/ProductCard";




type ProductType = {
    _id: string,
    name: string,
    price: number,
    stock: number,
    photo: string

}




type DataType = {
    products: ProductType[]
}



const data: DataType = {
    products: [
        {
            _id: "1",
            name: "Product 1",
            price: 100,
            stock: 10,
            photo: faker.image.url()
        },
        {
            _id: "2",
            name: "Product 2",
            price: 200,
            stock: 20,
            photo: faker.image.url()
        },
        {
            _id: "3",
            name: "Product 3",
            price: 300,
            stock: 30,
            photo: faker.image.url()
        },
        {
            _id: "4",
            name: "Product 4",
            price: 400,
            stock: 40,
            photo: faker.image.url()
        },
        {
            _id: "5",
            name: "Product 5",
            price: 500,
            stock: 50,
            photo: faker.image.url()
        },
        {
            _id: "6",
            name: "Product 6",
            price: 600,
            stock: 60,
            photo: faker.image.url()
        },
        {
            _id: "7",
            name: "Product 7",
            price: 700,
            stock: 70,
            photo: faker.image.url()
        },
        {
            _id: "8",
            name: "Product 8",
            price: 800,
            stock: 80,
            photo: faker.image.url()
        },
        {
            _id: "9",
            name: "Product 9",
            price: 900,
            stock: 90,
            photo: faker.image.url()
        },
        {
            _id: "10",
            name: "Product 10",
            price: 1000,
            stock: 100,
            photo: faker.image.url()
        }
    ]
}





const Home = () => {



    const addToCartHandler = () => {
    };


    return (
        <div className="flex flex-col gap-24 overflow-auto hide-scrollbar h-full w-full px-5 py-4 
            xs:px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 xl:py-4" 
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

                <main className="grid place-items-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {
                        data?.products.map((i) => (
                            <ProductCard
                                key={i._id}
                                productId={i._id}
                                name={i.name}
                                price={i.price}
                                stock={i.stock}
                                handler={addToCartHandler}
                                photo={i.photo}
                            />
                        ))
                    }
                </main>
            </section>
        </div>
    );
};

export default Home;
