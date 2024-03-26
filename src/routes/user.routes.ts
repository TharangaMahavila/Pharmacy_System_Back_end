import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userMiddleware from '../middleware/user.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { Role } from '../common/role.enum';


export const userRoute = Router();

userRoute.get('/getAll',
    UserController.getAllUsers
);

userRoute.get('/:userId/detail',
    UserController.getUserById
);

userRoute.post('/create', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    userMiddleware.validateUserCreateMandatoryFields,
    userMiddleware.validateUsernameAlreadyExist,
    UserController.createNewUser
);

userRoute.post('/softDelete/:userId', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    userMiddleware.validateUserAlreadyExistAndActive,
    UserController.softDeleteUserById
);

userRoute.post('/delete/:userId', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    userMiddleware.validateUserAlreadyExist,
    UserController.permanentlyDeleteUserById
);

userRoute.post('/update/:userId', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    userMiddleware.validateUserAlreadyExistAndActive,
    userMiddleware.validateUsernameAlreadyExist,
    UserController.updateUser
);