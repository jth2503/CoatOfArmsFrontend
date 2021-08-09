import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {CoatOfArms} from "../models/coat-of-arms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoaEditorBackendServiceService {

  private BASE_URL = environment.baseURL;

  coaList: CoatOfArms[] = [];

  constructor(private http: HttpClient) { }

  setCoaList(list: CoatOfArms[]) {
    this.coaList = list;
  }

  getCoaList() {
    return this.coaList;
  }


  getAllCoatOfArms(): Observable<CoatOfArms[]>{
    return this.http.get<CoatOfArms[]>(this.BASE_URL + "coaeditor/allCoA").pipe(
      map(data => data.map(data => new CoatOfArms().deserialize(data)))
    );
  }
}
