import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || '');
  role$ = this.roleSubject.asObservable();

  setRole(role: string) {
    localStorage.setItem('userRole', role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.getValue();
  }
}
