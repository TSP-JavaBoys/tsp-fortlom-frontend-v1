import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Forum } from 'src/app/models/forum';
import {Publication} from "../../models/publication";

@Injectable({
  providedIn: 'root'
})
export class ArtistforumService {

  basePath = 'http://localhost:8080/api/v1/artistforumservice';
  //basePath='https://fortlomv5.azurewebsites.net/api/v1/artistforumservice';

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

  // Update Publicacion
  update(id: any, item: any): Observable<Forum> {
    return this.http.put<Forum>(`${this.basePath}/forums/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Publicacion
  delete(id: number) {
    return this.http.delete(`${this.basePath}/forums/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllForumByArtistId(artistId:number): Observable<Forum>
  {
    return this.http.get<Forum>(`${this.basePath}/artists/${artistId}/forums`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
