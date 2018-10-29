import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { LogoutComponent } from './logout/logout.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListPoolComponent } from './list-pool/list-pool.component';

import { BetPoolDetailComponent }  from './bet-pool-detail/bet-pool-detail.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { ChatComponent } from './chat/chat.component';
import { BetsComponent } from './bets/bets.component';
import { UserAccountComponent } from './user-account/user-account.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'editUser', component: EditUserComponent},
  { path: 'listPool', component: ListPoolComponent},
  { path: 'unsubscribe', component: UnsubscribeComponent},
  { path: 'poolDetail/:id', component: BetPoolDetailComponent},
  { path: 'chart', component: PriceChartComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'bets', component: BetsComponent},
  { path: 'account', component: UserAccountComponent}

];


@NgModule({
  exports: [ RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {
  
 }
