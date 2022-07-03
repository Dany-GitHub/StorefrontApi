import { token } from './users.routes.spec';
import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

describe('Testing Dashboard Api Endpoints', () => {
  describe('Testing active order-products endpoint', () => {
    it('should return status 401 if no token provided', async function() {
      const response = await request.get('/api/order-products/1');
      expect(response.status).toBe(401);
    });
    it('should return status 200 if token got provided and return all order-products', async function() {
      const response = await request.get('/api/order-products/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('Testing completed order-products endpoint', () => {
    it('should return status 401 if no token provided', async function() {
      const response = await request.get('/api/order-products/completed/1');
      expect(response.status).toBe(401);
    });
    it('should return status 200 if token got provided and return all completed order-products', async function() {
      const response = await request.get('/api/order-products/completed/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
  describe('Testing top 5 products endpoint', () => {
    it('should return a list with top 5 products depend on orders', async function() {
      const response = await request.get('/api/top5products');
      expect(response.status).toBe(200);
    });
  });
});