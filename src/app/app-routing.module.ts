import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'unsubscribe', component: UnsubscribeComponent}

];


@NgModule({
  exports: [ RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {
  
 }
