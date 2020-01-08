import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './Event';

@Injectable()
export class EventService {
  eventUrl = 'https://next.json-generator.com/api/json/get/Vk7OTypQ8';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET Event list from the server */
  getEvents (): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }
}