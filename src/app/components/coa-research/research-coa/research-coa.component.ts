import {Component, OnInit, ViewChild} from '@angular/core';
import {Term} from "../../../models/term";
import {MatTableDataSource} from "@angular/material/table";
import {CoatOfArms} from "../../../models/coat-of-arms";
import {CoaEditorBackendServiceService} from "../../../services/coa-editor-backend-service.service";
import {MatDialog} from "@angular/material/dialog";
import {ResearchChainDialogComponent} from "../research-chain-dialog/research-chain-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-research-coa',
  templateUrl: './research-coa.component.html',
  styleUrls: ['./research-coa.component.css']
})
export class ResearchCoaComponent implements OnInit {

  searchStarted: boolean = false;

  // search properties
  searchedChains: Term[][] = [];
  name: string = "";
  location: string = "";
  singleTerms: string = "";

  // table properties
  columnsToDisplay = ['name', 'location', 'description', 'numberChains', 'btnDetails']
  dataSource!: MatTableDataSource<CoatOfArms>;
  coaList!: CoatOfArms[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private backendService: CoaEditorBackendServiceService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.coaList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (coa, property) => {
      if (property == 'numberChains')
        return coa.containedChains.length;
      else
        return coa[property];
    }
  }

  startResearch() {
    this.searchStarted = true;
    this.backendService.getStartResearch(this.name, this.location, this.singleTerms, this.searchedChains)
      .subscribe((data: string[]) => {
        this.backendService.getAllCoatOfArms(false, data)
          .subscribe((data: CoatOfArms[]) => {
            this.coaList = data;
            this.dataSource.data = this.coaList;
          })
      });
  }

  removeChain(index: number) {
    this.searchedChains.splice(index,1);
  }

  clearSearchFields() {
    this.searchedChains = [];
    this.name = "";
    this.location = "";
    this.singleTerms = "";
    this.searchStarted = false;
  }

  openChainDialog() {
    let dialogRef = this.dialog.open(ResearchChainDialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.chain.containedTerms.length > 0) {
        this.searchedChains.push(result.chain.containedTerms);
      }
    });
  }
}
