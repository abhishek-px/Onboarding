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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: any = {};
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;

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

    let data = {
      email: this.forgotForm.email,
      userType: 'admin',
    };

    this._adminAuthAPI.forgotPassword(data).subscribe(
      (objS) => {
        // console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._toastrService.success(objS.message);
          // navigate to dashboard
          this._router.navigate(['/admin/auth/login']);
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
}
