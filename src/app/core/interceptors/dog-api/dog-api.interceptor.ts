import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { BaseApiResponse } from '../../models/dog-api.model';

export const dogApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.API_URL))
    return next(req);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body as BaseApiResponse<any>;

        if(body.status != 'success')
          throw new Error(`Dog API returned an error status: ${body?.status}`);

        return event.clone({ body: event.body.message });
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Dog API Error:', error);
      return throwError(() => new Error('Error fetching dog API data.'));
    })
  )
};
