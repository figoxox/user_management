import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersTableItem } from './dashboard/users-table/users-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER + '/getAllUsers')
  }

  public createUser(user: UsersTableItem) {
    return this.httpClient.post(
      this.REST_API_SERVER + '/createUser',
      user
      )
  }

  public confirmEmail(token: String) {
    return this.httpClient.put(
      this.REST_API_SERVER + '/confirmEmail/' + token, '')
  }
}
