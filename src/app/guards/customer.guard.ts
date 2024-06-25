import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { catchError, map, of } from 'rxjs';


export const customerGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const urlTreeReturn = router.createUrlTree(['/login']);

  if (token) {
    return userService.validateRole(token).pipe(
      map((res: any) => {
        if (res.roleEnum === 'ROLE_CUSTOMER') {
          localStorage.setItem('profileId', res.id);
          localStorage.setItem('name', res.name);
          
          if (!localStorage.getItem('shoppingCArt')) {
            localStorage.setItem('shoppingCArt', '[]');
          }

          return true;
        } else {
          return urlTreeReturn;
        }
      }),
      catchError(() => {
        return of(urlTreeReturn);
      })
    );
  } else {
    return of(urlTreeReturn);
  }
};
