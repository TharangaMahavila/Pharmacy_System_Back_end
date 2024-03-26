import express from 'express';
import { defaultRoute } from './default.routes';
import { userRoute } from './user.routes';
import authMiddleware from '../middleware/auth.middleware';
import { openRoute } from './open.routes';
import { Role } from '../common/role.enum';
import { customerRoute } from './customer.routes';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use('/', openRoute);
routes.use('/user', 
    authMiddleware.isUserAuthenticated,
    authMiddleware.validateRolePermission([Role.OWNER, Role.MANAGER]),
    userRoute
);
routes.use('/customer', 
    authMiddleware.isUserAuthenticated,
    authMiddleware.validateRolePermission([Role.OWNER, Role.MANAGER, Role.CASHIER]),
    customerRoute
);