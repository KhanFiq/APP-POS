import {Router} from 'express';
import {doLogin} from '../controller/user.contrller.js';

const userRouter = Router();

userRouter.post('/login', doLogin);

export default userRouter;
