import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Term} from "../../../models/term";

@Component({
  selector: 'app-term-card-selection',
  templateUrl: './term-card-selection.component.html',
  styleUrls: ['./term-card-selection.component.css']
})
export class TermCardSelectionComponent implements OnInit {

  @Input() term!: Term;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
