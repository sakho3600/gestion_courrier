﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Courrier} from '../_models/index';
import { GenericResponse, SaveDocumentResponse, RechercherCourrierResponse } from "../_responses";
import { DatePipe } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class CourrierService {
  private baseUrl = 'http://localhost/gestion_courrier/gc-api/web/index.php';
  
  private addNewCourrierUrl = this.baseUrl + '/saveCourrier';
  private deleteCourrierUrl = this.baseUrl + '/supprimerCourrier/';
  private saveDocUrl = this.baseUrl + '/saveDocument';
  private rechercherCourrierUrl = this.baseUrl + '/rechercherCourrier/';
  private getAllCourrierUrl = this.rechercherCourrierUrl + '*:*';
  
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getAll(): Observable<RechercherCourrierResponse> {
    return this.http.get<RechercherCourrierResponse>(this.getAllCourrierUrl);
  }
 
  create(courrier: Courrier) : Observable<GenericResponse> {
    let headers:HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
    
    return this.http.post<GenericResponse>(this.addNewCourrierUrl, JSON.stringify(courrier), {headers : headers});
  }

  delete(id: number) {
    return this.http.delete(this.deleteCourrierUrl + id);
  }

  saveDoc(base64: string) : Observable<SaveDocumentResponse> {
    console.log('saving doc');
    var headers = new Headers();
    return this.http.post<SaveDocumentResponse>(this.saveDocUrl, base64);
  }
  
  rechercherCourrier(query: string) : Observable<RechercherCourrierResponse> {
    if (query.trim() === '') { query = "*:*"; }
    return this.http.get<RechercherCourrierResponse>(this.rechercherCourrierUrl + encodeURIComponent(query));
  }



  /**getById(id: number) {
      return this.http.get('/api/users/' + id);
  }



  update(user: User) {
      return this.http.put('/api/users/' + user.id, user);
  }

  **/
}