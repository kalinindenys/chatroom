import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { ChatroomComponent } from './chatroom.component';
import { LoginFormComponent } from './loginform.component'
import {ConfirmDialogService} from "./confirm-dialog.service";
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'chatroom-router',
    templateUrl: 'pages/chatroom.router.html',
    providers: [ConfirmDialogService, AuthenticationService],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([

    {
        path: '/home',
        name: 'Home',
        component: ChatroomComponent,
        useAsDefault: true
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginFormComponent
    }

])
export class ChatroomRouter {

}
