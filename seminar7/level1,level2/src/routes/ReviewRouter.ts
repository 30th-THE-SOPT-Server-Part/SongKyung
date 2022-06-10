import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';
import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

// validation 적용
router.post(
    '/movies/:movieId',
    [
        // controller로 넘어가기 전에 validator가 body를 검사함
        body('title').notEmpty(),
        body('writer').notEmpty(),
        body('content').notEmpty(),
    ],
    ReviewController.createReview,
);
router.get('/movies/:movieId', auth, ReviewController.getReviews);

export default router;
