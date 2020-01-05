import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './Event';

@Injectable()
export class MembersService {
  eventUrl = 'https://next.json-generator.com/api/json/get/Vk7OTypQ8';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET members from the server */
  getEvents (): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }

 
  // #docregion addHero
  /** POST: add a new hero to the database */
//   addHero (hero: Hero): Observable<Hero> {
//     return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
//       .pipe(
//         catchError(this.handleError('addHero', hero))
//       );
//   }
//   // #enddocregion addHero

//   // #docregion deleteHero
//   /** DELETE: delete the hero from the server */
//   deleteHero (id: number): Observable<{}> {
//     const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
//     return this.http.delete(url, httpOptions)
//       .pipe(
//         catchError(this.handleError('deleteHero'))
//       );
//   }
//   // #enddocregion deleteHero

//   // #docregion updateHero
//   /** PUT: update the hero on the server. Returns the updated hero upon success. */
//   updateHero (hero: Hero): Observable<Hero> {
//     // #enddocregion updateHero
//     // #docregion update-headers
//     httpOptions.headers =
//       httpOptions.headers.set('Authorization', 'my-new-auth-token');
//     // #enddocregion update-headers

//     // #docregion updateHero
//     return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
//       .pipe(
//         catchError(this.handleError('updateHero', hero))
//       );
//   }
  // #enddocregion updateHero
}