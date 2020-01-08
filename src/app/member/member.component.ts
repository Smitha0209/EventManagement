import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'

import { Member, MemberEvents } from './member';
import { Event } from '../event/event';
import { from } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  providers: [OrderPipe],
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  order: string = 'id';
  closeResult: string;
  confirmation: boolean = false;
  reverse: boolean = false;
  sortedCollection: any[];
  displayedColumns: string[] = ['firstName', 'age', 'company', 'email', 'phone', 'eventCount'];
  dataSource: any;
  members: Member[];
  events: Event[];
  memberEvents: MemberEvents[] = [];
  memberIds: any[] = [];
  eventSelect: string = "Select an Event";
  memberSelect: string = "Select a Member";
  memberDelete: string = "Select a Member";

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private orderPipe: OrderPipe, private modalService: NgbModal) {
    this.sortedCollection = orderPipe.transform(this.members, this.order);
  }
  
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {
    if (sessionStorage.getItem("memberList") !== undefined || sessionStorage.getItem("memberList") === null) {
      this.members = JSON.parse(sessionStorage.getItem("memberList"));
    }

    if (sessionStorage.getItem("eventList") !== undefined || sessionStorage.getItem("eventList") !== null) {
      this.events = JSON.parse(sessionStorage.getItem("eventList"));
    }

    if (sessionStorage.getItem("memberEvents") !== undefined && sessionStorage.getItem("memberEvents") !== null) {
      this.memberEvents = JSON.parse(sessionStorage.getItem("memberEvents"));
    }

    for(let member in this.members){
      this.memberIds.push(this.members[member]._id);
    }
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  deleteMember(deletecontent) {
    this.memberDelete = "Select a Member";
    this.modalService.open(deletecontent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(){
    let index = 0;
    for(let member in this.members){
      if(this.members[member]._id === this.memberDelete){
        this.members.splice(index,1);
        break;
      }
      index++;
    }    
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.sort = this.sort;
    sessionStorage.setItem("memberList", JSON.stringify(this.members));
    this.modalService.dismissAll();
  }

  addEvent(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveEvent() {
    let eventRegistered = false;
    let eventAdded = false;
    for(let member in this.members){
      if(this.members[member]._id === this.memberSelect){
        if(this.members[member].eventCount){
          for(let event in this.members[member].eventsReg){
            if(this.eventSelect === this.members[member].eventsReg[event]){
              eventRegistered = true;
              break;
            }
          }
          if(!eventRegistered){
            this.members[member].eventCount++;
            this.members[member].eventsReg.push(this.eventSelect);
            eventAdded = true;
          } else {
            alert("Already registered");
          }
        } else {
          this.members[member].eventCount++;
          this.members[member].eventsReg.push(this.eventSelect);
          eventAdded = true;
        }
        break;
      }
    }
    if(eventAdded){
      for(let event in this.events){
        if(this.events[event].company === this.eventSelect){
          this.events[event].capacity++;
          break;
        }
      }      
    }
    sessionStorage.setItem("memberList", JSON.stringify(this.members));
    sessionStorage.setItem("eventList", JSON.stringify(this.events));
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
