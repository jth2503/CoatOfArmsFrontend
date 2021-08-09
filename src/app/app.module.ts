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
import { TermComponent } from './components/termeditor/term/term.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { CreateNewTermDialogComponent } from './components/termeditor/create-new-term-dialog/create-new-term-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddTermRelationshipDialogComponent } from './components/termeditor/add-term-relationship-dialog/add-term-relationship-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import { EditTermDialogComponent } from './components/termeditor/edit-term-dialog/edit-term-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {CoaListComponent} from "./components/coa-editor/coa-list/coa-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UpsertCoaComponent } from './components/coa-editor/upsert-coa/upsert-coa.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    TermeditorContainerComponent,
    TermeditorTopbarComponent,
    TermeditorTermlistComponent,
    TermeditorTermcontainerComponent,
    TermComponent,
    CreateNewTermDialogComponent,
    AddTermRelationshipDialogComponent,
    EditTermDialogComponent,
    CoaListComponent,
    CoaListComponent,
    UpsertCoaComponent
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
      {path: "termeditor", component: TermeditorContainerComponent},
      {path: "coa-list", component: CoaListComponent},
      {path: "upsert-coa", component: UpsertCoaComponent},
      {path: "upsert-coa/:coaUUID", component: UpsertCoaComponent},
    ]),
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatRadioModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
