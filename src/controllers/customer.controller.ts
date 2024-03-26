import express from "express";
import customerService from "../service/customer.service";

class CustomerController {

    async createNewCustomer(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.create(req.body);
            if(result) {
                return res.status(201).send('Customer created');
            }
            res.status(500).send('Customer not created');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async updateCustomer(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.updateById(req.params.customerId, req.body);
            if(result) {
                return res.status(201).send(result);
            }
            res.status(500).send('Customer not updated');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getAllCustomers(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.getAll();
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error occured');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getCustomerById(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.getById(req.params.customerId);
            if(result) {
                return res.status(200).send(result[0]);
            }
            res.status(404).send('Customer not found');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async softDeleteCustomerById(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.softDeleteById(req.params.customerId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in soft delete Customer');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async permanentlyDeleteCustomerById(req: express.Request, res: express.Response) {
        try {
            const result = await customerService.permanentlyDeleteById(req.params.customerId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in permanently delete Customer');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }
}

export default new CustomerController();