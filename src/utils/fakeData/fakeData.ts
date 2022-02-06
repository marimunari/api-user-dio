import { CreateUserService } from '../../services/CreateUserService';
import { v4 as uuid } from 'uuid';

class FakeData
{
    createUserService = new CreateUserService();

    async execute() {
        await this.createUserService.execute({
            id: uuid(),
            name: 'Teste',
            email: 'teste@teste.com'
        });
    
        await this.createUserService.execute({
            id: uuid(),
            name: 'Teste2',
            email: ''
        });
    }

    async createUser() {
        const user = await this.createUserService.execute({
            id: uuid(),
            name: 'Usuario',
            email: 'usuario@teste.com'
        });

        return user;
    }
}

export { FakeData }