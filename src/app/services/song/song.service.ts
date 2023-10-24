import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Song} from "../../models/Song";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  basePath='http://localhost:8080/api/v1/userservice/albums/songs'

  httpOptions ={
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

  getAll(): Observable<Song>{
    return this.http.get<Song>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Song>{
    return  this.http.put<Song>(`${this.basePath}/song/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  getAlbumsByAlbumId(id: any): Observable<Song>{
    return this.http.get<Song>(`${this.basePath}/album/${id}/songs`, this.httpOptions)
  }

  create(id: any, item: any): Observable<Song>{
    return this.http.post<Song>(`${this.basePath}/album/${id}/newSong`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
