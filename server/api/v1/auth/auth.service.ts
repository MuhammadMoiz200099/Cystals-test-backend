import { getPool } from "../../../common/database";
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

export class AuthService {

    constructor() { }

    async login(credentials): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const { email, password } = credentials;
            try {
                getPool().then((connection) => {
                    let query = 'SELECT * FROM users where email = $1';

                    connection.query(query, [email], async (err, result) => {
                        if (err) {
                            return reject({ message: 'Email or Password invalid!', code: 400 });
                        } else {
                            const user = result.rows[0];

                            const match = await bcrypt.compare(password, user.password);

                            if(!match) {
                                return reject({ message: 'Password invalid!', code: 400 });
                            }

                            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                                expiresIn: 604800, // 1 week hours
                                algorithm: 'HS256'
                            });

                            const responsePayload = {
                                ...user,
                                accessToken: token,
                            }
                            delete responsePayload.password;

                            return resolve(responsePayload)
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

export default new AuthService();