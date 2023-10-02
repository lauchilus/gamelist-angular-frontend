import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const currentmenu = route.url[0].path;
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.checkLogin()) {
    return true;
    // if (currentmenu == 'blog') {
    //   return true;
    // } else {
    //   alert('access denied');
    //   router.navigate(['']);
    //   return false;
    // }
  } else {
    alert('access denied');
    router.navigate(['login']);
    return false;
  }
};