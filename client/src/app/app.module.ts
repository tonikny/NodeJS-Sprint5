import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { XatComponent } from './xat/xat.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.REST_SERVER_URL,
  options: {
    // transports: ['websocket'],
    // //protocols: ["my-protocol-v1"],
    // withCredentials: true,
    // // //autoConnect: false,
    // // //upgrade: true,
    // query: {
    //   'x-token': sessionStorage.getItem('access_token'),
    // },
    //   extraHeaders: {
    //     Authorization: "Bearer "+sessionStorage.getItem('access_token')
    //   }
  },
};

//console.log('access_token',sessionStorage.getItem('access_token'));

@NgModule({
  declarations: [AppComponent, XatComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
