import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    { email: 'docente@example.com', password: '123456', role: 'docente' },
    { email: 'alumno@example.com', password: 'abcdef', role: 'alumno' }
  ];

  constructor() { }

  login(email: string, password: string): string | null {
    const user = this.users.find(user => user.email === email && user.password === password);

    return user ? user.role : null;
  }
}