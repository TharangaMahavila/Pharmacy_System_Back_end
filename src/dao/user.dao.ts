import { db } from "../database";
import UserInterface from "../model/user.model";

class UserDao {

    async findUserByUsername(username: string) {
        return new Promise<UserInterface[]>((resolve, reject) => {
            try {
                let sql = `SELECT * FROM users WHERE username=?`;
        
                db.all(sql, [username], (err, rows) => {
                    if(err) {
                        return reject(err.message);
                    }

                    return resolve(rows as UserInterface[]);
                });
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default new UserDao();