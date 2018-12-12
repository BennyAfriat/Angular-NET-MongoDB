import {InjectionToken, ModuleWithProviders} from '@angular/core';
import {StoreConfig} from '@ngrx/store/src/store_module';
import {Action, ActionReducer, ActionReducerMap} from '@ngrx/store/src/models';

declare module '@ngrx/store' {
  interface Action {
    type: string;
    payload?: any;
  }
  type ActionReducer<T, V extends Action = Action> = (state: T | undefined, action: V) => T;
   class StoreModule {
    static forRoot<T, V extends Action = Action>(reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: StoreConfig<T, V>): ModuleWithProviders;
    static forFeature<T, V extends Action = Action>(featureName: string, reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: StoreConfig<T, V>): ModuleWithProviders;
    static forFeature<T, V extends Action = Action>(featureName: string, reducer: ActionReducer<T, V> | InjectionToken<ActionReducer<T, V>>, config?: StoreConfig<T, V>): ModuleWithProviders;
  }
}
