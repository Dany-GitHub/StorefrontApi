import { User, UsersModel } from '../users.model';
import database from '../../database';

const usersModel = new UsersModel();

describe('Testing Users Model', () => {
  describe('Testing Methods Existence', () => {
    it('create user method should exist', function() {
      expect(usersModel.create).toBeDefined();
    });
    it('index to get all users method should exist', function() {
      expect(usersModel.index).toBeDefined();
    });
    it('show user method should exist', function() {
      expect(usersModel.show).toBeDefined();
    });
    it('authenticate user method should exist', function() {
      expect(usersModel.authenticate).toBeDefined();
    });
  });
  describe('Testing Users Model Methods', () => {
    afterAll(async () => {
      // Delete all data and reset the id count
      const connect = await database.connect();
      const sqlUsers = `DELETE
                        FROM users;
      ALTER SEQUENCE users_id_seq RESTART with 1`;
      await connect.query(sqlUsers);
      connect.release();
    });
    it('should return new user after creating user', async function() {
      const createUser: User = await usersModel.create({
        first_name: 'first2',
        last_name: 'last2',
        password: 'newPassword1'
      } as User);
      expect(createUser).toEqual({
        id: 2,
        first_name: 'first2',
        last_name: 'last2'
      } as User);
    });
    it('should show the user after passing id as argument', async function() {
      const showUser = await usersModel.show(2);
      expect(showUser).toEqual({
        id: 2,
        first_name: 'first2',
        last_name: 'last2'
      } as User);
    });
    it('should get all users', async function() {
      const getAll = await usersModel.index();
      expect(getAll).toEqual([
        { id: 1, first_name: 'first1', last_name: 'last1' },
        { id: 2, first_name: 'first2', last_name: 'last2' }
      ] as User[]);
    });
  });
});
