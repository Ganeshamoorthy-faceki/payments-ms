import { IUser } from '../interfaces/modelUser';
import { userRepository } from '../repository/UserRepository';



class UserService {

    public newUser = async (user: IUser) => {
        console.log(user)
        // const params = {
        //     id: uuid(),
        //     ...user
        // }
        const createNewUser = await userRepository.createUser(user)

        return createNewUser


    }

    public getUsers = async () => {

        const users:IUser[] = await userRepository.getUsers()

        return users
    }

    public getUserbyID = async (id: string) => {

        const user = await userRepository.getUser(id)

        return user
    }

    public updateUser = async (id: string,user:IUser) => {

        const userResponse:IUser = await userRepository.updateUser(id,user)

        return userResponse
    }
    public disableUser = async (id:string) => {
        const isDisabled= await userRepository.deleteUser(id)//disable rename variable
        return isDisabled
    }

}

export const userService = new UserService()

