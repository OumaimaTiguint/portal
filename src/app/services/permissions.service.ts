import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  getPermissions() {
    return this.http.get("http://localhost:5000/p/")
  }
  addPermissions(userId, catalog, proposals1, proposals2, people, orders) {
    return this.http.post("http://localhost:5000/p/add/", 
    {userId, catalog, proposals1, proposals2, people, orders})
  }
  editPermissions(id, userId, catalog, proposals1, proposals2, people, orders) {
    return this.http.post("http://localhost:5000/p/update/" + id, 
    {userId, catalog, proposals1, proposals2, people, orders})
  }
}
