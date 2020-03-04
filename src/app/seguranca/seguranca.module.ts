import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { JwtModule } from "@auth0/angular-jwt";
import { environment } from '../../environments/environment';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),

    InputTextModule,
    ButtonModule,
  ],
  exports:[
    LoginFormComponent,
    SegurancaRoutingModule
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
