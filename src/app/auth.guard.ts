import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.userService.loggedIn.pipe(
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } 
      }),tap(auth=>{
        if(!auth)
        {
          alert("Please login before ordering your food!!!");
          return this.router.navigate(['/user']);
        }
      })
    
    );
  }
}
