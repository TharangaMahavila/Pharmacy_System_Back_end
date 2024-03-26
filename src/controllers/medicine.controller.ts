import express from "express";
import medicineService from "../service/medicine.service";

class MedicineController {

    async createNewMedicine(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.create(req.body);
            if(result) {
                return res.status(201).send('Medicine created');
            }
            res.status(500).send('Medicine not created');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async updateMedicine(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.updateById(req.params.medicineId, req.body);
            if(result) {
                return res.status(201).send(result);
            }
            res.status(500).send('Medicine not updated');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getAllMedicine(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.getAll();
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error occured');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async getMedicineById(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.getById(req.params.medicineId);
            if(result) {
                return res.status(200).send(result[0]);
            }
            res.status(404).send('Medicine not found');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async softDeleteMedicineById(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.softDeleteById(req.params.medicineId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in soft delete Medicine');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }

    async permanentlyDeleteMedicineById(req: express.Request, res: express.Response) {
        try {
            const result = await medicineService.permanentlyDeleteById(req.params.medicineId);
            if(result) {
                return res.status(200).send(result);
            }
            res.status(500).send('Error in permanently delete Medicine');
        } catch (error) {
            res.status(500).send(`Something went wrong ${error}`);
        }
    }
}

export default new MedicineController();