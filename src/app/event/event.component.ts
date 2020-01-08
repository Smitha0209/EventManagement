import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Event } from './event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  //providers: [EventService],
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent;
  events: Event[];
  closeResult: string;
  confirmation: boolean = false;
  reverse: boolean = false;
  displayedColumns: string[] = ['organizer', 'company', 'about', 'scheduled_at', 'duration', 'capacity'];
  dataSource: any;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'ORGANICA', start: new Date() }
  ];


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(sessionStorage.getItem("eventList") !== undefined || sessionStorage.getItem("eventList") !== null){
      this.events = JSON.parse(sessionStorage.getItem("eventList"));
    }
    this.dataSource = this.events;
    // for(let event in this.events){         For adding events from event list
    //   this.calendarEvents[event].title = this.events[event].company;      
    //   this.calendarEvents[event].start = this.events[event].scheduled_at;
    // }
  }

  openCalendar(calendar) {
    this.modalService.open(calendar, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal(){
    this.modalService.dismissAll();
  }  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
