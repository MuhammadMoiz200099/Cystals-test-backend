import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { getPool } from "../common/database";
import { BaseController } from '../api/v1/_base.controller';
import { compose } from 'compose-middleware';

var validateJwt = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

export function isAuthenticated() {
    return compose([
        function (req, res, next) {
            if (typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        },
        async function (req, res, next) {
            getPool().then((connection) => {
                let query = 'SELECT * FROM users where id = $1';

                connection.query(query, [req.user.id], async (err, result) => {
                    if (err) {
                        return BaseController.prototype.response(res, {}, 401, "Not Authorized");
                    } else {
                        const user = result.rows[0]
                        if(!user) {
                            return BaseController.prototype.response(res, {}, 401, "Not Authorized");
                        }

                        req.user = user;
                        next();
                        return null;
                    }
                });
            });
        }
    ]);
}

export function signToken(id, role) {
    return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 5
    });
}