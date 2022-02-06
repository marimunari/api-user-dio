import { getRepository } from 'typeorm';
import { User } from '../entities/User';

interface IUser {
    id: string,
    name: string,
    email?: string
}

class CreateUserService 
{
    async execute({ id, name, email }: IUser) {
        const user = await getRepository(User)
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    id: id,
                    name: name,
                    email: email
                }
            ])
            .execute();

            return user.identifiers[0];
    }
}

export { CreateUserService }