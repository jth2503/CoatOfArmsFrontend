import {Component, Inject, OnInit} from '@angular/core';
import {TermeditorBackendServiceService} from "../../../services/termeditor-backend-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TermAtCreation} from "../../../models/term-at-creation";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-new-term-dialog',
  templateUrl: './create-new-term-dialog.component.html',
  styleUrls: ['./create-new-term-dialog.component.css']
})
export class CreateNewTermDialogComponent implements OnInit {

  newSynonym: string = '';
  newTerm: TermAtCreation = new TermAtCreation();
  spinnerHidden: boolean = false;
  nameInput = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CreateNewTermDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {uuid: string},
    private backendService: TermeditorBackendServiceService) { }

  ngOnInit(): void {
  }

  addSynonym() {
    if (this.newSynonym != '') {
      this.newTerm.synonyms.push(this.newSynonym);
      this.newSynonym = '';
    }
  }

  removeSynonym(index: number) {
    this.newTerm.synonyms.splice(index, 1);
  }

  saveTermToDatabase() {
    if (!this.nameInput.invalid){
      this.spinnerHidden = true;
      this.backendService.postUpsertTerm("", this.data.uuid, this.newTerm)
        .subscribe(uuid => {
          this.dialogRef.close({uuid: uuid, term: this.newTerm});
        });
    }
  }
}
