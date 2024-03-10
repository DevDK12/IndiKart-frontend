
export type TUser = {
    _id: string;
    name: string;
    email: string;
    image: string;
    gender: string;
    role: string;
    dob: string;
};

export interface IUserReducerInitialState {
    user: TUser | null;
    loading: boolean;
}

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





