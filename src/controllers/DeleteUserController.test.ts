import createConnection from '../database';
import { getConnection } from "typeorm";
import { makeMockResponse } from '../utils/mocks/mockResponse';
import { makeMockRequest } from '../utils/mocks/mockRequest';
import { DeleteUserController } from './DeleteUserController';
import { FakeData } from "../utils/fakeData/fakeData";

describe('DeleteUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await getConnection();
        await connection.close();
    });

    const fakeData = new FakeData();

    it('Deve retornar status 204 quando o usuário for deletado', async () => {
        const mockUser = await fakeData.createUser();

        const deleteUserController = new DeleteUserController();

        const request = makeMockRequest({
            params: {
                id: mockUser.id
            }
        });

        const response = makeMockResponse();

        await deleteUserController.handle(request, response);

        expect(response.state.status).toBe(204);
    });

    it('Deve retornar status 400 quando o id não for definido na rota', async () => {
        const mockUser = await fakeData.createUser();

        const deleteUserController = new DeleteUserController();

        const request = makeMockRequest({
            params: {
                id: undefined
            }
        });

        const response = makeMockResponse();

        await deleteUserController.handle(request, response);

        expect(response.state.status).toBe(400);
    });
});