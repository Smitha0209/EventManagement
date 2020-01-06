import { Component, OnInit } from '@angular/core';
import { Event } from './event/Event';
import { Member } from './member/Member';
import { AppService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'event-management';
  members: Member[];
  events: Event[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    if(sessionStorage.getItem("memberList") === undefined || sessionStorage.getItem("memberList") === null){
      this.getMembers();
    }

    if(sessionStorage.getItem("eventList") === undefined || sessionStorage.getItem("eventList") === null){
      this.getEvents();
    }
  }

  getMembers(): void {
    this.appService.getMembers()
    .subscribe(
      members => (this.members = members, sessionStorage.setItem("memberList", JSON.stringify(this.members)))
    );
  }

  getEvents(): void {
    this.appService.getEvents()
    .subscribe(events => (this.events = events, sessionStorage.setItem("eventList", JSON.stringify(this.events)))
    );
  }
}
