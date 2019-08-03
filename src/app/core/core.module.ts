import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component'
import {HomeComponent} from './home/home.component'
import {SharedModule} from '../shared/share.module'
import {AppRoutingModule} from '../app-routing.module'
import { ShoppingList } from '../shopping-list.service';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import {LoggingInterceptor} from '../shared/logging.interceptor'

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [ CommonModule,SharedModule,AppRoutingModule],
    exports: [AppRoutingModule,HeaderComponent],
    providers: [ShoppingList,
        RecipeService,
        DataStorageService,
        AuthService,
        AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true
    },
    {
        provide: HTTP_INTERCEPTORS,useClass: LoggingInterceptor,multi:true
    }],
})
export class CoreModule {}