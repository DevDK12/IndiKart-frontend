
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../../../components/ui/Input";
import { useCreateProductMutation } from "../../../../redux/api/productApi";
import { useSelector } from "react-redux";
import { IUserReducerInitialState } from "../../../../Types/user-types";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";



const NewProduct = () => {

    const { user } = useSelector((state: { userSlice: IUserReducerInitialState }) => state.userSlice);

    const navigate = useNavigate();

    const [createProduct] = useCreateProductMutation();


    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
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


    const submitHandler = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!name || !category || !price || !stock || !photo)    return;

        const formData = new FormData();
        formData.append('user', user?._id as string);
        formData.append("name", name);
        formData.append("price", String(price));
        formData.append("stock", String(stock));
        formData.append("category", category);
        if(photo) formData.append("photo", photo);

        try{
            const res = await createProduct(formData);


            if('error' in res){
                const error = res.error as FetchBaseQueryError | SerializedError;
                throw new Error(error.data.message);
            }

            const { status, message } = res.data;
            if (status === 'success') {
                toast.success(message);
                navigate('/admin/product');
            }
        }
        catch(err ){
            toast.error(err.message || 'Error creating product');
        }

    }



    return (
        <>
            <article className="main-section flex justify-center mt-8 " >
                <form
                    className="main-container  bg-primary-100 flex flex-col gap-3
                    sm:w-2/3 sm:gap-4 md:w-3/5 md:gap-6 lg:w-7/12 xl:w-5/12"
                    onSubmit={submitHandler}
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
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <Input
                        label="Stock"
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
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
