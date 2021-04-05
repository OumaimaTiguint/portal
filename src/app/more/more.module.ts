import { MoreRoutingModule } from './more-routing.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SharedComponent } from './shared/shared.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [SidenavComponent, TopnavComponent, SharedComponent, UsersComponent],
  imports: [
    CommonModule,
    MoreRoutingModule,
    NgbModule
  ]
})
export class MoreModule { }
