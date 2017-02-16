import { Router, Request, Response } from 'express';
import { OrganizationsController } from './organizationsController';

const router: Router = Router();

// /api
router.get('/', (req: Request, res: Response) => {
    res.end();
});

let orgsController = new OrganizationsController();
router.use('/organizations', orgsController.Router());

export const ApiRoutesController: Router = router;
