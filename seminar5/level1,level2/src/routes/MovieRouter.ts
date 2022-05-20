import { Router } from 'express';
import { MovieController } from '../controllers';
import { body } from 'express-validator';
import auth from "../middleware/auth";

const router: Router = Router();

router.post(
    '/',
    [body('title').notEmpty(), body('director').notEmpty()],
    MovieController.createMovie,
);
router.put('/:movieId/comments/:commentId', [
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

router.get('/',MovieController.getMovie);

router.put('/:movieId', MovieController.updateMovie);
router.get('/:movieId', MovieController.findMovieById);
router.delete('/:movieId', MovieController.deleteMovie);

export default router;
