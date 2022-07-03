import { Order, OrdersModel } from '../orders.model';
import { User, UsersModel } from '../users.model';
import { Product, ProductsModel } from '../products.model';
import database from '../../database';

const ordersModel = new OrdersModel();
const usersModel = new UsersModel();
const productsModel = new ProductsModel();

describe('Testing Orders Model', () => {
  describe('Testing Orders Methods Existence', () => {
    it('getOrder method should exist ', function() {
      expect(ordersModel.getOrders).toBeDefined();
    });
    it('getCompletedOrder method should exist', function() {
      expect(ordersModel.getCompletedOrders).toBeDefined();
    });
    it('createOrder method should exist', function() {
      expect(ordersModel.createOrder).toBeDefined();
    });
    it('addProduct method should exist', function() {
      expect(ordersModel.addProduct).toBeDefined();
    });
    it('getTop5Products method should exist', function() {
      expect(ordersModel.getTop5Products).toBeDefined();
    });
  });
  describe('Testing Orders Methods', () => {
    const user: User = {
      first_name: 'first1',
      last_name: 'last1',
      password: 'newPassword'
    };
    const product: Product = {
      name: 'Coffee',
      price: 28,
      category: 'Drink'
    };
    const activeOrder: Order = {
      order_status: 'Active', user_id: '1'
    };
    const completedOrder: Order = {
      order_status: 'Completed', user_id: '1'
    };
    beforeAll(async () => {
      // Create user for testing
      await usersModel.create(user);
      // Create product for testing
      await productsModel.create(product);
      // Put 2 rows in orders table active and completed for testing
      await ordersModel.createOrder(activeOrder);
      await ordersModel.createOrder(completedOrder);
      // Put orderProduct to order_products table for testing
      await ordersModel.addProduct({ quantity: 20, order_id: '1', product_id: '1' });
    });
    afterAll(async () => {
      const connect = await database.connect();
      await connect.query(`DELETE
                           FROM order_products;
      ALTER SEQUENCE order_products_id_seq RESTART with 1`);
      await connect.query(`DELETE
                           FROM orders;
      ALTER SEQUENCE orders_id_seq RESTART with 1`);
      connect.release();
    });
    describe('Testing create order method', () => {
      it('should create new order', async function() {
        const createOrder = await ordersModel.createOrder({ order_status: 'Active', user_id: '1' });
        expect(createOrder).toEqual({
          id: 3, order_status: 'Active', user_id: '1'
        });
      });
      it('should return a list with all active orders for a user', async function() {
        const orders = await ordersModel.getOrders(1);
        expect(orders).toEqual([
          { id: 1, order_status: 'Active', user_id: '1' },
          { id: 3, order_status: 'Active', user_id: '1' }] as Order[]);
      });
      it('should return a list with all completed orders for a user', async function() {
        const orders = await ordersModel.getCompletedOrders(1);
        expect(orders).toEqual([{ id: 2, order_status: 'Completed', user_id: '1' }]);
      });
      it('should add product to order if its status active', async function() {
        const orderProduct = await ordersModel.addProduct({ quantity: 20, order_id: '1', product_id: '1' });
        expect(orderProduct).toEqual({ id: 2, quantity: 20, order_id: '1', product_id: '1' });
      });
      it('should not add product if its status not active', async function() {
        const orderProduct = await ordersModel.addProduct({ quantity: 20, order_id: '2', product_id: '1' });
        expect(orderProduct).toBeFalsy();
      });
      it('should return top 5 products and their counts', async function() {
        const top5 = await ordersModel.getTop5Products();
        expect(top5).toEqual([{ product_id: '1', count: '2' }]);
      });
    });
  });
});
