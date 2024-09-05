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
    return userService.validateRole().pipe(
      map((res: any) => {
        if (res.role === 'ROLE_CUSTOMER') {
          localStorage.setItem('profileId', res.id);
          localStorage.setItem('name', res.name);
          
          if (!localStorage.getItem('shoppingCart')) {
            localStorage.setItem('shoppingCart', '[]');
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
