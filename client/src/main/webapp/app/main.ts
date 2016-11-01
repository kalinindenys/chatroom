import { bootstrap }            from 'angular2/platform/browser';
import { HTTP_PROVIDERS }       from "angular2/http";
import 'rxjs/Rx';
import { ChatroomComponent }    from './chatroom.component';
import { LoginFormComponent }   from './loginform.component'

// bootstrap(ChatroomComponent);
bootstrap(LoginFormComponent, [HTTP_PROVIDERS])
    .catch(err =>console.error(err));