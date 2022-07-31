export interface IUser {
    id?:string,
    companyId?:string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email?: string,
    profilePic?: string,
    phoneNumber?: string,
    city?:string,
    state?:string,
    country?:string,
    timezone?: string,
    status?: "active"| "inactive",
    isPhoneVerified?: boolean,
    isEmailVerified?: boolean,


}