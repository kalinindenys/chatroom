import { bootstrap }            from 'angular2/platform/browser';

import {provide} from 'angular2/core';

import { HTTP_PROVIDERS }       from 'angular2/http';
import { XSRFStrategy }         from 'angu;ar2/http';
import { CookieXSRFStrategy }   from 'angular2/http';

import { ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy } from 'angular2/router';

import 'rxjs/Rx';

import { ChatroomRouter }    from './chatroom.router';

bootstrap(ChatroomRouter, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })]).catch(err =>console.error(err));

// bootstrap(LoginFormComponent,
//     [
//         HTTP_PROVIDERS,
//         // {provide:XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')}
//     ]).catch(err =>console.error(err));