System.register(['./signed-in.guard', './chatroom.component', './loginform.component', './secured.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var signed_in_guard_1, chatroom_component_1, loginform_component_1, secured_component_1;
    var routes;
    return {
        setters:[
            function (signed_in_guard_1_1) {
                signed_in_guard_1 = signed_in_guard_1_1;
            },
            function (chatroom_component_1_1) {
                chatroom_component_1 = chatroom_component_1_1;
            },
            function (loginform_component_1_1) {
                loginform_component_1 = loginform_component_1_1;
            },
            function (secured_component_1_1) {
                secured_component_1 = secured_component_1_1;
            }],
        execute: function() {
            exports_1("routes", routes = [
                {
                    path: '',
                    redirectTo: '/home',
                    pathMatch: 'full'
                },
                {
                    path: 'home',
                    component: chatroom_component_1.ChatroomComponent,
                },
                {
                    path: 'signin',
                    component: loginform_component_1.LoginFormComponent
                },
                {
                    path: 'secured',
                    component: secured_component_1.SecuredComponent,
                    canActivate: [signed_in_guard_1.SignedInGuard]
                }
            ]);
        }
    }
});
//# sourceMappingURL=routes.js.map