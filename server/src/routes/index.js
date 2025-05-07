import {Router} from 'express';
import userRouter from './user.router.js';

const router = Router();


router.use('/api', userRouter);

router.use('/*splat', (req, res) => {
    res.status(404).json(
        {
            message: 'Not Found'
        }
    );
});

export default router;

