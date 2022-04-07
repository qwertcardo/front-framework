import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { StorageServiceService } from '../services/storage-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService, private storageService: StorageServiceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: any;
    if (this.authService.isLogged()) {
      authRequest = req.clone({
        setHeaders: {
          Authorization: this.storageService.getToken()!,
        },
      });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}