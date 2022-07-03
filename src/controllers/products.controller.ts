import { Product, ProductsModel } from '../models/products.model';
import { Request, Response, NextFunction } from 'express';

const productsModel = new ProductsModel();

export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product: Product = {
      name: request.body.name,
      price: parseFloat(request.body.price as string),
      category: request.body.category
    };
    const createProduct = await productsModel.create(product);
    response.json({
      status: 'Success',
      data: { ...createProduct },
      message: 'Product got created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const showProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id as string);
    const product = await productsModel.show(id);
    response.json({
      status: 'Success',
      data: { ...product },
      message: 'Product got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const showAllProducts = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products = await productsModel.index();
    response.json({
      status: 'Success',
      data: [...products],
      message: 'Product got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const showByCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const category = request.params.category;
    const products = await productsModel.getByCategory(category);
    response.json({
      status: 'Success',
      data: [...products],
      message: 'Product got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};