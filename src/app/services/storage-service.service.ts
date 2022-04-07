import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  setToken(token: string): void {
    window.sessionStorage.setItem("token", token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem("token");;
  }

  setUser(user: User): void {
    const parsed = JSON.stringify(user);
    window.sessionStorage.setItem("user", parsed);
  }

  getUser(): User | null {
    const user = window.sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}
