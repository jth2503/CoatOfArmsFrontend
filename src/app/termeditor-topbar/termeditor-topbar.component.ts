import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Term} from "../models/term";
import {TermeditorClicks} from "../models/termeditor-clicks";

@Component({
  selector: 'app-termeditor-topbar',
  templateUrl: './termeditor-topbar.component.html',
  styleUrls: ['./termeditor-topbar.component.css']
})
export class TermeditorTopbarComponent implements OnInit {

  @Input() currentTerm!: Term;
  @Output() notify = new EventEmitter();
  CLICK_MODES = TermeditorClicks;

  constructor() { }

  ngOnInit(): void {
  }

}
