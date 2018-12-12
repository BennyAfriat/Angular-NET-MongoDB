import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {APP_BASE_HREF} from '@angular/common';

import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {MessagesModule} from 'primeng/components/messages/messages';

import {UsersAppService} from './services/users-app.service';
import {CrudActions} from './redux/crud.actions';
import {crudReducer} from './redux/crud.reducer';

import { AppComponent } from './app.component';
import { CrudComponent } from './components/crud.component/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({crudReducer}),
    FormsModule,
    ButtonModule,
    InputTextModule,
    DataTableModule,
    DialogModule,
    MessagesModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    UsersAppService,
    CrudActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
