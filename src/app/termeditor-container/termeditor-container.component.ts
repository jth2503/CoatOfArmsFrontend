import {Component, OnInit} from '@angular/core';
import {TermeditorBackendServiceService} from "../services/termeditor-backend-service.service";
import {Term} from "../models/term";
import {TermeditorClicks} from "../models/termeditor-clicks";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewTermDialogComponent} from "../components/termeditor/create-new-term-dialog/create-new-term-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddTermRelationshipDialogComponent} from "../components/termeditor/add-term-relationship-dialog/add-term-relationship-dialog.component";
import {EditTermDialogComponent} from "../components/termeditor/edit-term-dialog/edit-term-dialog.component";

@Component({
  selector: 'app-termeditor-container',
  templateUrl: './termeditor-container.component.html',
  styleUrls: ['./termeditor-container.component.css']
})
export class TermeditorContainerComponent implements OnInit {

  currentTerm: Term = new Term();
  selectedTerms: Term[] = [];
  CLICK_MODES = TermeditorClicks;

  constructor(private backendService: TermeditorBackendServiceService, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.backendService.getFirstTerms()
      .subscribe((data: Term[]) => {
        this.currentTerm.children = data;
      });
  }

  // this function handles the different click events and calls the appropriate function
  onNotify(data: any, mode: TermeditorClicks) {
    switch (mode) {
      case TermeditorClicks.TERM_SELECTED_DOWNWARDS:
        if (data.mode == TermeditorClicks.TERM_RELATIONSHIP_REMOVED)
          this.clickRemoveRelationship(data.uuid, true);
        else if (data.mode == TermeditorClicks.TERM_EDITED)
          this.clickTermEdited(data.term);
        else
          this.clickSelectionDownwards(data);
        break;
      case TermeditorClicks.TERM_SELECTED_UPWARDS:
        if (data.mode == TermeditorClicks.TERM_RELATIONSHIP_REMOVED)
          this.clickRemoveRelationship(data.uuid, false);
        else if (data.mode == TermeditorClicks.TERM_EDITED)
          this.clickTermEdited(data.term);
        else
          this.clickSelectionUpwards(data);
        break;
      case TermeditorClicks.BACK_TO_PREVIOUS:
        this.clickBackToPrevious();
        break;
      case TermeditorClicks.TERM_RELATIONSHIP_ADDED:
        this.clickAddRelationship();
        break;
      case TermeditorClicks.LIST_SELECTION:
        this.clickListSelection(data);
        break;
      case TermeditorClicks.NEW_TERM:
        this.clickCreateNewTerm();
        break;
      case TermeditorClicks.TERM_EDITED:
        this.clickTermEdited(this.currentTerm);
        break;
      case TermeditorClicks.TERM_DELETED:
        this.clickTermDeleted();
        break;
    }
  }

  // called when a term is selected in the downwards tab
  clickSelectionDownwards(data: any) {
    let newTerm = this.currentTerm.children.find(newTerm => newTerm.uuid == data);
    if (newTerm != undefined) {
      this.updateUIAfterSelection(newTerm);
    }
  }

  //called when a term is selected in the upwards tab
  clickSelectionUpwards(data: any) {
    let newTerm = this.currentTerm.parents.find(newTerm => newTerm.uuid == data);
    if (newTerm != undefined) {
      this.updateUIAfterSelection(newTerm);
    }
  }

  private updateUIAfterSelection(newTerm: Term) {
    this.selectedTerms.unshift(this.currentTerm);
    this.currentTerm = newTerm;

    this.backendService.getUpdateListsOfClicked(this.currentTerm.uuid, 1)
      .subscribe((data: Term[]) => {
        this.currentTerm.children = data;
      });

    this.backendService.getUpdateListsOfClicked(this.currentTerm.uuid, 0)
      .subscribe((data: Term[]) => {
        this.currentTerm.parents = data;
      });
  }

