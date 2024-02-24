import { getPool } from "../../../common/database";
import * as bcrypt from 'bcrypt';

export class UserService {

    constructor() { }

    async get(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'SELECT * FROM users';

                    connection.query(query, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const users = result.rows;
                            return resolve(users);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async create(userData): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let password = await bcrypt.hash(userData.password, 10);
                getPool().then(async (connection) => {

                    const payload = [userData.firstname, userData.lastname, `${userData.firstname} ${userData.lastname}`, userData.email, userData.role, password]
                    let query = 'INSERT INTO users (firstname, lastname, username, email, role, password) VALUES ($1, $2, $3, $4, $5, $6)';
                    connection.query(query, payload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(userData);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async getById(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = `SELECT * FROM users WHERE id = $1`;

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const users = result.rows[0];
                            return resolve(users);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async getChefUsers(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = `SELECT * FROM users WHERE role = $1`;

                    connection.query(query, ['chef'], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const users = result.rows;
                            return resolve(users);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async update(id, user): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let payload = [user.firstname, user.lastname, `${user.firstname} ${user.lastname}`, user.role, id]
                    let query = 'UPDATE users SET firstname = $1, lastname = $2, username = $3, role = $4 WHERE id = $5';

                    connection.query(query, payload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const users = result.rows;
                            return resolve(users);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async delete(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'DELETE FROM users WHERE id = $1';

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const users = result.rows;
                            return resolve(users);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
}

export default new UserService();