import { Component, OnInit } from '@angular/core';
import {Chain} from "../../../models/chain";
import {Term} from "../../../models/term";
import {TermeditorBackendServiceService} from "../../../services/termeditor-backend-service.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-new-chain-dialog',
  templateUrl: './create-new-chain-dialog.component.html',
  styleUrls: ['./create-new-chain-dialog.component.css']
})
export class CreateNewChainDialogComponent implements OnInit {

  newChain: Chain = new Chain();
  currentTerms: Term[] = [];

  constructor(
    private backendService: TermeditorBackendServiceService,
    public dialogRef: MatDialogRef<CreateNewChainDialogComponent>) { }

  ngOnInit(): void {
    this.backendService.getFirstTerms()
      .subscribe((data: Term[]) => {
        this.currentTerms = data;
      });
  }

  onNotify(termUUID: string) {
    let selectedTerm = this.currentTerms.find(term => term.uuid == termUUID);
    if (selectedTerm != undefined) {
      this.newChain.containedTerms.push(selectedTerm);
      this.backendService.getUpdateListsOfClicked(termUUID, 1)
        .subscribe((data: Term[]) => {
          this.currentTerms = data;
        });
    }
  }

  removeLastTermFromChain () {
    this.newChain.containedTerms.pop();
    if (this.newChain.containedTerms.length > 0) {
      this.backendService.getUpdateListsOfClicked(this.newChain.containedTerms[this.newChain.containedTerms.length - 1].uuid, 1)
        .subscribe((data: Term[]) => {
          this.currentTerms = data;
        });
    } else {
      this.backendService.getFirstTerms()
        .subscribe((data: Term[]) => {
          this.currentTerms = data;
        });
    }
  }

  saveNewChain () {
    this.dialogRef.close({chain: this.newChain});
  }
}
