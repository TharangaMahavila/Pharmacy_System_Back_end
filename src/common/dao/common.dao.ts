import { db } from "../../database";

class CommonDao {
    async getAll(modelName: any) {
        return new Promise<any[]>((resolve, reject) => {
            try {
                let sql = `SELECT * FROM ${modelName}`;
        
                db.all(sql, [], (err, rows) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve(rows);
                });
            } catch (error) {
                return reject(error)
            }
        })
    }

    async create(modelName: any, fields: string[], data: string[]) {
        return new Promise((resolve, reject) => {
            try {
                let sql = `INSERT INTO ${modelName} (
                    ${fields.map((field) => {
                        return field
                    })}
                ) VALUES (
                    ${fields.map((field) => {
                        return '?'
                    })}
                )`;
        
                db.run(sql, data, (err) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve('Created');
                });
            } catch (error) {
                return reject(error)
            }
        })
    }

    async updateById(modelName: string, idFieldName: string, idFieldValue: string, updateFields: string[], data: string[]) {
        return new Promise((resolve, reject) => {
            try {
                let sql = `UPDATE ${modelName} SET 
                    ${updateFields.map((field) => {
                        return field+'=?'
                    })}
                 WHERE ${idFieldName}=?`;
                
                data.push(idFieldValue);
        
                db.run(sql, data, (err) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve('Updated');
                });
            } catch (error) {
                return reject(error)
            }
        })
    }

    async getById(modelName: any, fieldName: string, value: string) {
        return new Promise<any[]>((resolve, reject) => {
            try {
                let sql = `SELECT * FROM ${modelName} WHERE ${fieldName}=?`;
        
                db.all(sql, [value], (err, rows) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve(rows);
                });
            } catch (error) {
                return reject(error)
            }
        })
    }

    async softDeleteById(modelName: string, idFieldName: string, idFieldValue: string) {
        return new Promise((resolve, reject) => {
            try {
                let sql = `UPDATE ${modelName} SET active=false WHERE ${idFieldName}=?`;
                
        
                db.run(sql, [idFieldValue], (err) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve('Soft deleted');
                });
            } catch (error) {
                return reject(error)
            }
        })
    }

    async permanentlyDeleteById(modelName: string, idFieldName: string, idFieldValue: string) {
        return new Promise((resolve, reject) => {
            try {
                let sql = `DELETE FROM ${modelName} WHERE ${idFieldName}=?`;
                
        
                db.run(sql, [idFieldValue], (err) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve('Permanently deleted');
                });
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default new CommonDao();