import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service'

@Injectable()
export class SignedInGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) {

    }

    canActivate() {
        // loggedIn = this.authService.isLoggedIn();

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/signin']);
        }

        return this.authService.isLoggedIn();
    }

}