import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewMemberFormComponent } from './new-member-form/new-member-form.component';
import { MembersListComponent } from './members-list/members-list.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './authInterceptor';
import { AuthService } from 'src/services/auth.service';
import { MembersService } from 'src/services/members.service';
import { TextMaskModule } from 'angular2-text-mask';
import { DataService } from 'src/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    NewMemberFormComponent,
    MembersListComponent,
    TopNavbarComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN',
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    TextMaskModule,
  ],
  providers: [
    AuthService,
    MembersService,
    DataService,
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
