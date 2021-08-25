import { Component, OnInit } from '@angular/core';
import {TermeditorBackendServiceService} from "../../../services/termeditor-backend-service.service";
import {FormControl, Validators} from "@angular/forms";
import {RequireSelection} from "../../termeditor/add-term-relationship-dialog/require-selection";
import {Term} from "../../../models/term";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Chain} from "../../../models/chain";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-research-chain-dialog',
  templateUrl: './research-chain-dialog.component.html',
  styleUrls: ['./research-chain-dialog.component.css']
})
export class ResearchChainDialogComponent implements OnInit {

  normalSelection: boolean = false;
  customSelection: boolean = false;

  newChain: Chain = new Chain();
  currentTermsInGrid: Term[] = [];

  autocompleteControl = new FormControl('', [Validators.required, RequireSelection]);
  filteredTerms!: Observable<Term[]>;
  termList: Term[] = [];


  constructor(
    private backendService: TermeditorBackendServiceService,
    public dialogRef: MatDialogRef<ResearchChainDialogComponent>
  ) { }

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

  clickNormalEntry() {
    this.normalSelection = true;
    this.backendService.getFirstTerms()
      .subscribe(list => this.currentTermsInGrid = list);
  }
  clickChosenEntry() {
    this.customSelection = true;
  }

  onNotify(termUUID: string) {
    let selectedTerm = this.currentTermsInGrid.find(term => term.uuid == termUUID);
    if (selectedTerm != undefined) {
      this.newChain.containedTerms.push(selectedTerm);
      this.backendService.getUpdateListsOfClicked(termUUID, 1)
        .subscribe((data: Term[]) => {
          this.currentTermsInGrid = data;
        });
    }
  }

  removeLastTermFromChain () {
    this.newChain.containedTerms.pop();
    if (this.newChain.containedTerms.length > 0) {
      this.backendService.getUpdateListsOfClicked(this.newChain.containedTerms[this.newChain.containedTerms.length - 1].uuid, 1)
        .subscribe((data: Term[]) => {
          this.currentTermsInGrid = data;
        });
    } else {
      this.backendService.getFirstTerms()
        .subscribe((data: Term[]) => {
          this.currentTermsInGrid = data;
        });
    }
  }

  saveNewChain () {
    this.dialogRef.close({chain: this.newChain});
  }


  // functions for the autocomplete
  displayFn(term: Term): string {
    return term.name;
  }

  termSelected(selected: Term) {
    this.newChain.containedTerms.push(selected)
    this.backendService.getUpdateListsOfClicked(selected.uuid, 1)
      .subscribe((data: Term[]) => {
        this.currentTermsInGrid = data;
      });
    this.normalSelection = true;
    this.customSelection = false;
  }

  private filter(value: string): Term[] {
    const filterValue = value.toLowerCase();
    return this.termList.filter(term =>
      term.name.toLowerCase().includes(filterValue) ||
      term.synonyms.some(synonym => synonym.toLowerCase().includes(filterValue))
    );
  }
}
