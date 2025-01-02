import {AutoAssign} from '../../core/decorator/auto-assign.decorator';
import {Role} from './Role';


@AutoAssign()
export class User {
  name!: string;
  email!: string;
  password!: string;

  roles!: Role[];
}
