import commonDao from "../common/dao/common.dao";
import { CRUD } from "../common/interfaces/crud.interface";
import { Role } from "../common/role.enum";
import bcrypt from 'bcrypt'
import userDao from "../dao/user.dao";

class UserService implements CRUD {
    
    tableName = 'users';

    async getAll() {
        const users: any[] = await commonDao.getAll(this.tableName);
        return users.map((user) => {
            delete user.password;
            return user;
        })
    }

    async create(resource: any) {
        return commonDao.create(
            this.tableName, 
            [
                'username',
                'first_name',
                'last_name',
                'role',
                'password'
            ],
            [
                resource.username, 
                resource.firstName, 
                resource.lastName, 
                resource.role, 
                (await bcrypt.hash(resource.password, 10)).toString()
            ]);
    }

    async updateById(id: string, resource: any) {
        if(resource.role) {
            if(!Object.values(Role).includes(resource.role as Role)) {
                return 'role should be either Owner,Manager or Cashier';
            }

            if(id === '1' && resource.role !== 'Owner') {
                return 'Cannot change admin user role';
            }
        }
        const user: any = {}
        if(resource.username) {
            user.username = resource.username;
        }
        if(resource.firstName) {
            user.first_name = resource.firstName;
        }
        if(resource.lastName) {
            user.last_name = resource.lastName;
        }
        if(resource.role) {
            user.role = resource.role;
        }
        if(resource.password) {
            user.password = (await bcrypt.hash(resource.password, 10)).toString();
        }
        const result = await commonDao.updateById(this.tableName, 'id', id, Object.keys(user), Object.values(user));
        if(result) {
            return 'User updated';
        }
    }

    async getById(resourceId: any) {
        const user = await commonDao.getById(this.tableName, 'id', resourceId);
        if(user.length > 0) {
            delete user[0].password;
        }
        return user;
    }

    async softDeleteById(resourceId: any) {
        if(resourceId === '1') {
            return 'You cannot deactivate the admin user';
        }
        return commonDao.softDeleteById(this.tableName, "id", resourceId);
    }

    async permanentlyDeleteById(resourceId: any) {
        if(resourceId === '1') {
            return 'You cannot delete the admin user';
        }
        return commonDao.permanentlyDeleteById(this.tableName, "id", resourceId);
    }

    async getByUsername(username: any) {
        return userDao.findUserByUsername(username);
    }

    async authenticateLocalUser(username: string, password:string, done: any) {
        try{
            const user = await this.getByUsername(username);
            if(user.length < 1) {
                return done(null, false, {message: 'User not found. Please register first'})
            }
            if(user[0].active !== 1) {
                return done(null, false, {message: 'User is inactive'})
            }
            const result = await bcrypt.compare(password, (user[0].password ? user[0].password : ''));
            if(!result) {
                return done(null, false, {message: "Incorrecr password"});
            }
            
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }

}

export default new UserService();