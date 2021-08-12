import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CoatOfArms} from "../../../models/coat-of-arms";
import {CoaEditorBackendServiceService} from "../../../services/coa-editor-backend-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-coa-list',
  templateUrl: './coa-list.component.html',
  styleUrls: ['./coa-list.component.css']
})
export class CoaListComponent implements OnInit {

  columnsToDisplay = ['name', 'location', 'description', 'numberChains', 'btnEdit', 'btnDelete']
  coaList!: CoatOfArms[];
  dataSource!: MatTableDataSource<CoatOfArms>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private backendService: CoaEditorBackendServiceService,
    ) { }

  ngOnInit(): void {
    this.backendService.getAllCoatOfArms()
      .subscribe((data: CoatOfArms[]) => {
        this.backendService.setCoaList(data);
        this.coaList = this.backendService.getCoaList();
        this.dataSource = new MatTableDataSource(this.coaList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (coa, filter) => {
          return coa.name.toLowerCase().includes(filter) || coa.location.toLowerCase().includes(filter);
        }
        this.dataSource.sortingDataAccessor = (coa, property) => {
          if (property == 'numberChains')
            return coa.containedChains.length;
          else
            return coa[property];
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickDeleteCoa(uuid: string) {
    this.backendService.getDeleteCoa(uuid)
      .subscribe(() => {
        let index = this.coaList.findIndex(coa => coa.uuid == uuid);
        this.coaList.splice(index, 1);
      });
  }
}
