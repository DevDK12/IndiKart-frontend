
import { ChangeEvent, useState } from "react";
import Input from "../../../../components/ui/Input";




const NewProduct = () => {


    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number>(1000);
    const [stock, setStock] = useState<number>(1);
    const [photoPrev, setPhotoPrev] = useState<string>("");
    const [photo, setPhoto] = useState<File>();



    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            };
        }
    };



    return (
        <>
            <article className="main-section flex justify-center mt-8 " >
                <form
                    className="main-container  bg-primary-100 flex flex-col gap-3
                    sm:w-2/3 sm:gap-4 md:w-3/5 md:gap-6 lg:w-7/12 xl:w-5/12"
                >
                    <h2 className="title" >New Product</h2>

                    <Input
                        label="Name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="Price"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <Input
                        label="Stock"
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />

                    <Input
                        label="Category"
                        type="text"
                        placeholder="eg. laptop, camera etc"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <Input
                        label="Photo"
                        type="file"
                        onChange={changeImageHandler}
                    />


                    {photoPrev && <img className="w-36 rounded-md mx-auto" src={photoPrev} alt="New Image" />}
                    <button className="bg-cyan-400 w-1/3 rounded-md font-semibold px-3 py-1 mx-auto" type="submit">Create</button>
                </form>
            </article>
        </>
    );
};

export default NewProduct;
