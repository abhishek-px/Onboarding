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
  ) { }

  ngOnInit(): void {
    this.getBannersFromApi();
  }

  getBannersFromApi() {
    this.apiCalled = true;
    this._bannerService.getBanner().subscribe(
      (objS) => {
        this.apiCalled = true;
        console.log('API Response:', objS); // Check the full API response

        if (objS.code === 200) {
          console.log('Banners Data:', objS.data); // Check the actual data
          this.bannerList = objS.data;
          this.bannerListLength = objS.data.docs;

          // Log the bannerList to the console
          console.log('Banner List:', this.bannerList);
        } else {
          this._toastrService.error(objS.message);
        }
      },
      (err) => {
        console.error('Error fetching banners:', err);
        this._toastrService.error('Failed to fetch banner data.');
      }
    );
  }


  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getBannersFromApi();
  }

  
}
