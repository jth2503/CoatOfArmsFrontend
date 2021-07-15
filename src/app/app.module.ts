import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterModule} from "@angular/router";
import { DummyComponent } from './dummy/dummy.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { TermeditorContainerComponent } from './termeditor-container/termeditor-container.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { TermeditorTopbarComponent } from './termeditor-topbar/termeditor-topbar.component';
import { TermeditorTermlistComponent } from './termeditor-termlist/termeditor-termlist.component';
import { TermeditorTermcontainerComponent } from './termeditor-termcontainer/termeditor-termcontainer.component';
import { TermeditorContentContainerComponent } from './termeditor-content-container/termeditor-content-container.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    TermeditorContainerComponent,
    TermeditorTopbarComponent,
    TermeditorTermlistComponent,
    TermeditorTermcontainerComponent,
    TermeditorContentContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot([
      {path: "", component: DummyComponent},
      {path: "termeditor", component: TermeditorContainerComponent}
    ]),
    MatTooltipModule,
    MatGridListModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
