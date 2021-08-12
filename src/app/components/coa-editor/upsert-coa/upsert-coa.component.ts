import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoaEditorBackendServiceService} from "../../../services/coa-editor-backend-service.service";
import {CoatOfArms} from "../../../models/coat-of-arms";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewChainDialogComponent} from "../create-new-chain-dialog/create-new-chain-dialog.component";

@Component({
  selector: 'app-upsert-coa',
  templateUrl: './upsert-coa.component.html',
  styleUrls: ['./upsert-coa.component.css']
})
export class UpsertCoaComponent implements OnInit {

  currentCoa: CoatOfArms = new CoatOfArms();
  nameInput = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private backendService: CoaEditorBackendServiceService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('coaUUID');
    let temp = this.backendService.getCoaList().find(item => item.uuid == uuid);
    if (temp != undefined) {
      this.currentCoa = temp;
    }
  }

  clickCreateNewChain() {
    let dialogRef = this.dialog.open(CreateNewChainDialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.chain.containedTerms.length > 0) {
        this.currentCoa.containedChains.push(result.chain);
      }
    });
  }

  deleteChain(index: number) {
    this.currentCoa.containedChains.splice(index, 1);
  }

  pushChainUpwards(index: number) {
    let removedChain = this.currentCoa.containedChains.splice(index, 1);
    this.currentCoa.containedChains.splice(index - 1, 0, removedChain[0]);
  }

  pushChainDownwards(index: number) {
    let removedChain = this.currentCoa.containedChains.splice(index, 1);
    this.currentCoa.containedChains.splice(index + 1, 0, removedChain[0]);
  }

  saveCoaToDatabase() {
    if (!this.nameInput.invalid){
      this.backendService.postCoaToDatabase(this.currentCoa)
        .subscribe( () => {
          this.router.navigateByUrl('/coa-list');
          }
        );
    }
  }
}
