import {ActionReducer, Action} from '@ngrx/store';
import {AppStore} from './app.store';
import {CrudActions} from './crud.actions';
import {User} from '../model/user.model';

const initialState: AppStore = {users: [], selectedUser: null};

export const crudReducer: ActionReducer<AppStore> = (state: AppStore = initialState, action: Action): AppStore => {
  switch (action.type) {
    case CrudActions.LOAD_USERS:
      return {
        users: [...action.payload],
        selectedUser: null
      };

    case CrudActions.DELETE_USER:
      return {
        users: state.users.filter(
          (element: User) => element.id !== action.payload),
        selectedUser: null
      };

    case CrudActions.CREATE_USER:
      return {
        users: [...state.users, action.payload],
        selectedUser: null
      };

    case CrudActions.UPDATE_USER:
      let index = -1;
      // clone users array with updated employee
      const users = state.users.map((employee: User, idx: number) => {
        if (employee.id === action.payload.id) {
          index = idx;
          return Object.assign({}, action.payload);
        }
        return employee;
      });

      const selectedUser = index >= 0 ? users[index] : null;
      return {users, selectedUser};

    default:
      return state;
  }
};
