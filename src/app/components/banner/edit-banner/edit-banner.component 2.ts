import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, BannerService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {

  submitted = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  bannerForm: any = {};
  bannerId: any = {}
  mediaUrl = environment.apiUrl + '/media/preview?filename=';

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _bannerService :BannerService,
    private _authService :AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.bannerId = this.activatedRoute.snapshot.params['id'];
      this.getBannerDetailFormApi(this.bannerId)
    }
  }

  getBannerDetailFormApi(id: any){
    this._bannerService.getBannerDetails(this.bannerId).subscribe(objS => {
      if(objS['data']) {
        this.bannerForm = objS['data'];
        this.bannerForm.image = this.mediaUrl + objS['data'].image
        
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    if (files.length === 0) return;
    const fsize = files[0].size;
    const file = Math.round((fsize / 1024 / 1024));
    console.log('call size====', fsize, file, mimeType)
    
    // image max size
    if (!(file <= 2)) {
      return this._toastrService.warning("File too Big, please select a file less than 2mb")
    }

    // accept image 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return this._toastrService.info("Only images are supported.");
    }
    var reader = new FileReader();
    this.bannerForm.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.bannerForm.image = reader.result;
    }
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    if (valid) {
      this.spinner.show();
      this.loading = true;

      const formdata = new FormData();
      if (this.bannerForm.file) {
        formdata.append('image', this.bannerForm.file);
      }
      formdata.append('title', this.bannerForm.title);
      formdata.append('description', this.bannerForm.description);

      this._bannerService.addBanner(formdata).subscribe(objS => {
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._toastrService.success(objS.message);
          this.spinner.hide();
          this.loading = false;
          this.router.navigate(['/banner/list']);
        } else {
          this._toastrService.error(objS.message);
          this.spinner.hide();
          this.loading = false;
        }
      }, (err) => {
        this.loading = this.showError = false;
        console.log('err', err)
        this.spinner.hide();
      });
    }
  }

}
