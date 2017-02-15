import { Router, Request, Response } from 'express';
import { Organization } from '../../data/interfaces/organizations';
import { Organizations } from '../../data/mongo/organizations';

const router: Router = Router();

// /api/organizations
router.route('/')

    .get((req: Request, res: Response) => {
        let orgs = new Organizations();
        orgs.getAll(req.body.includeDeleted)
            .then((_resp) => {
                res.json(_resp);
            })
            .catch((_err) => {
                res.send(_err);
            });
    })

    .post((req: Request, res: Response) => {
        let orgs = new Organizations();
        let org = req.body;
        
        if (org._id != undefined && org._id != null)
            res.send({error: "Id cannot be supplied."});
        else 
            orgs.save(org)
                .then((_resp) => {
                    res.json(_resp);
                })
                .catch((_err) => {
                    res.send(_err);
                });
    });

// /api/organizations/:id
router.route('/:id')

    .get((req: Request, res: Response) => {
        let orgs = new Organizations();
        orgs.get(req.params.id, req.body.includeDeleted)
            .then((_resp) => {
                res.send(_resp);
            })
            .catch((_err) => {
                res.send(_err);
            });
    })

    .put((req: Request, res: Response) => {
        let orgs = new Organizations();
        let org = req.body;

        if (org._id != req.params.id)
            res.send({error: "Id's must match."});
        else
            orgs.save(org)
                .then((_resp) => {
                    res.send(_resp);
                })
                .catch((_err) => {
                    res.send(_err);
                });
    })

    .delete((req: Request, res: Response) => {
        let orgs = new Organizations();
        orgs.delete(req.params.id)
            .then((_resp) => {
                res.send(_resp);
            })
            .catch((_err) => {
                res.send(_err);
            });
    });

export const OrganizationsController: Router = router;