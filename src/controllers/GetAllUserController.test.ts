import { getConnection } from "typeorm";
import createConnection from "../database";
import { makeMockRequest } from "../utils/mocks/mockRequest";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { GetAllUserController } from "./GetAllUserController";
import { FakeData } from '../utils/fakeData/fakeData';

describe('GetAllUserController', () => {
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

    it('Deve retornar status 200 quando pegar todos os usuários', async () => {
        await fakeData.execute();

        const getAllUserController = new GetAllUserController();

        const request = makeMockRequest({});

        const response = makeMockResponse();

        await getAllUserController.handle(request, response);

        expect(response.state.status).toBe(200);
    });
});
