import { PublicationPageComponent } from './pages/publication-page/publication-page.component';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesModule } from './pages/pages.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { TokenInterceptor } from './handlers/token.interceptor';
import { AuthGuard } from './handlers/auth.guard';
import { LoggedGuard } from './handlers/logged.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const AppRoutes: Route[] = [
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'publication/:id',
    component: PublicationPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    PagesModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AuthGuard,
    LoggedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
