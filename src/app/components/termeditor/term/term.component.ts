import {Component, Input, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {Term} from "../../../models/term";
import {TermeditorClicks} from "../../../models/termeditor-clicks";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditTermDialogComponent} from "../edit-term-dialog/edit-term-dialog.component";

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  @Input() term!: Term;
  @Output() notify = new EventEmitter();
  CLICK_MODES = TermeditorClicks;

  constructor() { }

  ngOnInit(): void {
  }

}
