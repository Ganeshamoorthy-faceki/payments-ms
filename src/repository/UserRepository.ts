import { IUser } from '../interfaces/modelUser';
import { userDatasource } from '../providers/datasource/user.datasource'

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>
    getUser(id: string):Promise<IUser>
    getUsers():Promise<IUser[]>
    updateUser(id:string,user:IUser):Promise<IUser>
    deleteUser(id: string):Promise<boolean>

}

class UserRepository implements IUserRepository {
    public updateUser = (id: string, user: IUser): Promise<IUser> => userDatasource.updateUser(id,user);
    public deleteUser = (id: string): Promise<boolean> => userDatasource.deleteUser(id);

    public createUser = (user: IUser) => userDatasource.createUser(user);
    public getUser = (id: string) => userDatasource.getUser(id);
    public getUsers = () => userDatasource.getUsers();

}

export const userRepository: IUserRepository = new UserRepository();