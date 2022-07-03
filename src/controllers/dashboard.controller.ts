import { OrderProductsModel } from '../models/services/dashboard.model';
import { Request, Response, NextFunction } from 'express';

const userOrdersModel = new OrderProductsModel();

export const getUserOrder = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id as string);
    const orders = await userOrdersModel.getActiveUserOrdersProducts(id);
    response.json({
      status: 'Success',
      data: [...orders],
      message: 'Orders got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getCompletedOrders = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id as string);
    const orders = await userOrdersModel.getCompletedUserOrdersProducts(id);
    response.json({
      status: 'Success',
      data: [...orders],
      message: 'Orders got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getTop5OrderProducts = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products = await userOrdersModel.getTop5OrderProducts();
    response.json({
      status: 'Success',
      data: [...products],
      message: 'Orders got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};