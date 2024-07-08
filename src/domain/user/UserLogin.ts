import { Password } from './Password';
import { UserEmail } from './UserEmail';

export class sad {
  email: UserEmail;
  password: Password;
  constructor(email: UserEmail, password: Password) {
    this.email = email;
    this.password = password;
  }

  public toPlainObject() {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}
