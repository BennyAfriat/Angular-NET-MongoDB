import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {Message} from 'primeng/components/common/api';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStore} from '../../redux/app.store';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { finalize, takeUntil } from 'rxjs/operators';
import {UsersAppService} from '../../services/users-app.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {

  users: User[];
  selectedUser: User;
  userForDialog: User;
  displayDialog: boolean;
  msgs: Message[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppStore>, private userService: UsersAppService) { }

  ngOnInit(): void {
    this.store.select('crudReducer').pipe(takeUntil(this.destroy$)).subscribe(
      (store: AppStore) => {
        this.users = store.users;
        this.selectedUser = store.selectedUser;
      });

    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(
      action => this.store.dispatch(action),
      error => this.showError(error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  add() {
    // create an empty User
    this.userForDialog = {
      id: null, firstName: null, lastName: null, email: null, phone: null
    };

    this.displayDialog = true;
  }

  edit() {
    if (this.selectedUser == null) {
      return;
    }

    // create a clone of the selected User
    this.userForDialog = Object.assign({}, this.selectedUser);

    this.displayDialog = true;
  }

  remove() {
    if (this.selectedUser == null) {
      return;
    }

    this.userService.deleteUser(this.selectedUser.id)
      .pipe(finalize(() => {
        this.userForDialog = null;
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (action) => {
          this.store.dispatch(action);
          this.showSuccess('User was successfully removed');
        },
        error => this.showError(error)
      );
  }

  save() {
    if (this.userForDialog.id) {
      // update
      this.userService.updateUser(this.userForDialog)
        .pipe(finalize(() => {
          this.userForDialog = null;
          this.displayDialog = false;
        }))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (action) => {
            this.store.dispatch(action);
            this.showSuccess('User was successfully updated');
          },
          error => this.showError(error)
        );
    } else {
      // create
      this.userService.createUser(this.userForDialog)
        .pipe(finalize(() => {
          this.userForDialog = null;
          this.displayDialog = false;
        }))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (action) => {
            this.store.dispatch(action);
            this.showSuccess('User was successfully created');
          },
          error => this.showError(error)
        );
    }
  }

  private showError(errMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Sorry, an error occurred', detail: errMsg});
  }

  private showSuccess(successMsg: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', detail: successMsg});
  }

}
