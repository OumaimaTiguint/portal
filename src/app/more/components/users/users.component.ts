import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  showDropdown: boolean;
  allUsers: Observable<any>
  active = []
  inactive = []
  selectedUser;
  constructor(
    private usersService:UsersService,
    private modalService: NgbModal
  ) { }

  deleteUser(id:string) {
    this.usersService.deleteUser(id).subscribe(res =>{ 
      window.location.reload();
    })
  }

  open(content, id) {
    this.modalService.open(content, {
      size: 'lg', scrollable: true, ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      console.log(result)
    });
    this.usersService.getUserById(id).subscribe(res => {
      this.selectedUser = res
    })
  }

  ngOnInit(): void {
    this.allUsers = this.usersService.getAllUsers()
    this.allUsers.subscribe(res => {
      res.map(e => {
        if(e.active === true) {
          this.active.push(e)
        } else {
          this.inactive.push(e)
        }
      })
    })
  }

}
