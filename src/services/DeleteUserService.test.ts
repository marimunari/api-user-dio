import createConnection from '../database';
import { getConnection } from "typeorm";
import { DeleteUserService } from "./DeleteUserService";
import { FakeData } from "../utils/fakeData/fakeData";

describe('DeleteUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await getConnection();
        await connection.close();
    });

    const fakeData = new FakeData();

    it('Deve retornar um array vazio quando o usuário for deletado', async () => {
        const mockUser = await fakeData.createUser();

        const deleteUserService = new DeleteUserService();

        const result = await deleteUserService.execute({ 
            id: mockUser.id
        });

        expect(result).toHaveLength(0);
    });
});