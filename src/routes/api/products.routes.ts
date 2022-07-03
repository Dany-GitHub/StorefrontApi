import { createProduct, showAllProducts, showProduct, showByCategory } from '../../controllers/products.controller';
import { Router } from 'express';
import validateToken from '../../middleware/token.middleware';

const productsRoutes = Router();

productsRoutes.route('/product').post(validateToken, createProduct).get(showAllProducts);
productsRoutes.route('/product/:id').get(showProduct)
productsRoutes.route('/product/category/:category').get(showByCategory);

export default productsRoutes