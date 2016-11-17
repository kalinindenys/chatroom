System.register(['@angular/core', '@angular/forms', './authentication.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, authentication_service_1;
    var LoginFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LoginFormComponent = (function () {
                function LoginFormComponent(formBuilder, authService) {
                    this.formBuilder = formBuilder;
                    this.authService = authService;
                    this.loginForm = formBuilder.group({
                        login: ['', forms_1.Validators.required],
                        password: ['', forms_1.Validators.required]
                    });
                }
                LoginFormComponent.prototype.doLogin = function (event) {
                    var _this = this;
                    this.authService.login(this.loginForm.login, this.loginForm.password).subscribe(function (data) { return _this.serverResponse = JSON.stringify(data); }, // put the data returned from the server in our variable
                    function (// put the data returned from the server in our variable
                        error) { return console.log("Service response error"); }, // in case of failure show this message
                    function () { return console.log("Job Done Get !"); } //run this code in all cases
                     //run this code in all cases
                    );
                    console.log(this.loginForm.value);
                    event.preventDefault();
                };
                LoginFormComponent = __decorate([
                    core_1.Component({
                        selector: 'signIn-form',
                        templateUrl: "pages/login.component.html",
                        providers: [authentication_service_1.AuthenticationService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, authentication_service_1.AuthenticationService])
                ], LoginFormComponent);
                return LoginFormComponent;
                var _a;
            }());
            exports_1("LoginFormComponent", LoginFormComponent);
        }
    }
});
//# sourceMappingURL=loginform.component.js.map