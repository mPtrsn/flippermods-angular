import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {ChartComponent} from './chart/chart.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {StartMenuComponent} from './start-menu/start-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthInterceptor} from './BasicAuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StartMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
