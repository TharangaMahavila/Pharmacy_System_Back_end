import express from 'express';
import userService from '../service/user.service';
import { Role } from '../common/role.enum';

class UserMiddleware {

    async validateUsernameAlreadyExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(req.body.username) {
                const result = await userService.getByUsername(req.body.username);
                if(result.length > 0) {
                    return res.status(400).send('Username already exist. Please use different username')
                }
                return next();
            } else {
                return next();
            }
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateUserCreateMandatoryFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(!req.body.username) {
                return res.status(400).send('username is required.');
            }
            if(!req.body.firstName) {
                return res.status(400).send('firstName is required.');
            }
            if(!req.body.password) {
                return res.status(400).send('password is required.');
            }
            if(!req.body.confirmPassword) {
                return res.status(400).send('confirmPassword is required.');
            }
            if(req.body.confirmPassword !== req.body.password) {
                return res.status(400).send('password and confirmPassword should be identical.');
            }
            if(!req.body.role) {
                return res.status(400).send('role is required.');
            }
            if(!Object.values(Role).includes(req.body.role as Role)) {
                return res.status(400).send('role should be either Owner,Manager or Cashier');
            }
            next();
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateUserAlreadyExistAndActive(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await userService.getById(req.params.userId);
            if(user.length > 0) {
                if(user[0].active !== 1) {
                    return res.status(400).send('User is inactive');
                }
                return next();
            }
            return res.status(404).send('User not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateUserAlreadyExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await userService.getById(req.params.userId);
            if(user.length > 0) {
                return next();
            }
            return res.status(404).send('User not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }
}

export default new UserMiddleware();