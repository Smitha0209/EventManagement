import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event/Event';
import { Member } from './member/Member';

@Injectable()
export class AppService {
    eventUrl = 'https://next.json-generator.com/api/json/get/Vk7OTypQ8';  // URL to event json
    memberUrl = 'https://next.json-generator.com/api/json/get/4kDBbTiku';  // URL to members json

    constructor(private http: HttpClient) { }

    /** GET Event list from the server */
    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.eventUrl);
    }

    /** GET members from the server */
    getMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(this.memberUrl);
    }
}