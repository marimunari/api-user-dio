import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController
{
    async handle(request: Request, response: Response) {
        const createUserService = new CreateUserService();

        const id = uuid();
        const name = request.body.name;
        const email = request.body.email;

        if(name.length === 0) {
            return response.status(400).json({
                message: 'Nome é obrigatório!'
            })
        }

        const user = await createUserService.execute({id, name, email});
        
        return response.status(201).json(user)
    }
}

export { CreateUserController }