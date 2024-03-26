import { Router } from 'express';
import customerController from '../controllers/customer.controller';
import authMiddleware from '../middleware/auth.middleware';
import { Role } from '../common/role.enum';
import customerMiddleware from '../middleware/customer.middleware';


export const customerRoute = Router();

customerRoute.get('/getAll',
    customerController.getAllCustomers
);

customerRoute.get('/:customerId/detail',
    customerController.getCustomerById
);

customerRoute.post('/create', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    customerMiddleware.validateCustomerCreateMandatoryFields,
    customerController.createNewCustomer
);

customerRoute.post('/softDelete/:customerId', 
    authMiddleware.validateRolePermission([Role.OWNER, Role.MANAGER]),
    customerMiddleware.validateCustomerAlreadyExistAndActive,
    customerController.softDeleteCustomerById
);

customerRoute.post('/delete/:customerId', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    customerMiddleware.validateCustomerAlreadyExist,
    customerController.permanentlyDeleteCustomerById
);

customerRoute.post('/update/:customerId', 
    customerMiddleware.validateCustomerAlreadyExistAndActive,
    customerController.updateCustomer
);