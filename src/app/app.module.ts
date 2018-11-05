import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { LogoutComponent } from './logout/logout.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListPoolComponent } from './list-pool/list-pool.component';
import { BetPoolDetailComponent } from './bet-pool-detail/bet-pool-detail.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ChatComponent } from './chat/chat.component';
import { BetsComponent } from './bets/bets.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeComponent,
    UnsubscribeComponent,
    LogoutComponent,
    EditUserComponent,
    ListPoolComponent,
    BetPoolDetailComponent,
    PriceChartComponent,
    ChatComponent,
    BetsComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
