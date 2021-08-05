import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TermeditorBackendServiceService} from "../../../services/termeditor-backend-service.service";
import {Term} from "../../../models/term";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {RequireSelection} from "./require-selection";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-term-relationship-dialog',
  templateUrl: './add-term-relationship-dialog.component.html',
  styleUrls: ['./add-term-relationship-dialog.component.css']
})
export class AddTermRelationshipDialogComponent implements OnInit {

  autocompleteControl = new FormControl('', [Validators.required, RequireSelection]);
  termList: Term[] = [];
  filteredTerms!: Observable<Term[]>;
  selectedTerm: Term | undefined;
  selectedOption: number = 0;
  spinnerHidden: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddTermRelationshipDialogComponent>,
    private backendService: TermeditorBackendServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {uuid: string}) { }

  ngOnInit(): void {
    this.backendService.getAllTerms()
      .subscribe((data: Term[]) => {
        this.termList = data;
      });

    this.filteredTerms = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.termList.slice())
      )
  }

  displayFn(term: Term): string {
    return term.name;
  }

  private filter(value: string): Term[] {
    const filterValue = value.toLowerCase();
    return this.termList.filter(term =>
      term.name.toLowerCase().includes(filterValue) ||
      term.synonyms.some(synonym => synonym.toLowerCase().includes(filterValue))
    );
  }

  termSelected(selected: Term) {
    this.selectedTerm = selected;
  }

  optionSelected(option: number) {
    this.selectedOption = option;
  }

  saveNewRelationship() {
    if (!this.autocompleteControl.invalid && this.selectedTerm != undefined) {
      this.spinnerHidden = true;
      if (this.selectedOption == 0) {
        this.backendService.getAddTermRelationship(this.data.uuid, this.selectedTerm.uuid)
          .subscribe(() => this.dialogRef.close({mode: this.selectedOption, term: this.selectedTerm}));
      } else if (this.selectedOption == 1) {
        this.backendService.getAddTermRelationship(this.selectedTerm.uuid, this.data.uuid)
          .subscribe(() => this.dialogRef.close({mode: this.selectedOption, term: this.selectedTerm}));
      }
    }
  }
}
