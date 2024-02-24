import { Router } from 'express';

import authRouter from "./auth";
import userRouter from "./user";
import dishRouter from "./dishes";
import orderRouter from "./orders";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/dish', dishRouter);
router.use('/order', orderRouter);

export default router;