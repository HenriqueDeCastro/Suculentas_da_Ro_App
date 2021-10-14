import { DeviceService } from './../../services/device/device.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-routers-menu',
  templateUrl: './routers-menu.component.html',
  styleUrls: ['./routers-menu.component.scss']
})
export class RoutersMenuComponent implements OnInit {

  public mobile!: boolean;
  public loggedIn = this.userService.loggedIn()
  @Input() inputSideNav: MatSidenav | undefined;

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.mobile = this.deviceService.itsMobile();
  }

  navegar(event: MouseEvent, link: string): void {
    if(this.mobile) {
      this.bottomSheet.dismiss();
    }
    else if(this.inputSideNav) {
      this.inputSideNav.toggle();
    }

    event.preventDefault();
    this.router.navigate([link])
  }
}
