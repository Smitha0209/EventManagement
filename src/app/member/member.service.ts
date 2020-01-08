import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable()
export class MemberService {
  memberUrl = 'https://next.json-generator.com/api/json/get/4kDBbTiku';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET members from the server */
  getMembers (): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl);
  }
}