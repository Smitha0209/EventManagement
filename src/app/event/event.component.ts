import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  providers: [EventService],
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
    .subscribe(events => (this.events = events)
    );
  }

}
