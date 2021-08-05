import {Component, Inject, OnInit} from '@angular/core';
import {TermAtCreation} from "../../../models/term-at-creation";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TermeditorBackendServiceService} from "../../../services/termeditor-backend-service.service";
import {Term} from "../../../models/term";

@Component({
  selector: 'app-edit-term-dialog',
  templateUrl: './edit-term-dialog.component.html',
  styleUrls: ['./edit-term-dialog.component.css']
})
export class EditTermDialogComponent implements OnInit {

  spinnerHidden: boolean = false;
  nameInput = new FormControl('', [Validators.required]);
  newSynonym: string = '';
  copiedTerm: Term = new Term();

  constructor(
    public dialogRef: MatDialogRef<EditTermDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {term: Term},
    private backendService: TermeditorBackendServiceService) { }

  ngOnInit(): void {
    this.copiedTerm .deserialize({
      uuid: this.data.term.uuid,
      name: this.data.term.name,
      synonyms: this.data.term.synonyms,
      comment: this.data.term.comment,
      hide: this.data.term.hide,
      children: [],
      parents: []
    })
  }

  addSynonym() {
    if (this.newSynonym != '') {
      this.copiedTerm.synonyms.push(this.newSynonym);
      this.newSynonym = '';
    }
  }

  removeSynonym(index: number) {
    this.copiedTerm.synonyms.splice(index, 1);
  }

  saveTermToDatabase() {
    if (!this.nameInput.invalid){
      this.spinnerHidden = true;
      let {uuid, children, parents, ...dataOfTerm} = this.copiedTerm;
      this.backendService.postUpsertTerm(this.data.term.uuid, '', dataOfTerm)
        .subscribe(uuid => {
          this.dialogRef.close({term: this.copiedTerm});
        });
    }
  }
}
