import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {ChartComponent} from './chart/chart.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {StartMenuComponent} from './start-menu/start-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './api.service';
import {SocketService} from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StartMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
