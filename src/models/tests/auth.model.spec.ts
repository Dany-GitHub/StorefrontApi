import database from '../../database';
import { User, UsersModel } from '../users.model';

const usersModel = new UsersModel();

describe('Testing Authentication', () => {
  it('Users model should have authenticate method', function() {
    expect(usersModel.authenticate).toBeDefined();
  });
  const user: User = {
    first_name: 'Ali',
    last_name: 'Ahmed',
    password: 'password'
  };
  beforeAll(async () => {
    const createUser = await usersModel.create(user);
    user.id = createUser.id;
  });
  afterAll(async () => {
    const connect = await database.connect();
    const sqlUsers = `DELETE
                      FROM users; ALTER SEQUENCE users_id_seq RESTART with 1`;
    await connect.query(sqlUsers);
    connect.release();
  });
  it('Authenticate method should return authenticated user with token', async function() {
    const authUser: User | null = await usersModel.authenticate(user);
    // @ts-ignore
    expect(authUser.first_name).toBe('Ali');
    // @ts-ignore
    expect(authUser.last_name).toBe('Ahmed');
  });
  it('Authenticate method should return null if wrong password provided', async function() {
    const authUser = await usersModel.authenticate({
      first_name: 'Ali',
      last_name: 'Ahmed',
      password: 'WrongPassword'
    });
    expect(authUser).toBe(null);
  });
});