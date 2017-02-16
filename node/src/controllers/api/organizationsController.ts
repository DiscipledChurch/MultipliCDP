import Kernel from '../../inversify.config';
import { Router, Request, Response } from 'express';
import { IOrganization, Organization } from '../../data/interfaces/organizations';

const router: Router = Router();

export class OrganizationsController {
    private _orgs: IOrganization;

    public constructor() {
        this._orgs = Kernel.get<IOrganization>('IOrganization');
    }

    public Router(): Router {

        // /api/organizations
        router.route('/')

            .get((req: Request, res: Response) => {
                let includeDeleted: any = req.header('includeDeleted');
                this._orgs.getAll(includeDeleted)
                    .then((_resp) => {
                        res.json(_resp);
                    })
                    .catch((_err) => {
                        res.send(_err);
                    });
            })

            .post((req: Request, res: Response) => {
                let org = new Organization(req.body.name, req.body.hostname);

                if (req.body._id !== undefined && req.body._id != null) {
                    res.send({ error: 'Id cannot be supplied.' });
                } else {
                    this._orgs.save(org)
                        .then((_resp) => {
                            res.json(_resp);
                        })
                        .catch((_err) => {
                            res.send(_err);
                        });
                }
            });

        // /api/organizations/:id
        router.route('/:id')

            .get((req: Request, res: Response) => {
                let includeDeleted: any = req.header('includeDeleted');
                this._orgs.get(req.params.id, includeDeleted)
                    .then((_resp) => {
                        res.send(_resp);
                    })
                    .catch((_err) => {
                        res.send(_err);
                    });
            })

            .put((req: Request, res: Response) => {
                let org = new Organization();
                org._id = req.body._id + '';
                org.name = req.body.name;
                org.hostname = req.body.hostname;
                org.isAuthorized = req.body.isAuthorized;

                if (org._id !== req.params.id) {
                    res.send({ error: 'Id\'s must match.' });
                } else {
                    this._orgs.save(org)
                        .then((_resp) => {
                            res.send(_resp);
                        })
                        .catch((_err) => {
                            res.send(_err);
                        });
                }
            })

            .delete((req: Request, res: Response) => {
                this._orgs.delete(req.params.id)
                    .then((_resp) => {
                        res.send(_resp);
                    })
                    .catch((_err) => {
                        res.send(_err);
                    });
            });

        return router;
    }
}
