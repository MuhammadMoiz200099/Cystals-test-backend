import { Request, Response } from "express";
import l, { logger } from "../../../common/logger";
import { manageError } from "../../../helper/response.helper";
import AuthService from "./auth.service";
import { BaseController } from "../_base.controller";
import HelperService from "../../../services/helper.service";

export class Controller extends BaseController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const response = await AuthService.login(req.body);
            res.cookie('token', response.accessToken);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async getLoggedInUser(req: Request, res: Response): Promise<void> {
        try {
            super.response(res, HelperService.tranformMeData(req.user), 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
}

export default new Controller();