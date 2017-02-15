import { Router, Request, Response } from 'express';
import { OrganizationsController } from './organizationsController';

const router: Router = Router();

// /api
router.get('/', (req: Request, res: Response) => {
    res.end();
});

router.use('/organizations', OrganizationsController);

export const ApiRoutesController: Router = router;