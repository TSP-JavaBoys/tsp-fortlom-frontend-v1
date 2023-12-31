import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Event } from 'src/app/models/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private currentEvent: Event | null = null;
  //basePath = 'https://fortlom-content.herokuapp.com/api/v1/contentservice';
  basePath = 'http://localhost:8080/api/v1/contentservice';
  //basePath = 'https://fortlomv5.azurewebsites.net/api/v1/contentservice';

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

constructor(private http: HttpClient) { }
  setCurrentEvent(event: Event) {
    this.currentEvent = event;
  }
  getCurrentEvent(): Event | null {
    return this.currentEvent;
  }
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


// Create Event
create(artistid:number,item: any): Observable<Event> {
  return this.http.post<Event>(`${this.basePath}/artist/${artistid}/events`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get Event by id
getById(id: any): Observable<Event> {
  return this.http.get<Event>(`${this.basePath}/event/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get All Events
getAll(): Observable<Event> {
  return this.http.get<Event>(`${this.basePath}/events`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getAllEventsByArtistId(artistId:number): Observable<Event>{
  return this.http.get<Event>(`${this.basePath}/artist/${artistId}/events`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
// Update Event
update(id: any, item: any): Observable<Event> {
  return this.http.put<Event>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
updateEventreleaseddate(eventId:number,releasedate:string): Observable<Event>{
  return this.http.put<Event>(`${this.basePath}/eventupdatereleseadedate/${eventId}/releasedate/${releasedate}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}
  updateEvent(eventId: number, item: any): Observable<Event> {
    return this.http.put<Event>(`${this.basePath}/eventupdate/${eventId}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(error => {
          console.error('Error en la solicitud:', error);
          return this.handleError(error);
        })
      );
  }
// Delete Event
delete(id: any) {
  return this.http.delete(`${this.basePath}/event/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

getImageByUserId(id:number){

  return this.http.get<Event>(`${this.basePath}/users/${id}/images`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}




















}
