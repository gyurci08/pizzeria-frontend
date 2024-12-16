import {AutoAssign} from '../../core/decorator/auto-assign.decorator';


@AutoAssign()
export class AuthResponse {
  token!: string;
}
