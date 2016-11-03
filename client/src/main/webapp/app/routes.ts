import { ChatroomComponent } from './chatroom.component';
import { LoginFormComponent } from './loginform.component'
import { SecuredComponent } from './secured.component'

export const routes = [

    {
        path: '',
        component: ChatroomComponent,
        pathMatch: 'full'
    },

    {
        path: 'signin',
        component: LoginFormComponent
    },

    {
        path: 'secured',
        component: SecuredComponent
    }

];