import { Router } from 'express';
import { MovieController } from '../controllers';
import { body } from 'express-validator';

const router: Router = Router();

router.post('/',MovieController.createMovie,);
router.put('/:movieId', MovieController.updateMovie);
router.get('/:movieId', MovieController.findMovieById);
router.delete('/:movieId', MovieController.deleteMovie);

export default router;
