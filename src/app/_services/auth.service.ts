import { Injectable } from '@angular/core';
// import * as moment from 'moment';
// import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
    isLoggedIn() {
        throw new Error("Method not implemented.");
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    setDataAdmin(data: any) {
        localStorage.setItem('go_d_r_a', JSON.stringify(data)); //This is use for admin data
    }

    setTokenAdmin(token: string) {
        localStorage.setItem('go_d_r_a_t', token); //This is use for admin token
    }

    getAdminData() {
        return JSON.parse(localStorage.getItem('go_d_r_a') || '{}');
    }

    getTokenAdmin() {
        return localStorage.getItem('go_d_r_a_t');
    }

    isLoggedInAdmin() {
        return this.getTokenAdmin() !== null;
    }

    adminLogout() {
        localStorage.removeItem('go_d_r_a_t');
        localStorage.removeItem('go_d_r_a');
    }
}
