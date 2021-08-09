import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoaEditorBackendServiceService} from "../../../services/coa-editor-backend-service.service";
import {CoatOfArms} from "../../../models/coat-of-arms";

@Component({
  selector: 'app-upsert-coa',
  templateUrl: './upsert-coa.component.html',
  styleUrls: ['./upsert-coa.component.css']
})
export class UpsertCoaComponent implements OnInit {

  currentCoa: CoatOfArms = new CoatOfArms();

  constructor(
    private route: ActivatedRoute,
    private backendService: CoaEditorBackendServiceService
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('coaUUID');
    let temp = this.backendService.getCoaList().find(item => item.uuid == uuid);
    if (temp != undefined)
      this.currentCoa = temp;
    console.log(this.currentCoa);
  }

}
