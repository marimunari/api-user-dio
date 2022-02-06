import { Request } from 'express';
import { getConnection } from 'typeorm';
import createConnection from '../database';
import { CreateUserController } from './CreateUserController';
import { makeMockResponse } from '../utils/mocks/mockResponse';

describe('CreateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM user');
        await connection.close();
    });
    
    const createUserController = new CreateUserController();

    const response = makeMockResponse();

    it('Deve retornar status 201 quando o usuário for criado', async () => {
        const request = {
            body: {
                name: 'Teste',
                email: 'teste@teste.com'
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
    });

    it('Deve retornar status 201 quando e-mail não for informado', async () => {
        const request = {
            body: {
                name: 'Teste',
                email: ''
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
    });

    it('Deve retornar status 400 quando o nome não for informado', async () => {
        const request = {
            body: {
                name: '',
                email: 'teste@teste.com'
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(400);
    });
});