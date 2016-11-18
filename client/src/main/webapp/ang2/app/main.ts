import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import {APP_BASE_HREF} from '@angular/common';

import { SignedInGuard } from './signed-in.guard';

import { ChatroomRouter } from './chatroom.router';
import { ChatroomComponent } from './chatroom.component';
import { UserComponent } from './user.component';
import { LoginFormComponent } from './loginform.component'
import { SecuredComponent } from './secured.component'
import { routes } from './routes';
import {AuthenticationService} from "./authentication.service";

@NgModule({
    bootstrap: [ChatroomRouter],
    declarations: [
        ChatroomRouter,
        ChatroomComponent,
        LoginFormComponent,
        SecuredComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        SignedInGuard,
        AuthenticationService,
        {provide: APP_BASE_HREF, useValue : '/'},
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
class MainModule {}


platformBrowserDynamic().bootstrapModule(MainModule);