import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/ui/Input"
import { FcGoogle } from "react-icons/fc";



const url = "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png";




const Signup = () => {


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email, password);
    };


    return (
        <div className="h-screen py-4 grid place-items-center
        px-8 md:px-20
        ">

            <main className="rounded-lg w-full  h-4/5 flex flex-col lg:flex-row xl:w-3/4">
                <aside className="login-cover rounded-t-lg lg:rounded-l-lg bg-top min-h-[200px] xs:bg-no-repeat xs:bg-[center_top_-6rem] sm:bg-[center_top_-8rem] md:bg-[center_top_-12rem] lg:bg-center flex-1 "></aside>

                <div className="grid place-items-center rounded-b-lg lg:rounded-r-lg flex-1 py-3 lg:py-10  bg-gray-200">
                    <form
                        onSubmit={submitHandler}
                        className="flex flex-col gap-2 sm:gap-4 lg:gap-4"
                    >
                        <div className="flex  justify-center items-center">
                            <img src={url} alt="logo" className="w-12 lg:w-16 2xl:w-20" />
                        </div>
                        <h1 className="title lg:text-3xl mb-7">Create New Account</h1>


                        <Input
                            type="text"
                            placeholder="John Doe"
                            label="Name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />

                        <Input
                            type="email"
                            placeholder="test@email.com"
                            label="Email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />

                        <Input
                            type="Password"
                            placeholder="password"
                            label="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />

                        <button className="bg-cyan-400 text-white font-semibold w-1/2 mx-auto py-2 mt-4 rounded-md" type="submit">Register</button>

                        <p className="mx-auto">OR</p>
                        <button className="mx-auto flex items-center gap-3 bg-blue-600 pr-3 text-white font-semibold rounded-md ">
                            <FcGoogle className="bg-white w-10 h-10 p-1 rounded-l-md" /> <span>Register with Google</span>
                        </button>

                    </form>
                </div>

            </main>

        </div>
    )
}
export default Signup