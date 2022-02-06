import createConnection from "../database";
import { getConnection } from "typeorm";
import { Request } from "express";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { UpdateUserController } from "./UpdateUserController";
import { FakeData } from "../utils/fakeData/fakeData";

describe('UpdateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await getConnection();
        await connection.query('DELETE FROM user');
        await connection.close();
    });

    const fakeData = new FakeData();

    it('Deve retornar o status 204 quando o usuário for editado', async () => {
        const mockUser = await fakeData.createUser();

        const updateUserController = new UpdateUserController();

        const request = {
            body: {
                id: mockUser.id,
                name: 'Novo nome',
                email: 'email@email.com'
            }
        } as Request;

        const response = makeMockResponse();

        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(204);
    });

    it('Deve retornar status 400 quando o id não for informado', async () => {
        const mockUser = await fakeData.createUser();

        const updateUserController = new UpdateUserController();

        const request = {
            body: {
                id: '',
                name: 'Novo nome',
                email: 'email@email.com'
            }
        } as Request;

        const response = makeMockResponse();

        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(400);
    });

    it('Deve retornar status 400 quando o nome não for informado', async () => {
        const mockUser = await fakeData.createUser();

        const updateUserController = new UpdateUserController();
        
        const request = {
            body: {
                id: mockUser.id,
                name: '',
                email: 'email@email.com'
            }
        } as Request;

        const response = makeMockResponse();

        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(400);
    });
});