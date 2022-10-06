import { Repository } from 'typeorm';

import { User } from '@models';
import { PropsApi } from './api.interface';

export interface PropsApiUser extends PropsApi {
  userRepository: Repository<User>;
}
