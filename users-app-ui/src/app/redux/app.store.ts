import {User} from '../model/user.model';

export interface AppStore {
  users: User[];
  selectedUser: User;
}
