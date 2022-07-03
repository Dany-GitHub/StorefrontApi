import { Order, OrderProduct, OrdersModel } from '../models/orders.model';
import { Request, Response, NextFunction } from 'express';

const ordersModel = new OrdersModel();

export const getActiveOrders = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id as string);
    const orders = await ordersModel.getOrders(id);
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
    const orders = await ordersModel.getCompletedOrders(id);
    response.json({
      status: 'Success',
      data: [...orders],
      message: 'Orders got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const createOrder = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const order: Order = {
      order_status: 'Active',
      user_id: request.body.user_id
    };
    const createOrder = await ordersModel.createOrder(order);
    response.json({ status: 'Success', data: { ...createOrder }, message: 'order got created successfully' });
  } catch (error) {
    next(error);
  }
};
export const addOrderProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orderProduct: OrderProduct = {
      order_id: request.params.id,
      quantity: parseInt(request.body.quantity as string),
      product_id: request.body.product_id
    };
    const addProduct = await ordersModel.addProduct(orderProduct);
    response.json({
      status: 'Success',
      data: { ...addProduct },
      message: 'Product got added to order successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getTop5Products = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orders = await ordersModel.getTop5Products();
    response.json({
      status: 'Success',
      data: [...orders],
      message: 'Orders got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};