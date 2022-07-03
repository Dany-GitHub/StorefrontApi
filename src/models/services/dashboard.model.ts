import database from '../../database';

export type OrderProductJoined = {
  id?: number,
  first_name: string,
  last_name: string,
  name: string,
  price: number,
  quantity: number,
  category: string,
  order_status: string
}

export class OrderProductsModel {
  async getActiveUserOrdersProducts(userID: number): Promise<OrderProductJoined[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT orders.id,
                          first_name,
                          last_name,
                          name,
                          price,
                          quantity,
                          category,
                          order_status
                   FROM orders
                            INNER JOIN users ON orders.user_id = users.id
                            INNER JOIN order_products op on orders.id = op.order_id
                            INNER JOIN products p on p.id = op.product_id
                   WHERE user_id = $1 AND order_status = 'Active'`;
      const result = await connect.query(sql, [userID]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders, ${(error as Error).message}`);
    }
  }

  async getCompletedUserOrdersProducts(userID: number): Promise<OrderProductJoined[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT orders.id,
                          first_name,
                          last_name,
                          name,
                          price,
                          quantity,
                          category,
                          order_status
                   FROM orders
                            INNER JOIN users ON orders.user_id = users.id
                            INNER JOIN order_products op on orders.id = op.order_id
                            INNER JOIN products p on p.id = op.product_id
                   WHERE user_id = $1
                     AND order_status = 'Completed'`;
      const result = await connect.query(sql, [userID]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders, ${(error as Error).message}`);
    }
  }

  async getTop5OrderProducts(): Promise<{ product_id: string, count: string, name: string, category: string, price: number }[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT product_id, count(product_id) AS count, name, category, price
                   FROM order_products
                            INNER JOIN products p on p.id = order_products.product_id
                   GROUP BY product_id, name, category, price
                   ORDER BY count DESC
                   LIMIT 5`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders, ${(error as Error).message}`);
    }
  }
}



