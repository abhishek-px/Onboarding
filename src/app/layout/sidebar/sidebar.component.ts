import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../_services";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public pathname: any;

  constructor(
    public _sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    console.log("window", window.location.href)
    this.pathname = window.location.pathname
  }

  // status: boolean = false;
  menuBtn(){
    this._sidebarService.IsSideBarShow = !this._sidebarService.IsSideBarShow; 
  }
}
