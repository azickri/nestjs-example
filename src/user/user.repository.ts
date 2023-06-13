import { UserType } from 'src/types/user.type';

export interface UserRepository {
  getUser(email: string): Promise<UserType>;
}
