import express from "express";
import * as auth from "../../../middleware/authenticate";
import controller from "./auth.controller";

const router = express.Router();

router.post('/login', controller.login);
router.get('/me', auth.isAuthenticated(), controller.getLoggedInUser);

export default router;