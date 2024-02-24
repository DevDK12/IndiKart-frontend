import { faker } from "@faker-js/faker"


export type ProductType = {
    _id: string,
    name: string,
    price: number,
    stock: number,
    photo: string

}




export type DataType = {
    products: ProductType[]
}



export const data: DataType = {
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
        // {
        //     _id: "6",
        //     name: "Product 6",
        //     price: 600,
        //     stock: 60,
        //     photo: faker.image.url()
        // },
        // {
        //     _id: "7",
        //     name: "Product 7",
        //     price: 700,
        //     stock: 70,
        //     photo: faker.image.url()
        // },
        // {
        //     _id: "8",
        //     name: "Product 8",
        //     price: 800,
        //     stock: 80,
        //     photo: faker.image.url()
        // },
        // {
        //     _id: "9",
        //     name: "Product 9",
        //     price: 900,
        //     stock: 90,
        //     photo: faker.image.url()
        // },
        // {
        //     _id: "10",
        //     name: "Product 10",
        //     price: 1000,
        //     stock: 100,
        //     photo: faker.image.url()
        // }
    ]
}

