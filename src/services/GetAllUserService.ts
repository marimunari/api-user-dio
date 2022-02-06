import { getRepository } from 'typeorm';
import { User } from '../entities/User';

class GetAllUserService
{
    async execute() {
        const users = await getRepository(User)
            .createQueryBuilder('user')
            .select()
            .getMany();

        return users;
    }
}

export { GetAllUserService }