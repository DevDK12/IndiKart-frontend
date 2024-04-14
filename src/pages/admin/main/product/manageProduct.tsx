
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { server, useDeleteProductMutation, useSingleProductQuery, useUpdateProductMutation } from "../../../../redux/api/productApi";
import { ErrorResponse, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "@ui/Input";








const ManageProduct = () => {

    const navigate = useNavigate();
    const {productId} = useParams<{productId: string}>();


    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const { data, isSuccess, isError, isLoading} = useSingleProductQuery(productId!);

    const {price, stock, name, photo} = data?.data?.product || {
        price: 0,
        stock: 0,
        name: '',
        photo: '',
    }

    const [productData, setProductData] = useState({
        price: 0,
        stock: 0,
        name: '',
        photo: '',
        category: '',
    })


    const [photoFile, setPhotoFile] = useState<File>();




    useEffect(()=>{
        if(isSuccess && data.data.product){
            setProductData(({
                ...data.data.product,
                photo: "",
            }));
        }
    }, [data, isSuccess]);




    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    // setPhotoUpdate(reader.result);
                    setProductData(state => ({
                        ...state,
                        photo: reader.result as string,
                    }));
                    setPhotoFile(file);
                }
            };
        }
    };


    const deleteProductHandler = async () => {
        try{
            const res = await deleteProduct(productId!);
            if('error' in res){
                throw new Error((res.error as ErrorResponse).data.message);
            }

            const { status, message } = res.data;
            if(status === 'success'){
                toast.success(message);
                navigate('/admin/product');
            }
        }
        catch(e){
            toast.error((e as Error).message);
        }
    }


    const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if(!productData.price || !productData.stock || !productData.name || !productData.category){
            toast.error("Please fill all fields");
            return;
        }


        const formData = new FormData();
        formData.append("price", String(productData.price));
        formData.append("stock", String(productData.stock));
        formData.append("name", productData.name);
        formData.append("category", productData.category);
        if (photoFile) {
            formData.append("photo", photoFile);
        }

        try{
            const res = await updateProduct({productId: productId!, formData});

            if('error' in res){
                throw new Error((res.error as ErrorResponse).data.message);
            }

            const { status, message } = res.data;
            if(status === 'success'){
                toast.success(message);
            }
        }
        catch(e){
            toast.error((e as Error).message);
        }


    };

    if(isError){
        return <Navigate to='/404' replace />;
    }

    return (
        <section className="main-section flex flex-col gap-4 justify-center mt-8 sm:flex-row">
            {isLoading && <p>Loading Product Details...</p>}
            {isSuccess && 
            <article className="main-container py-10 relative bg-primary-100 min-h-[40vh] overflow-y-auto flex flex-col gap-3  sm:min-h-[65vh] md:w-1/3 md:min-h-[85vh] sm:w-1/2 ">
                <strong className="font-semibold text-white/50">ID - {productId}</strong>
                <div className="h-5/6 bg-blue-400 rounded-md">
                    <img className="w-full h-full object-cover rounded-md" src={`${server}/${photo}`} alt="Product" />
                </div>
                <p className="mx-auto uppercase tracking-widest">{name}</p>
                {stock > 0 ? (
                    <span className="text-green-400 absolute top-2 right-5">{stock} Available</span>
                ) : (
                    <span className="text-red-400 absolute top-2 right-5"> Not Available</span>
                )}
                <h3 className="mx-auto font-extrabold text-2xl">₹{price}</h3>
            </article>
}
            
            {isSuccess && 
            <article className="main-container py-6 bg-primary-100 relative" >
                <button 
                    className="absolute text-red-500 top-4 right-4"
                    onClick={deleteProductHandler}
                >
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
                        value={productData.name}
                        onChange={(e) => setProductData(state => ({...state, name: e.target.value}))}
                    />

                    <Input
                        label="Price"
                        type="number"
                        placeholder="Price"
                        value={productData.price}
                        onChange={(e) => setProductData(state => ({...state, price: Number(e.target.value)}))}
                    />

                    <Input
                        label="Stock"
                        type="number"
                        placeholder="Stock"
                        value={productData.stock}
                        onChange={(e) => setProductData(state => ({...state, stock: Number(e.target.value)}))}
                    />

                    <Input
                        label="Category"
                        type="text"
                        placeholder="eg. laptop, camera etc"
                        value={productData.category}
                        onChange={(e) => setProductData(state => ({...state, category: e.target.value}))}
                    />

                    <Input
                        label="Photo"
                        type="file"
                        onChange={changeImageHandler}
                    />


                    {productData.photo && <img className="w-36 rounded-md mx-auto" src={productData.photo} alt="New Image" />}
                    <button className="bg-cyan-400 w-1/3 rounded-md font-semibold px-3 py-1 mx-auto" type="submit">Update</button>
                </form>
            </article>
}
        </section>
    );
};

export default ManageProduct;
