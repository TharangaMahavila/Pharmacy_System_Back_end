import commonDao from "../common/dao/common.dao";
import { CRUD } from "../common/interfaces/crud.interface";

class CustomerService implements CRUD {

    tableName = 'customers';
    
    async getAll() {
        return commonDao.getAll(this.tableName);
    }

    async create(resource: any) {
        return commonDao.create(
            this.tableName, 
            [
                'first_name',
                'last_name',
                'contact'
            ],
            [
                resource.firstName, 
                resource.lastName, 
                resource.contact
            ]);
    }

    async updateById(id: string, resource: any) {
        const customer: any = {}
        if(resource.firstName) {
            customer.first_name = resource.firstName;
        }
        if(resource.lastName) {
            customer.last_name = resource.lastName;
        }
        if(resource.contact) {
            customer.contact = resource.contact;
        }
        const result = await commonDao.updateById(this.tableName, 'id', id, Object.keys(customer), Object.values(customer));
        if(result) {
            return 'Customer updated';
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

export default new CustomerService();