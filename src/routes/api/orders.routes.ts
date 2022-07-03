import { Router } from 'express';
import {
  getActiveOrders,
  getCompletedOrders,
  createOrder,
  addOrderProduct,
  getTop5Products
} from '../../controllers/orders.controller';
import validateToken from '../../middleware/token.middleware';
import usersRoutes from './users.routes';

const ordersRoutes = Router();

ordersRoutes.route('/orders/:id').get(validateToken, getActiveOrders);
ordersRoutes.route('/orders/completed/:id').get(validateToken, getCompletedOrders);
ordersRoutes.route('/orders').post(validateToken, createOrder);
ordersRoutes.route('/orders/:id/products').post(validateToken, addOrderProduct);
usersRoutes.route('/orders/top5products').get(getTop5Products);

export default ordersRoutes;