import { FaPlus } from "react-icons/fa"


interface ProductCardProps {
    productId?: string,
    photo: string,
    name: string,
    price: number,
    stock?: number,
    handler: () => void
}



const server = import.meta.env.VITE_SERVER


const ProductCard = ({ photo, name, price, handler }: ProductCardProps) => {

    const photoUrl =  photo.includes('http') ? photo : `${server}/${photo}`;

    return (
        <div className="rounded-md min-h-[300px] w-[200px] relative flex flex-col gap-4 pb-4 group cursor-pointer bg-primary-100 
            hover:opacity-45 hover:scale-105 transition-all ease-in duration-300">
            <img
                className="h-[170px] rounded-t-md w-full object-cover"
                src={photoUrl}
                alt={name}
            />


            <div className="px-4 flex flex-col items-center gap-2">
                <p>{name}</p>
                <span>₹{price}</span>
            </div>

            <button
                className="bg-cyan-600 w-8 h-8 hidden place-items-center rounded-full group-hover:grid transition-all duration-500 hover:rotate-180  absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onClick={() =>
                    handler()
                }
            >
                <FaPlus />
            </button>
        </div>
    )
}
export default ProductCard