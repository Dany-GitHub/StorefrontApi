import database from '../../../database';
import { Product, ProductsModel } from '../../../models/products.model';
import supertest from 'supertest';
import app from '../../../index';
import { token } from './users.routes.spec';

const request = supertest(app);

describe('Testing Products Api Endpoints', () => {
  afterAll(async () => {
    // Delete all data and reset id count
    const connect = await database.connect();
    const sql = `DELETE
                 FROM products;
    ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await connect.query(sql);
    connect.release();
  });
  describe('Testing create product endpoint', () => {
    it('should return status 401 if no token provided to create new product', async function() {
      const response = await request.post('/api/product')
        .set('Content-type', 'application/json')
        .send({ name: 'Coffee', price: 28, category: 'Drink' });
      expect(response.status).toEqual(401);
    });
    it('should return status 200 if token got provided and create new product', async function() {
      const response = await request.post('/api/product')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Coffee', price: 28, category: 'Drink' });
      expect(response.status).toEqual(200);
      expect(response.body.data).toEqual({ id: 2, name: 'Coffee', price: 28, category: 'Drink' });
    });
  });
  describe('Testing get product endpoint', () => {
    it('should return product', async function() {
      const response = await request.get('/api/product/1')
        .set('Content-type', 'application/json');
      expect(response.body.data).toEqual({
        id: 1,
        name: 'Tea',
        price: 10,
        category: 'Drink'
      });
    });
  });
  describe('Testing get all products endpoint', () => {
    it('should return a list with all products', async function() {
      const response = await request.get('/api/product')
        .set('Content-type', 'application/json');
      expect(response.body.data.length).toBe(2);
    });
  });
  describe('Testing get products by category endpoint',  () => {
    it('should return all products that have the same category', async function() {
      const response = await request.get('/api/product/category/Drink')
        .set('Content-type', 'application/json');
      expect(response.body.data.length).toBe(2);
    });
  });
});