  // called when a child is removed from its parent or parent removed from its child
  clickRemoveRelationship(uuid: string, mode: boolean) {
    if (mode) {   // currentTerm is parent
      this.backendService.getRemoveTermRelationship(this.currentTerm.uuid, uuid)
        .subscribe((numberDeleted: number) => {
          if (numberDeleted > 0) {
            let removedChildIndex = this.currentTerm.children.findIndex(item => item.uuid == uuid);
            this.currentTerm.children.splice(removedChildIndex, 1);
          } else {
            this.snackbar.open(
              'Entfernen der Beziehung nicht möglich. Möglicherweise sind die Begriffe noch Teil einer Begriffskette.',
              'Verstanden',
              {duration: 5000});
          }
        });
    } else {      // currentTerm is child
      this.backendService.getRemoveTermRelationship(uuid, this.currentTerm.uuid)
        .subscribe((numberDeleted: number) => {
          if (numberDeleted > 0) {
            let removedChildIndex = this.currentTerm.parents.findIndex(item => item.uuid == uuid);
            this.currentTerm.parents.splice(removedChildIndex, 1);
          } else {
            this.snackbar.open(
              'Entfernen der Beziehung nicht möglich. Möglicherweise sind die Begriffe noch Teil einer Begriffskette.',
              'Verstanden',
              {duration: 5000});
          }
        });
    }
  }

  // called when a child is supposed to be added to the current term or current term is supposed to be a new child
  clickAddRelationship() {
    let dialogRef = this.dialog.open(AddTermRelationshipDialogComponent, {
        data: {uuid: this.currentTerm.uuid}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        if (result.mode == 0) {
          this.currentTerm.children.push(result.term)
        } else if (result.mode == 1) {
          this.currentTerm.parents.push(result.term)
        }
      }
    });
  }

  // called when the user hits the back to previous button
  clickBackToPrevious() {
    let previous = this.selectedTerms.shift();
    if (previous != undefined) {
      this.currentTerm = previous;
    }
  }

  // called when the user selects an item from the list
  clickListSelection(data: number) {
    this.currentTerm = this.selectedTerms[data];
    this.selectedTerms.splice(0, data + 1);
  }

  // opens the dialog to create a new Term
  clickCreateNewTerm() {
    let dialogRef = this.dialog.open(CreateNewTermDialogComponent, {
      data: {uuid: this.currentTerm.uuid}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        let newTerm = new Term();
        newTerm.deserialize({
          uuid: result.uuid,
          name: result.term.name,
          synonyms: result.term.synonyms,
          comment: result.term.comment,
          hide: result.term.hide,
          children: [],
          parents: []
        });
        newTerm.parents.push(this.currentTerm);
        this.currentTerm.children.push(newTerm);
      }
    });
  }

  // opens the dialog to edit a new term
  clickTermEdited(editedTerm: Term) {
    let dialogRef = this.dialog.open(EditTermDialogComponent, {
      data: {term: editedTerm}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        editedTerm.name = result.term.name;
        editedTerm.comment = result.term.comment;
        editedTerm.synonyms = result.term.synonyms;
        editedTerm.hide = result.term.hide;
      }
    })
  }

  // deletes the current term if possible
  clickTermDeleted() {
    let uuid = this.currentTerm.uuid;
    this.backendService.getDeleteTerm(uuid)
      .subscribe(result => {
        if (result.Chains > 0 && result.Terms > 0) {
          this.snackbar.open(
            'Löschen des Begriffs nicht möglich. Es sind noch ' + result.Chains + ' Begriffsketten und ' + result.Terms + ' andere Begriffe verknüpft.',
            'Verstanden',
            {duration: 5000});
        } else {
          this.snackbar.open(
            'Löschen des Begriffs erfolgreich.',
            'Verstanden',
            {duration: 5000});

          this.currentTerm = new Term();
          this.backendService.getFirstTerms()
            .subscribe((data: Term[]) => {
              this.currentTerm.children = data;
            });
          this.selectedTerms = this.selectedTerms.filter(term => term.uuid != uuid);
        }
      });
  }
}
