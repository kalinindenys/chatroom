System.register(['@angular/core', '@angular/router', './authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1;
    var SignedInGuard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            SignedInGuard = (function () {
                function SignedInGuard(authService, router) {
                    this.authService = authService;
                    this.router = router;
                }
                SignedInGuard.prototype.canActivate = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate(['/signin']);
                    }
                    return this.authService.isLoggedIn();
                };
                SignedInGuard = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], SignedInGuard);
                return SignedInGuard;
                var _a;
            }());
            exports_1("SignedInGuard", SignedInGuard);
        }
    }
});
//# sourceMappingURL=signed-in.guard.js.map