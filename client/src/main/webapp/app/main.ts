import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import {APP_BASE_HREF} from '@angular/common';

import { ChatroomRouter } from './chatroom.router';
import { ChatroomComponent } from './chatroom.component';
import { LoginFormComponent } from './loginform.component'
import { SecuredComponent } from './secured.component'
import { routes } from './routes';

@NgModule({
    bootstrap: [ChatroomRouter],
    declarations: [
        ChatroomRouter,
        ChatroomComponent,
        LoginFormComponent,
        SecuredComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/'}
    ]
})
class MainModule {}


platformBrowserDynamic().bootstrapModule(MainModule);