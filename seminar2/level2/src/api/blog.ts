import express, { Request, Response, Router } from 'express';
import { sc, rm } from '../constant';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => { 
    return res.status(200).json({
        status: sc.OK,
        message: rm.READ_USER_SUCCESS
    });
});

module.exports = router;