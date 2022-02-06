import createConnection from '../database';
import { getConnection } from "typeorm";
import { UpdateUserService } from "./UpdateUserService";
import { FakeData } from "../utils/fakeData/fakeData";

describe('UpdateUserService', () => {
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

    it('Deve editar o nome do usuário', async () => {
        const mockUser = await fakeData.createUser();
        
        const updateUserService = new UpdateUserService();

        const result = await updateUserService.execute({
            id: mockUser.id,
            name: 'Usuario alterado'
        });

        expect(result).toHaveLength(0);
    });

    it('Deve editar o e-mail do usuário', async () => {
        const mockUser = await fakeData.createUser();
        
        const updateUserService = new UpdateUserService();

        const result = await updateUserService.execute({
            id: mockUser.id,
            name: 'Usuario alterado',
            email: 'novoemail@gmail.com'
        });

        expect(result).toHaveLength(0);
    });
});