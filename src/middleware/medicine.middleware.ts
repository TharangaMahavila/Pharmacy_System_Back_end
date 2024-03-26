import express from 'express';
import medicineService from '../service/medicine.service';

class MedicineMiddleware {

    async validateMedicineCreateMandatoryFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(!req.body.name) {
                return res.status(400).send('name is required.');
            }
            if(!req.body.description) {
                return res.status(400).send('description is required.');
            }
            next();
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateMedicineAlreadyExistAndActive(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const medicine = await medicineService.getById(req.params.medicineId);
            if(medicine.length > 0) {
                if(medicine[0].active !== 1) {
                    return res.status(400).send('Medicine is inactive');
                }
                return next();
            }
            return res.status(404).send('Medicine not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }

    async validateMedicineAlreadyExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const medicine = await medicineService.getById(req.params.medicineId);
            if(medicine.length > 0) {
                return next();
            }
            return res.status(404).send('Medicine not found');
        } catch (error) {
            return res.status(500).send('Something went wrong')
        }
    }
}

export default new MedicineMiddleware();