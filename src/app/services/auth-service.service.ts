import { StorageServiceService } from './storage-service.service';
import { AuthRequest } from './../interfaces/auth-request.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private retrieverUserSubject: Subject<User> = new Subject<User>();
  private isLoggedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private storageService: StorageServiceService) { }

  observeAuthChanges(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  observeUserChanges(): Observable<User> {
    return this.retrieverUserSubject.asObservable();
  }

  login(request: AuthRequest): void {
    this.http.post<AuthResponse>(`${environment.GATEWAY_API}/${environment.AUTH_SERVICE_CONTEXT}/auth/login`, request).subscribe(
      (response: AuthResponse) => {
        this.storageService.setToken(response.token);
        this.storageService.setUser(response.user);
        
        this.retrieverUserSubject.next(response.user);
        this.isLoggedSubject.next(true);
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  logout(): void {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("token");
    
    this.isLoggedSubject.next(false);
    this.retrieverUserSubject.next(new User());
  }

  isLogged(): boolean {
    return this.storageService.getToken() != null;
  }
}
