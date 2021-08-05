import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Term} from "../models/term";

@Component({
  selector: 'app-termeditor-termcontainer',
  templateUrl: './termeditor-termcontainer.component.html',
  styleUrls: ['./termeditor-termcontainer.component.css']
})
export class TermeditorTermcontainerComponent implements OnInit {

  @Input() terms!: Term[];
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNotify(data: any) {
    this.notify.emit(data);
  }
}
