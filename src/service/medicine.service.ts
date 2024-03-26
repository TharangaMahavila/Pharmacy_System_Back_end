import commonDao from "../common/dao/common.dao";
import { CRUD } from "../common/interfaces/crud.interface";

class MedicineService implements CRUD {

    tableName = 'medicine';
    
    async getAll() {
        return commonDao.getAll(this.tableName);
    }

    async create(resource: any) {
        if(!resource.quantity) {
            resource.quantity = 0;
        }
        return commonDao.create(
            this.tableName, 
            [
                'name',
                'description',
                'quantity'
            ],
            [
                resource.name, 
                resource.description, 
                resource.quantity
            ]);
    }

    async updateById(id: string, resource: any) {
        const medicine: any = {}
        if(resource.name) {
            medicine.name = resource.name;
        }
        if(resource.description) {
            medicine.description = resource.description;
        }
        if(resource.quantity) {
            medicine.quantity = resource.quantity;
        }
        const result = await commonDao.updateById(this.tableName, 'id', id, Object.keys(medicine), Object.values(medicine));
        if(result) {
            return 'Medicine updated';
        }
    }

    async getById(resourceId: any) {
        return commonDao.getById(this.tableName, 'id', resourceId);
    }

    async softDeleteById(resourceId: any) {
        return commonDao.softDeleteById(this.tableName, "id", resourceId);
    }

    async permanentlyDeleteById(resourceId: any) {
        return commonDao.permanentlyDeleteById(this.tableName, "id", resourceId);
    }

}

export default new MedicineService();