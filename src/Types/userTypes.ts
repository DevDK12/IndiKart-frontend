


export interface ILoginUserApi {
    email: string,
    password: string,
}



export interface IRegisterUserApi extends ILoginUserApi {
    _id: string
    name: string,
    gender: string,
    image: string,
    dob: string,
}





