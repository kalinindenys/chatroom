import { SignedInGuard } from './signed-in.guard';

import { ChatroomComponent } from './chatroom.component';
import { LoginFormComponent } from './loginform.component'
import { SecuredComponent } from './secured.component'

export const routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: ChatroomComponent,
        pathMatch: 'full'
    },

    {
        path: 'signin',
        component: LoginFormComponent
    },

    {
        path: 'secured',
        component: SecuredComponent,
        canActivate: [SignedInGuard]
    }

];