import express from "express";
import userService from "../service/user.service";

class UserController {

    async createNewUser(req: express.Request, res: express.Response) {
        try {
            const result = await userService.create(req.body);
            if(result) {
                return res.status(201).send('User created');
            }
            res.status(500).send('User not created');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        try {
            const result = await userService.updateById(req.params.userId, req.body);
            if(result) {
                return res.status(201).send(result);
            }
            res.status(500).send('User not updated');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getAllUsers(req: express.Request, res: express.Response) {
        try {
            const result = await userService.getAll();
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error occured');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const result = await userService.getById(req.params.userId);
            if(result) {
                return res.status(200).send(result[0]);
            }
            res.status(404).send('User not found');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async softDeleteUserById(req: express.Request, res: express.Response) {
        try {
            const result = await userService.softDeleteById(req.params.userId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in soft delete user');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async permanentlyDeleteUserById(req: express.Request, res: express.Response) {
        try {
            const result = await userService.permanentlyDeleteById(req.params.userId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in permanently delete user');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }
}

export default new UserController();