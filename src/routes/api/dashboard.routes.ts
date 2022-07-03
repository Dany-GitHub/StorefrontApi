import { getUserOrder, getCompletedOrders, getTop5OrderProducts } from '../../controllers/dashboard.controller';
import { Router } from 'express';
import validateToken from '../../middleware/token.middleware';

const dashboardRoutes = Router();

dashboardRoutes.route('/order-products/:id').get(validateToken, getUserOrder);
dashboardRoutes.route('/order-products/completed/:id').get(validateToken, getCompletedOrders);
dashboardRoutes.route('/top5products').get(getTop5OrderProducts);

export default dashboardRoutes;