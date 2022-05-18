import { Router } from 'express';
import { UserController } from '../controllers';
import { body } from 'express-validator';

const router: Router = Router();

// routes => use(/user) => post(/)
router.post(
    '/',
    [
        body('name').notEmpty(),
        body('phone').notEmpty(),
        body('email').notEmpty(),
    ],
    UserController.createUser,
);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router;
