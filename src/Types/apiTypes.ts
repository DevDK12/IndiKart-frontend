import { TUser } from "./user-types"




//_ Response from server api 
export type MesssageResponse = {
    status: string,
    message: string,
}




export type UserResponse = {
    status: string, 
    data: {
        user: TUser
    }
}








