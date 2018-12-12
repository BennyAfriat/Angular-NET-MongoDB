import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../model/user.model';
import {CrudActions} from '../redux/crud.actions';
import {Action} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersAppService {

  private backendUrl: string;
  constructor(private http: HttpClient, private crudActions: CrudActions) {
    this.backendUrl = '/api/user';
  }

  getUsers(): Observable<Action> {
    return this.http.get(this.backendUrl)
      .pipe(map(response => response as User[]))
      .pipe(map(users => this.crudActions.loadUsers(users)));
  }

  createUser(user: User): Observable<Action> {
    return this.http.post(this.backendUrl, user)
      .pipe(map(response => response as User))
      .pipe(map(createdUser => this.crudActions.createUser(createdUser)));
  }

  updateUser(user: User): Observable<Action> {
    return this.http.put(this.backendUrl, user)
      .pipe(map(() => this.crudActions.updateUser(user)));
  }

  deleteUser(id: string): Observable<Action> {
    return this.http.delete(this.backendUrl + '/' + id)
      .pipe(map(() => this.crudActions.deleteUser(id)));
  }
}
