import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastaConfig } from 'ngx-toasta';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(
    private toastaConfig: ToastaConfig,
    private router: Router
    ) {
    this.toastaConfig.theme = 'bootstrap';
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

  exibindoFooter() {
    return this.router.url !== '/login';
  }

}