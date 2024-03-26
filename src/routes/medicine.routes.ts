import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { Role } from '../common/role.enum';
import medicineController from '../controllers/medicine.controller';
import medicineMiddleware from '../middleware/medicine.middleware';


export const medicineRoute = Router();

medicineRoute.get('/getAll',
    medicineController.getAllMedicine
);

medicineRoute.get('/:medicineId/detail',
    medicineController.getMedicineById
);

medicineRoute.post('/create', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    medicineMiddleware.validateMedicineCreateMandatoryFields,
    medicineController.createNewMedicine
);

medicineRoute.post('/softDelete/:medicineId', 
    authMiddleware.validateRolePermission([Role.OWNER, Role.MANAGER]),
    medicineMiddleware.validateMedicineAlreadyExistAndActive,
    medicineController.softDeleteMedicineById
);

medicineRoute.post('/delete/:medicineId', 
    authMiddleware.validateRolePermission([Role.OWNER]),
    medicineMiddleware.validateMedicineAlreadyExist,
    medicineController.permanentlyDeleteMedicineById
);

medicineRoute.post('/update/:medicineId', 
    medicineMiddleware.validateMedicineAlreadyExistAndActive,
    medicineController.updateMedicine
);