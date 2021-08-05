import {EventEmitter, ViewChild} from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Term} from "../models/term";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-termeditor-termlist',
  templateUrl: './termeditor-termlist.component.html',
  styleUrls: ['./termeditor-termlist.component.css']
})
export class TermeditorTermlistComponent implements OnInit {

  @Input() selectedTerms: Term[] = [];
  @ViewChild('list') list!: MatSelectionList;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelection(event: MatSelectionListChange) {
    let index = event.options[0].value;
    this.list.deselectAll();
    this.notify.emit(index);
  }
}
