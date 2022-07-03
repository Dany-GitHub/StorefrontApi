import app from '../../../index';
import supertest from 'supertest';
import { token } from './users.routes.spec';
import { Order, OrdersModel } from '../../../models/orders.model';
import database from '../../../database';
import { User, UsersModel } from '../../../models/users.model';
import { Product, ProductsModel } from '../../../models/products.model';


const request = supertest(app);
const ordersModel = new OrdersModel();
const usersModel = new UsersModel();
const productsModel = new ProductsModel();


describe('Testing Orders Api Endpoints', () => {
  const user: User = {
    first_name: 'Ali',
    last_name: 'Ahmed',
    password: 'password'
  };
  const product: Product = {
    name: 'Tea',
    price: 10,
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
  describe('Testing get all active orders for user endpoint', () => {
    it('should return status 401 if no token provided', async function() {
      const response = await request.get('/api/orders/1');
      expect(response.status).toBe(401);
    });
    it('should return status 200 if token got provided and return all active orders', async function() {
      const response = await request.get('/api/orders/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      const { id, order_status, user_id } = response.body.data[0];
      expect(id).toBe(1);
      expect(order_status).toBe('Active');
      expect(user_id).toBe('1');
    });
  });
  describe('Testing get all completed orders for user endpoint', () => {
    it('should return status 401 if no token provided', async function() {
      const response = await request.get('/api/orders/completed/1');
      expect(response.status).toBe(401);
    });
    it('should return status 200 if token got provided and return all active orders', async function() {
      const response = await request.get('/api/orders/completed/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.status).toBe(200);
      const { id, order_status, user_id } = response.body.data[0];
      expect(id).toBe(2);
      expect(order_status).toBe('Completed');
      expect(user_id).toBe('1');
    });
  });
  describe('Testing create order endpoint', () => {
    it('should return status 401 if no token got provided', async function() {
      const response = await request.post('/api/orders')
        .set('Content-type', 'application/json');
      expect(response.status).toBe(401);
    });
    it('should return status 200 and created order if token got provided', async function() {
      const response = await request.post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: 1 });
      expect(response.status).toBe(200);
      const { id, order_status, user_id } = response.body.data;
      expect(id).toBe(3);
      expect(order_status).toBe('Active');
      expect(user_id).toBe('1');
    });
  });
  describe('Testing add product endpoint', () => {
    it('should return status 401 if not token got provided', async function() {
      const response = await request.post('/api/orders/1/products')
        .set('Content-type', 'application/json');
      expect(response.status).toBe(401);
    });
    it('should return status 200 and add product to order', async function() {
      const response = await request.post('/api/orders/1/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ quantity: 20, product_id: 1, order_id: 1 });
      expect(response.status).toBe(200);
      const { id, quantity, product_id, order_id } = response.body.data;
      expect(id).toBe(2);
      expect(quantity).toEqual(20);
      expect(product_id).toBe('1');
      expect(order_id).toBe('1');
    });
  });
  describe('Testing get top 5 products endpoint', () => {
    it('should return a list of top 5 ordered products', async function() {
      const response = await request.get('/api/orders/top5products').set('Content-type', 'application/json');
      expect(response.status).toBe(200);
      const { product_id, count } = response.body.data[0];
      expect(product_id).toBe('1');
      expect(count).toBe('2');
    });
  });
});