import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { MaterializeModule } from 'angular2-materialize';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { KpiComponent } from './kpi/kpi.component';
import { ArApComponent } from './ar-ap/ar-ap.component';

import { UserService } from './user/user.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    CashFlowComponent,
    KpiComponent,
    ArApComponent,
    CHART_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterializeModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
