import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { catchError, map, of } from 'rxjs';


export const drugstoreGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const urlTreeReturn = router.createUrlTree(['/login']);

  const token = localStorage.getItem('token');

  if (token) {
    return userService.validateRole(token).pipe(
      map((res: any) => {
        if (res.roleEnum === 'ROLE_DRUGSTORE') {
          localStorage.setItem('profileId', res.id);
          localStorage.setItem('name', res.name);

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
