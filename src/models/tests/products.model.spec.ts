import {  ProductsModel } from '../products.model';
import database from '../../database';

const productsModel = new ProductsModel();

describe('Testing Products Model', () => {
  describe('Testing Methods Existence', () => {
    it('index method to get all products should exist', function() {
      expect(productsModel.index).toBeDefined();
    });
    it('show method to get product should exist', function() {
      expect(productsModel.show).toBeDefined();
    });
    it('create method create product should exist', function() {
      expect(productsModel.create).toBeDefined();
    });
    it('getByCategory method to get all products in same category should exist', function() {
      expect(productsModel.getByCategory).toBeDefined();
    });
  });
  describe('Testing Products Model Methods', () => {
    afterAll(async () => {
      // Delete all data and reset id count
      const connect = await database.connect();
      const sql = `DELETE
                   FROM products;
      ALTER SEQUENCE products_id_seq RESTART WITH 1`;
      await connect.query(sql);
      connect.release();
    });
    it('should return new product after creating new product', async function() {
      const createProduct = await productsModel.create({
        name: 'Tea',
        price: 10,
        category: 'Drink'
      });
      expect(createProduct).toEqual({
        id: 2,
        name: 'Tea',
        price: 10,
        category: 'Drink'
      });
    });
    it('should return all products', async function() {
      const products = await productsModel.index();
      expect(products).toEqual([
        { id: 1, name: 'Coffee', price: 28, category: 'Drink' },
        { id: 2, name: 'Tea', price: 10, category: 'Drink' }
      ]);
    });
    it('should return product by id', async function() {
      const getProduct = await productsModel.show(1);
      expect(getProduct).toEqual({
        id: 1,
        name: 'Coffee',
        price: 28,
        category: 'Drink'
      });
    });
    it('should return all products that are in same category', async function() {
      const products = await productsModel.getByCategory('Drink');
      expect(products).toEqual([
        { id: 1, name: 'Coffee', price: 28, category: 'Drink' },
        { id: 2, name: 'Tea', price: 10, category: 'Drink' }
      ]);
    });
  });
});