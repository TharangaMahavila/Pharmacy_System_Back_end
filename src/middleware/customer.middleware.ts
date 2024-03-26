import express from 'express';
import userService from '../service/user.service';
import customerService from '../service/customer.service';

class CustomerMiddleware {

    async validateCustomerCreateMandatoryFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(!req.body.firstName) {
                return res.status(400).send('firstName is required.');
            }
            next();
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateCustomerAlreadyExistAndActive(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const customer = await customerService.getById(req.params.customerId);
            if(customer.length > 0) {
                if(customer[0].active !== 1) {
                    return res.status(400).send('Customer is inactive');
                }
                return next();
            }
            return res.status(404).send('Customer not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateCustomerAlreadyExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const customer = await userService.getById(req.params.customerId);
            if(customer.length > 0) {
                return next();
            }
            return res.status(404).send('User not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }
}

export default new CustomerMiddleware();