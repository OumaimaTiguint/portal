import { PermissionsService } from './../../../services/permissions.service';
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
  allUsers: Observable<any>;
  allPermissions: Observable<any>
  active = []
  inactive = []
  selectedUser;

  catalog: boolean = false
  proposals1: boolean = false
  proposals2: boolean = false
  people: boolean = false
  orders: boolean = false
  constructor(
    private usersService: UsersService,
    private modalService: NgbModal,
    private permissionsService: PermissionsService
  ) { }

  deleteUser(id:string) {
    this.usersService.deleteUser(id).subscribe(res =>{ 
      window.location.reload();
    })
  }

  open(content, id) {
    this.modalService.open(content, {
      scrollable: true, ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      console.log(result)
    });
    this.usersService.getUserById(id).subscribe(res => {
      this.selectedUser = res
    })
    //check if the clicked user has their permission set
    this.allPermissions.subscribe(res=> {
      res.map(e => {
        if(e.userId === this.selectedUser._id) {
          this.catalog = e.catalog;
          this.proposals1 = e.proposals1;
          this.proposals2 = e.proposals2;
          this.people = e.people;
          this.orders = e.orders;
        } else {
          this.catalog, this.proposals1, this, this.proposals2, this.people, this.orders = false
        }
      })
    })
  }

  onCatalogCheck(){this.catalog = !this.catalog}
  onProposals1Check(){
    this.proposals1 = !this.proposals1;
    if(this.proposals1) {
      this.people = true
    } else {
      this.people = false
    }
  }
  onProposals2Check(){this.proposals2 = !this.proposals2}
  onOrders(){this.orders = !this.orders}

  onSubmit() {
    const { catalog, proposals1, proposals2, people, orders } = this;
    //check if the clicked user has their permission set
    this.allPermissions.subscribe(res=> {
      res.map(e => {
        if(e.userId === this.selectedUser._id) {
          //user's permissions are already set, edit them
          this.permissionsService.editPermissions(e._id, this.selectedUser._id, catalog, proposals1, proposals2, people, orders)
          .subscribe(response => {
            console.log(response)
            window.location.reload()
          }, error => {
            console.log({ error })
          })
        } else {
          //user's permissions aren't set, add them
          this.permissionsService.addPermissions(this.selectedUser._id, catalog, proposals1, proposals2, people, orders)
          .subscribe(response => {
            console.log(response)
            window.location.reload()
          }, error => {
            console.log({ error })
          })
        }
      })
    })
  }

  ngOnInit(): void {
    //get all users
    this.allUsers = this.usersService.getAllUsers()
    this.allUsers.subscribe(res => {
      res.map(e => {
        if(e.active === true) {
          //get only active users
          this.active.push(e)
        } else {
          //get only inactive users
          this.inactive.push(e)
        }
      })
    })

    //get all permissions
    this.allPermissions = this.permissionsService.getPermissions()
  }

}
