import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, single} from "rxjs/operators";
import {CoatOfArms} from "../models/coat-of-arms";
import {Observable} from "rxjs";
import {Term} from "../models/term";

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


  getAllCoatOfArms(mode: boolean, coaUUIDList?: string[]): Observable<CoatOfArms[]>{
    if (mode) {
      return this.http.get<CoatOfArms[]>(this.BASE_URL + "coaeditor/allCoA").pipe(
        map(data => data.map(data => new CoatOfArms().deserialize(data)))
      );
    } else {
      return this.http.post<CoatOfArms[]>(this.BASE_URL + "coaeditor/allCoA", {coaUUIDList}).pipe(
        map(data => data.map(data => new CoatOfArms().deserialize(data)))
      );
    }
  }

  postCoaToDatabase(coa: CoatOfArms): Observable<string> {
    let shortenedChains = coa.containedChains.map(chain => {return {uuid: chain.uuid, containedTerms: chain.containedTerms.map(term => term.uuid)}});
    let {uuid, containedChains, ...data} = coa;
    return this.http.post<string>(this.BASE_URL + "coa/upsertCoA", {uuid: uuid, data: data, chains: shortenedChains});
  }

  getDeleteCoa(coa: string): Observable<void> {
    return this.http.get<void>(this.BASE_URL + "coa/deleteCoA", {params: new HttpParams().appendAll({'termUUID': coa})});
  }

  getStartResearch(name: string, location: string, singleTerms: string, chains: Term[][]): Observable<string[]> {
    let singleTermList = singleTerms.split(";");
    let termUUIDs = chains.map(termlist => termlist.map(term => term.uuid));
    return this.http.post<string[]>(this.BASE_URL + "research", {name: name, location: location, singleTerms: singleTermList, termUUIDs: termUUIDs});
  }
}
