import { getPool } from "../../../common/database";
import * as bcrypt from 'bcrypt';

export class AccountService {

    constructor() { }

    async get(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'SELECT * FROM account';

                    connection.query(query, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const account = result.rows;
                            return resolve(account);
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

                    const payload = [userData.firstname, userData.lastname, userData.email, password, userData.phone, userData.birthday]
                    let query = 'INSERT INTO account (firstname, lastname, email, password, phone, birthday) VALUES ($1, $2, $3, $4, $5, $6)';
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
                    let query = `SELECT * FROM account WHERE id = $1`;

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const account = result.rows[0];
                            return resolve(account);
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
                    let payload = [user.firstname, user.lastname, user.phone, user.birthday, new Date().toISOString(), id]
                    let query = 'UPDATE account SET firstname = $1, lastname = $2, phone = $3, birthday = $4, last_modified = $5 WHERE id = $6';

                    connection.query(query, payload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const account = result.rows;
                            return resolve(account);
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
                    let query = 'DELETE FROM account WHERE id = $1';

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const account = result.rows;
                            return resolve(account);
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

export default new AccountService();