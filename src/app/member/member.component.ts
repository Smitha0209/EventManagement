import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  providers: [MemberService, OrderPipe],
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  order: string = 'name.first';
  reverse: boolean = false;
  sortedCollection: any[];
  members: Member[];
  constructor(private membersService: MemberService, private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.members, this.order);
  }

  ngOnInit() {
    if(sessionStorage.getItem("memberList") === undefined || sessionStorage.getItem("memberList") === null){
      this.getMembers();
    } else {
      this.members = JSON.parse(sessionStorage.getItem("memberList"));
    }
  }

  getMembers(): void {
    this.membersService.getMembers()
    .subscribe(
      members => (this.members = members, sessionStorage.setItem("memberList", JSON.stringify(this.members)))
    );
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  deleteMember(index: number) : Member[] {
    if (index !== -1) {
      this.members.splice(index, 1);
    }
    console.log(this.members);
    return this.members;
  }

}
