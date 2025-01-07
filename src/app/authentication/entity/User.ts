import {Role} from './Role';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public roles: Role[]
  ) {
  }
}
