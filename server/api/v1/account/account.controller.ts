import { Request, Response } from "express";
import l, { logger } from "../../../common/logger";
import { manageError } from "../../../helper/response.helper";
import AccountService from "./account.service";
import { BaseController } from "../_base.controller";

export class Controller extends BaseController {
    
    async get(req: Request, res: Response): Promise<void> {
        try {
            const user = await AccountService.get();
            super.response(res, user, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in creating user, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await AccountService.create(req.body);
            super.response(res, user, 200, "User created Successfully!");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in creating user, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async getByID(req: Request, res: Response): Promise<void> {
        try {
            const user = await AccountService.getById(req.params.id);
            super.response(res, user, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in creating user, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await AccountService.update(req.params.id, req.body);
            super.response(res, user, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in creating user, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const user = await AccountService.delete(req.params.id);
            super.response(res, user, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in creating user, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
}

export default new Controller();