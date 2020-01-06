import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Member } from './member';
//import { MemberService } from './member.service';

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
  members: Member[];
  events: Event[];
  memberId: string;
  eventSelect: string = "Select an Event";
  constructor(private orderPipe: OrderPipe, private modalService: NgbModal) {
    this.sortedCollection = orderPipe.transform(this.members, this.order);
  }

  ngOnInit() {
    if (sessionStorage.getItem("memberList") !== undefined || sessionStorage.getItem("memberList") === null) {
      this.members = JSON.parse(sessionStorage.getItem("memberList"));
    }

    if (sessionStorage.getItem("eventList") !== undefined || sessionStorage.getItem("eventList") !== null) {
      this.events = JSON.parse(sessionStorage.getItem("eventList"));
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  deleteMember(member: Member) {
    this.confirmation = confirm("Are you sure you want to delete?");
    if (this.confirmation) {
      this.members.splice(this.members.findIndex(x => x == member), 1);
      sessionStorage.setItem("memberList", JSON.stringify(this.members));
    }
  }

  addEvent(content, memberId: string) {
    this.memberId = memberId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveEvent() {
    for(let element in this.members){
      if(this.members[element]._id === this.memberId){
        this.members[element].events++;
      }
    }
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
