import { Component, OnInit } from '@angular/core';
import { Event } from './event';
//import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  //providers: [EventService],
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[];
  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("eventList") !== undefined || sessionStorage.getItem("eventList") !== null){
      this.events = JSON.parse(sessionStorage.getItem("eventList"));
    }
  }
}
