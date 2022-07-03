import { Router } from 'express';
import usersRoutes from './api/users.routes';
import productsRoutes from './api/products.routes';
import ordersRoutes from './api/orders.routes';
import dashboardRoutes from './api/dashboard.routes';

const routes = Router();
routes.use('/api', usersRoutes);
routes.use('/api', productsRoutes);
routes.use('/api', ordersRoutes);
routes.use('/api', dashboardRoutes);

routes.get('/api', (req, res) => {
  res.send('Hello from api');
});

export default routes;