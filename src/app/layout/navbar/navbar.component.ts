import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  AdminService,
  AuthService,
  updateHeaderService,
  SidebarService,
} from '../../_services';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userType: any = '';
  header: any;
  profile: any = {};
  myForm: any;
  profilePhoto: any;
  mediaUrl = environment.apiUrl;

  constructor(
    private _router: Router,
    private _adminService: AdminService,
    private _toastrService: ToastrService,
    private _authService: AuthService,
    public _sidebarService: SidebarService,
    private _header: updateHeaderService
  ) {}

  ngOnInit(): void {
    this._header.$isCalledService.subscribe((data: any) => {
      console.log('print top nav bar--', data);
      if (data) {
        this.userType = localStorage.getItem('userType');
        this.profile = this._authService.getAdminData();
        this.myForm = this.profile;
        this.profilePhoto =
          this.mediaUrl +
          '/media/preview?filename=' +
          this.profile.profileImage;
      }
    });
    this.userType = localStorage.getItem('userType');
    this.profile = this._authService.getAdminData();
    this.myForm = this.profile;
    this.profilePhoto =
      this.mediaUrl + '/media/preview?filename=' + this.profile.profileImage;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,logout',
    }).then((result: any) => {
      if (result.value) {
        this._authService.adminLogout();
        this._router.navigate(['/admin/auth/login']);
        this._toastrService.success('Logout successfully');
      }
    });
  }
  // showSidebar() {
  //   this._sidebarService.IsSideBarShow = !this._sidebarService.IsSideBarShow;
  // }
}
