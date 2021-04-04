import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get("http://localhost:5000/u/")
  }
  deleteUser(id:string) {
    return this.http.delete("http://localhost:5000/u/delete/" + id);
  }
  editUser(id, name, email, role, active) {
    return this.http.post("http://localhost:5000/u/update/"+ id, {name, email, role, active})
  }
  getUserById(id) {
    return this.http.get("http://localhost:5000/u/"+ id)
  }
}
