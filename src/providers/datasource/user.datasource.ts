import { IUserDynamooseModel } from '../../models/Users'
import { IUser } from '../../interfaces/modelUser';


export interface IUserDataSource {
    createUser(user: IUser): Promise<IUser>;
    getUser(id: string): Promise<IUser>;
    getUsers(): Promise<IUser[]>;
    getPaginationUsers(id:string): Promise<IUser[]>;
    updateUser(id:string,user:IUser): Promise<IUser>;
    deleteUser(id:string): Promise<boolean>;
}


class UserDatasource implements IUserDataSource {
    public deleteUser= async (id: string): Promise<boolean> => {
        try {
              let userDisabled=false;
              const response=await IUserDynamooseModel.update({id},{status:"inactive"})
              if(response.id){
                  userDisabled=true;
              }
              return userDisabled;

        } catch (error) {
            throw Error(`Error on deleting User: ${JSON.stringify(error)}`);
        }
    }
    public updateUser= async (id: string,user: IUser): Promise<IUser> => {
        try {
            console.log(id,user);
            return await IUserDynamooseModel.update({id},user)  as IUser;

        } catch (error) {
            throw Error(`Error on updating User: ${JSON.stringify(error)}`);
        }
    }

    /**
     * 
     * 
     */
    public getUsers = async () => {
        try {
            this.getPaginationUsers("593d3f20-aeab-4153-82e9-70a717c358f6")
            const response = await IUserDynamooseModel.scan().limit(2).exec();
            console.log(`response::${JSON.stringify(response)}`)
            return response.toJSON() as IUser[];

        } catch (error) {
            throw Error(`Error on getting users: ${JSON.stringify(error)}`);
        }

    }

    /**
     * 
     * 
     */
     public getPaginationUsers = async (id:string) => {
        try {
            const response = await IUserDynamooseModel.scan().startAt({id}).limit(5).exec();
            console.log(`response::${JSON.stringify(response)}`)
            return response.toJSON() as IUser[];

        } catch (error) {
            throw Error(`Error on getting users: ${JSON.stringify(error)}`);
        }

    }


    /**
     * 
     * @param user
     */

    public createUser = async (user: IUser) => {

        try {
            return await IUserDynamooseModel.create(user, { overwrite: false, return: 'document' }) as IUser
        } catch (error) {
            throw Error(`Error on creating users: ${JSON.stringify(error)}`);
        }

    }

    /**
     * 
     * @param id
     */

    public getUser = async (id: string) => {
        console.log(id)
        try {
            const response = await IUserDynamooseModel.query({id}).limit(1)
                .exec();
            return response.toJSON()[0] as IUser;

        } catch (error) {
            throw Error(`Error on getting user: ${JSON.stringify(error)}`);
        }

    }

    /**
     * 
     * @param lastid
     */

    //  public getPaginationUsers = async (lastid?: string) => {
    //     console.log(lastid)
    //     try {
    //         if(lastid)
    //         const response = await IUserDynamooseModel.query().startAt(lastid).limit(10)
    //             .exec();
    //         return response.toJSON()[0] as IUser;

    //     } catch (error) {
    //         throw Error(`Error on getting user: ${JSON.stringify(error)}`);
    //     }

    // }

}

export const userDatasource: IUserDataSource = new UserDatasource()