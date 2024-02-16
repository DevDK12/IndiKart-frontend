
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../../../components/ui/Input";
import { FaTrash } from "react-icons/fa";





const img = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";




const ManageProduct = () => {

    const price =  2000;
    const stock =  10;
    const name =  "PumaShoes";
    const photo =  img;
    const category =  "footwear";

    const [priceUpdate, setPriceUpdate] = useState<number>(price);
    const [stockUpdate, setStockUpdate] = useState<number>(stock);
    const [nameUpdate, setNameUpdate] = useState<string>(name);
    const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
    const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
    const [photoFile, setPhotoFile] = useState<File>();



    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoUpdate(reader.result);
                    setPhotoFile(file);
                }
            };
        }
    };


    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setNameUpdate(nameUpdate);
        setPriceUpdate(priceUpdate);
        setStockUpdate(stockUpdate);
        setPhotoUpdate(photoUpdate);
    };


    return (
        <section className="main-section flex flex-col gap-4 justify-center mt-8 sm:flex-row">
            <article className="main-container py-10 relative bg-primary-100 min-h-[40vh] overflow-y-auto flex flex-col gap-3  sm:min-h-[65vh] md:w-1/3 md:min-h-[85vh] sm:w-1/2 ">
                <strong className="font-semibold text-white/50">ID - fsdfsfsggfgdf</strong>
                <div className="h-5/6 bg-blue-400 rounded-md">
                    <img className="w-full h-full object-cover rounded-md" src={photo} alt="Product" />
                </div>
                <p className="mx-auto uppercase tracking-widest">{name}</p>
                {stock > 0 ? (
                    <span className="text-green-400 absolute top-2 right-5">{stock} Available</span>
                ) : (
                    <span className="text-red-400 absolute top-2 right-5"> Not Available</span>
                )}
                <h3 className="mx-auto font-extrabold text-2xl">₹{price}</h3>
            </article>


            <article className="main-container py-6 bg-primary-100 relative" >
                <button className="absolute text-red-500 top-4 right-4">
                    <FaTrash />
                </button>
                <form onSubmit={submitHandler}
                    className="flex flex-col gap-3 w-full"
                >
                    <h2 className="title" >Manage Product</h2>

                    <Input
                        label="Name"
                        type="text"
                        placeholder="Name"
                        value={nameUpdate}
                        onChange={(e) => setNameUpdate(e.target.value)}
                    />

                    <Input
                        label="Price"
                        type="number"
                        placeholder="Price"
                        value={priceUpdate}
                        onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    />

                    <Input
                        label="Stock"
                        type="number"
                        placeholder="Stock"
                        value={stockUpdate}
                        onChange={(e) => setStockUpdate(Number(e.target.value))}
                    />

                    <Input
                        label="Category"
                        type="text"
                        placeholder="eg. laptop, camera etc"
                        value={categoryUpdate}
                        onChange={(e) => setCategoryUpdate(e.target.value)}
                    />

                    <Input
                        label="Photo"
                        type="file"
                        onChange={changeImageHandler}
                    />


                    {photoUpdate && <img className="w-36 rounded-md mx-auto" src={photoUpdate} alt="New Image" />}
                    <button className="bg-cyan-400 w-1/3 rounded-md font-semibold px-3 py-1 mx-auto" type="submit">Update</button>
                </form>
            </article>
        </section>
    );
};

export default ManageProduct;
