import {AutoAssign} from '../../core/decorator/auto-assign.decorator';

@AutoAssign()
export class AuthResponse {
  accessToken!: string;
  refreshToken!: string;
}
