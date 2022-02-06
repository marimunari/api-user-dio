import { getConnection } from 'typeorm';
import createConnection from '../database';
import { GetAllUserService } from './GetAllUserService';
import { FakeData } from '../utils/fakeData/fakeData';

describe('GetAllUserService', () => {
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

    it('Deve retornar todos os usuários cadastrados', async () => {
        await fakeData.execute();
        
        const expectedResponse = [
            {
                name: 'Teste',
                email: 'teste@teste.com'
            },
            {
                name: 'Teste2',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();

        expect(result).toMatchObject(expectedResponse);
    });
});