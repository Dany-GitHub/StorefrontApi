import database from '../database';

export type Order = {
  id?: number,
  user_id: string,
  order_status: string
}

export type OrderProduct = {
  id?: number,
  quantity: number,
  product_id: string,
  order_id: string
}

export class OrdersModel {
  async getOrders(userID: number): Promise<Order[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM orders
                   WHERE user_id = $1
                     AND order_status = 'Active'`;
      const result = await connect.query(sql, [userID]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get order, ${(error as Error).message}`);
    }
  }

  async getCompletedOrders(userID: number): Promise<Order[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM orders
                   WHERE user_id = $1
                     AND order_status = 'Completed'`;
      const result = await connect.query(sql, [userID]);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get order, ${(error as Error).message}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const connect = await database.connect();
      const sql = `INSERT INTO orders (order_status, user_id)
                   VALUES ($1, $2)
                   RETURNING *`;
      const result = await connect.query(sql, [order.order_status, order.user_id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create order, ${(error as Error).message}`);
    }
  }

  async addProduct(orderProduct: OrderProduct): Promise<OrderProduct | null> {
    try {
      const connect = await database.connect();
      const sql = `SELECT *
                   FROM orders
                   WHERE id = $1`;
      const result = await connect.query(sql, [orderProduct.order_id]);
      const status = result.rows[0].order_status;
      if (status === 'Active') {
        try {
          const connect = await database.connect();
          const sql = `INSERT INTO order_products (quantity, product_id, order_id)
                       VALUES ($1, $2, $3)
                       RETURNING *`;
          const result = await connect.query(sql, [orderProduct.quantity, orderProduct.product_id, orderProduct.order_id]);
          connect.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Unable to add product to order, ${(error as Error).message}`);
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Unable to get status order, ${(error as Error).message}`);
    }
  }

  async getTop5Products(): Promise<{ product_id: string, count: string }[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT product_id, count(product_id) AS count
                   FROM order_products
                   GROUP BY product_id
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


