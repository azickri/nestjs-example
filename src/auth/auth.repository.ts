import { UserDocument } from 'src/models/user.model';

export interface AuthRepository {
  getUser(email: string): Promise<UserDocument>;

  createUser({ name, email, password }): Promise<void>;
}
