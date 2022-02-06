import { getRepository } from 'typeorm';
import { User } from '../entities/User';

interface IUser {
    id: string;
}

class DeleteUserService
{
    async execute({ id }: IUser) {
        const user = await getRepository(User)
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id })
            .execute();

            return user.raw;
    }
}

export { DeleteUserService }