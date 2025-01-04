import {AutoAssign} from '../../core/decorator/auto-assign.decorator';

@AutoAssign()
export class MenuItem {
  id!: number;
  name!: String;
  description!: String;
  price!: number;
}
