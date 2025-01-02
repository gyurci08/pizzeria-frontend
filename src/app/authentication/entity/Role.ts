import {AutoAssign} from '../../core/decorator/auto-assign.decorator';


@AutoAssign()
export class Role {
  id!: number;
  name!: string;
}
