import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HttpClientJsonpModule }    from '@angular/common/http';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { LogoutComponent } from './logout/logout.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListPoolComponent } from './list-pool/list-pool.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeComponent,
    UnsubscribeComponent,
    LogoutComponent,
    EditUserComponent,
    ListPoolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
