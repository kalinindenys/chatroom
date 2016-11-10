System.register(['@angular/core', '@angular/platform-browser', '@angular/router', '@angular/http', '@angular/forms', '@angular/common', '@angular/platform-browser-dynamic', './signed-in.guard', './chatroom.router', './chatroom.component', './user.component', './loginform.component', './secured.component', './routes', "./authentication.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, router_1, http_1, forms_1, common_1, platform_browser_dynamic_1, common_2, signed_in_guard_1, chatroom_router_1, chatroom_component_1, user_component_1, loginform_component_1, secured_component_1, routes_1, authentication_service_1;
    var MainModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (signed_in_guard_1_1) {
                signed_in_guard_1 = signed_in_guard_1_1;
            },
            function (chatroom_router_1_1) {
                chatroom_router_1 = chatroom_router_1_1;
            },
            function (chatroom_component_1_1) {
                chatroom_component_1 = chatroom_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (loginform_component_1_1) {
                loginform_component_1 = loginform_component_1_1;
            },
            function (secured_component_1_1) {
                secured_component_1 = secured_component_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            MainModule = (function () {
                function MainModule() {
                }
                MainModule = __decorate([
                    core_1.NgModule({
                        bootstrap: [chatroom_router_1.ChatroomRouter],
                        declarations: [
                            chatroom_router_1.ChatroomRouter,
                            chatroom_component_1.ChatroomComponent,
                            loginform_component_1.LoginFormComponent,
                            secured_component_1.SecuredComponent,
                            user_component_1.UserComponent
                        ],
                        imports: [
                            platform_browser_1.BrowserModule,
                            http_1.HttpModule,
                            router_1.RouterModule.forRoot(routes_1.routes),
                            forms_1.FormsModule,
                            forms_1.ReactiveFormsModule
                        ],
                        providers: [
                            signed_in_guard_1.SignedInGuard,
                            authentication_service_1.AuthenticationService,
                            { provide: common_2.APP_BASE_HREF, useValue: '/' },
                            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MainModule);
                return MainModule;
            }());
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(MainModule);
        }
    }
});
//# sourceMappingURL=main.js.map