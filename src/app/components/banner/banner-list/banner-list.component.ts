import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { BannerService, AuthService } from '../../../_services';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
})
export class BannerListComponent implements OnInit {
  submitted = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;

  page: any = 1;
  limit: any = 10;

  bannerList: any = [];
  bannerListLength: any = [];

  mediaUrl = environment.apiUrl + '/media/preview?filename=';

  searchForm: any = {
    search: '',
    status: '',
    userType: '',
    deviceType: '',
    name: '',
  };

  constructor(
    private _toastrService: ToastrService,
    private _bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.getBannersFromApi();
  }

  getBannersFromApi() {
    this.apiCalled = true;
    this._bannerService
      .getBanner({
        page: this.page,
        limit: this.limit,
        searchBy: this.searchForm.search,
        status: this.searchForm.status,
        userType: this.searchForm.userType,
        deviceType: this.searchForm.deviceType,
        name: this.searchForm.name,
      })
      .subscribe((objS) => {
        this.apiCalled = true;
        if ((objS.code = 200)) {
          this.bannerList = objS.data;
          this.bannerListLength = objS.data.docs;
        } else {
          this._toastrService.error(objS.message);
        }
      });
  }

  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getBannersFromApi();
  }

  deleteBanner(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this banner ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this._bannerService.dltBanner(request.id).subscribe(
          (objS) => {
            this.apiCalled = true;
            this.getBannersFromApi();
            this._toastrService.success(objS.message);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  deactiveBanner(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactive this banner ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        let data = {
          status: 0,
        };
        this._bannerService.statusBanner(request.id, data).subscribe(
          (objS) => {
            this.apiCalled = true;
            this.getBannersFromApi();
            this._toastrService.success(objS.message);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  activeBanner(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to activate this banner ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        let data = {
          status: 1,
        };
        this._bannerService.statusBanner(request.id, data).subscribe(
          (objS) => {
            this.apiCalled = true;
            this.getBannersFromApi();
            this._toastrService.success(objS.message);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
