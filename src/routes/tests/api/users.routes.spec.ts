import database from '../../../database';
import { UsersModel, User } from '../../../models/users.model';
import supertest from 'supertest';
import app from '../../../index';

const usersModel = new UsersModel();
const request = supertest(app);
export let token = '';

describe('Testing Users Api Endpoints', () => {
  const user: User = {
    first_name: 'Ali',
    last_name: 'Ahmed',
    password: 'password'
  };
  beforeAll(async () => {
    await usersModel.create(user);
  });
  afterAll(async () => {
    const connect = await database.connect();
    const sqlUsers = `DELETE
                      FROM users;
    ALTER SEQUENCE users_id_seq RESTART with 1`;
    await connect.query(sqlUsers);
    connect.release();
  });
  describe('Testing Authentication', () => {
    it('should return status 200 after providing right password for existed user', async function() {
      const response = await request.post('/api/user/authenticate').set('Content-type', 'application/json').send(user);
      expect(response.status).toBe(200);
      const { first_name, last_name } = response.body.data;
      expect(first_name).toEqual('Ali');
      expect(last_name).toEqual('Ahmed');
    });
    it('should return status 401 after providing a wrong password for existed user', async function() {
      const response = await request.post('/api/user/authenticate')
        .set('Content-type', 'application/json')
        .send({ first_name: 'Ali', last_name: 'Ahmed', password: 'WrongPassword' });
      expect(response.status).toBe(401);
    });
  });
  describe('Testing create user endpoint', () => {
    it('should return status 200 after create user successfully and authenticate user after creating', async function() {
      const response = await request.post('/api/user')
        .set('Content-type', 'application/json')
        .send({ first_name: 'Kaedehara', last_name: 'Kazuha', password: 'password' });
      expect(response.status).toBe(200);
      const { first_name, last_name, token: userToken } = response.body.data;
      expect(first_name).toEqual('Kaedehara');
      expect(last_name).toEqual('Kazuha');
      token = userToken;
    });
    describe('Testing get user endpoint', () => {
      it('should get the user with id and return status 200 after providing token with right password to get user', async function() {
        const response = await request.get('/api/user/2')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const { first_name, last_name } = response.body.data;
        expect(first_name).toEqual('Kaedehara');
        expect(last_name).toEqual('Kazuha');
      });
      it('should return status 401 if no token provided', async function() {
        const response = await request.get('/api/user/2')
          .set('Content-type', 'application/json');
        expect(response.status).toBe(401);
      });
    });
    describe('Testing get all users endpoint', () => {
      it('should return status 200 and a list of users', async function() {
        const response = await request.get('/api/user')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
      });
    });
  });
});