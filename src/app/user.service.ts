import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  /**
  
   * @param user 
   */
  createUser(user: User): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}` + `/create`, user)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
  }

  updateUser(user: User): Observable<any> {
      return this.http.put<any> (`${this.baseUrl}` + `/updatebyid/` + user.id, user)
        .pipe(
            retry(3),
            catchError(this.handleError)
          );
  }

  deleteUser(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}` + `/deletebyid/` + id)
            .pipe(
              retry(3),
              catchError(this.handleError)  
            );
  }

  
  retrieveAllUsers(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}` + `/retrieveinfos`)
                    .pipe(
                      retry(3),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  };
}