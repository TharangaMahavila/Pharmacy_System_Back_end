import express from 'express';
import { Role } from '../common/role.enum';

class AuthMiddleware {

    validateRolePermission(roles: Role[]) {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const user: any = req.user;
            let foundRole = false;
            roles.map((role) => {
                if(role === (user ? user.role : '')) {
                    foundRole = true;
                }
            });
            if(foundRole) {
                return next();
            }
            return res.status(403).json('You are not authorized to invoke this API');
        }
    }

    isUserAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(req.user) {
                return next();
            } else {
                return res.status(401).json('You must login first');
            }
        } catch (error) {
            return res.status(401).json('You must login first');
        }
    }
}

export default new AuthMiddleware();