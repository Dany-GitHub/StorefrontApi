import { Router } from 'express';
import { authenticateUser, createUser, getAllUsers, showUser } from '../../controllers/users.controller';
import validateToken from '../../middleware/token.middleware';

const usersRoutes = Router();

usersRoutes.route('/user').post(createUser).get(validateToken, getAllUsers);
usersRoutes.route('/user/:id').get(validateToken, showUser);
usersRoutes.route('/user/authenticate').post(authenticateUser);

export default usersRoutes;