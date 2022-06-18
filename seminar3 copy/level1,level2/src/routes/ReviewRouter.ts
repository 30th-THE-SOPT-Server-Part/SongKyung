import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';
import { body } from 'express-validator/check';

const router: Router = Router();

// validation 적용
router.post(
    '/movies/:movieId',
    [
        //notEmpty:비어있지 않는지 확인
        body('title').notEmpty(),
        body('writer').notEmpty(),
        body('content').notEmpty(),
    ],
    ReviewController.createReview,
);
router.get('/movies/:movieId', ReviewController.getReviews);

export default router;
