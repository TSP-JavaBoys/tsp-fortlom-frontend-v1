import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Forum } from 'src/app/models/forum';

@Injectable({
  providedIn: 'root'
})
export class ArtistforumService {

  basePath='https://fortlombackend.azurewebsites.net/api/v1/artistforumservice';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError('Something happened with request, please try again later');
  }

  getAll(id: number): Observable<Forum> {
    return this.http.get<Forum>(`${this.basePath}/artists/${id}/forums`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  create(item: any,id:number): Observable<Forum> {
    return this.http.post<Forum>(`${this.basePath}/artists/${id}/forums`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
