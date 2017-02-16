import { Container} from 'inversify';
import { IOrganization } from './data/interfaces/organizations';

import { Organizations } from './data/mongo/organizations';

let Kernel = new Container();
Kernel.bind<IOrganization>('IOrganization').to(Organizations);

export default Kernel;
