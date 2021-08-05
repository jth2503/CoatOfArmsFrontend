import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Term} from "../models/term";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TermAtCreation} from "../models/term-at-creation";

@Injectable({
  providedIn: 'root'
})
export class TermeditorBackendServiceService {

  private BASE_URL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getFirstTerms (): Observable<Term[]> {
    return this.http.get<Term[]>(this.BASE_URL + "termeditor/firstTerms").pipe(
      map(data => data.map(data => new Term().deserialize(data)))
    );
  }

  getUpdateListsOfClicked (childUUID: string, mode: number): Observable<Term[]> {
    return this.http.get<Term[]>(this.BASE_URL + "termeditor/updateListsOfClicked", {params: new HttpParams().appendAll({'uuid': childUUID, 'mode': mode})}).pipe(
      map(data => data.map(data => new Term().deserialize(data)))
    );
  }

  postUpsertTerm (uuid: string, parent: string, termData: TermAtCreation): Observable<string> {
    return this.http.post<string>(this.BASE_URL + "terms/upsertTerm", {uuid: uuid, parent: parent, term: termData});
  }

  getRemoveTermRelationship(parent: string, child: string): Observable<number> {
    return this.http.get<number>(this.BASE_URL + "terms/removeTermRelationship", {params: new HttpParams().appendAll({'parent': parent, 'child': child})});
  }

  getAddTermRelationship(parent: string, child: string): Observable<string> {
    return this.http.get<string>(this.BASE_URL + "terms/addTermRelationship", {params: new HttpParams().appendAll({'parent': parent, 'child': child})});
  }

  getAllTerms(): Observable<Term[]> {
    return this.http.get<Term[]>(this.BASE_URL + "termeditor/allTerms").pipe(
      map(data => data.map(data => new Term().deserialize(data)))
    );
  }

  getDeleteTerm(uuid: string): Observable<{Chains: number, Terms: number}> {
    return this.http.get<{Chains: number, Terms: number}>(this.BASE_URL + "terms/deleteTerm", {params: new HttpParams().appendAll({'termUUID': uuid})});
  }
}
