import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashbordService } from 'src/app/_services/dashbord.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  submitted = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  dashBoardForm: any = {};
  dashBoardId: any = {};
  dashBoardList: any;
  dashBoardListLength: any = {};
  item: any;

  constructor(
    private _dashboard: DashbordService,
    private _toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  refreshList() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.apiCalled = true;
    this._dashboard.getDashBoardData({}).subscribe((objS) => {
      this.apiCalled = true;
      if ((objS.code = 200)) {
        this.dashBoardList = objS.data;
        this.dashBoardListLength = objS.data.docs;
      } else {
        this._toastrService.error(objS.message);
      }
    });
  }
}
