import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService, AuthService } from '../../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = {};
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  public passwordTextType = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toastrService: ToastrService,
    private _adminAuthAPI: AdminService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this._authService.isLoggedInAdmin()) {
      // navigate to dashboard
      this._router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(invalid: any): void {
    // this.router.navigate(['/login']);
    // return;
    this.showError = true;
    if (invalid) return;
    if (this.loading) true;
    this.loading = true;
    // call api

    this._adminAuthAPI.login(this.loginForm).subscribe(
      (objS) => {
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // store login session in browser
          this._authService.setDataAdmin(objS.data.user);
          this._authService.setTokenAdmin(JSON.stringify(objS.data.tokens));

          this._router.navigate(['/admin/dashboard']);
          this._toastrService.success(objS.message);
          // navigate to dashboard
        } else {
          this.apiCalled = false;
          this.loading = false;
          this._toastrService.error(objS.message);
        }
      },
      (err) => {
        this._toastrService.error(err?.error?.message);
      }
    );
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
}
