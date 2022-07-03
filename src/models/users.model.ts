import database from '../database';
import config from '../config';
import bcrypt from 'bcrypt';

export type User = {
  id?: number,
  first_name: string,
  last_name: string,
  password: string
}

export class UsersModel {
  async index(): Promise<User[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT id, first_name, last_name
                   FROM users`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get all users, ${(error as Error).message}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connect = await database.connect();
      const sql = `SELECT id, first_name, last_name
                   FROM users
                   WHERE id = $1`;
      const result = await database.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get user, ${(error as Error).message}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO users (first_name, last_name, password)
                   VALUES ($1, $2, $3)
                   RETURNING id, first_name, last_name`;
      const hashedPassword = bcrypt.hashSync(user.password + config.pepper, config.salt);
      const result = await connect.query(sql, [user.first_name, user.last_name, hashedPassword]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create user, ${(error as Error).message}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM users
                   WHERE first_name = $1
                     AND last_name = $2`;
      const result = await connect.query(sql, [user.first_name, user.last_name]);
      if (result.rows.length) {
        const { password: userPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(user.password + config.pepper, userPassword);
        if (isPasswordValid) {
          return result.rows[0];
        }
      }
      connect.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login, ${(error as Error).message}`);
    }
  }
}