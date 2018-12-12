import {Action} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {User} from '../model/user.model';

@Injectable()
export class CrudActions {
  static LOAD_USERS = 'LOAD_USERS';
  static CREATE_USER = 'CREATE_USER';
  static UPDATE_USER = 'UPDATE_USER';
  static DELETE_USER = 'DELETE_USER';

  loadUsers(users: User[]): Action {
    return {
      type: CrudActions.LOAD_USERS,
      payload: users
    };
  }

  createUser(user: User): Action {
    return {
      type: CrudActions.CREATE_USER,
      payload: user
    };
  }

  updateUser(user: User): Action {
    return {
      type: CrudActions.UPDATE_USER,
      payload: user
    };
  }

  deleteUser(id: string): Action {
    return {
      type: CrudActions.DELETE_USER,
      payload: id
    };
  }
}
