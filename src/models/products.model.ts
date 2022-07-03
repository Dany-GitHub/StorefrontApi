import database from '../database';

export type Product = {
  id?: number,
  name: string,
  price: number,
  category: string
}

export class ProductsModel {
  async index(): Promise<Product[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM products`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products, ${(error as Error).message}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM products
                   WHERE id = $1`;
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get product, ${(error as Error).message}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO products (name, price, category)
                   VALUES ($1, $2, $3)
                   RETURNING *`;
      const result = await connect.query(sql, [product.name, product.price, product.category]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get product, ${(error as Error).message}`);
    }
  }

  async getByCategory(category: string): Promise<Product[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM products
                   WHERE category = $1`;
      const result = await connect.query(sql, [category]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get product, ${(error as Error).message}`);
    }
  }
}