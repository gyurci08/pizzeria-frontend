import {AutoAssign} from '../../core/decorator/auto-assign.decorator';

@AutoAssign()
export class Customer {
  id!: number;
  name!: string;
  phone!: string;
  address!: string;
  userId!: number;
}
