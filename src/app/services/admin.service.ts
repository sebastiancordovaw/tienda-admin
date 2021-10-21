import { Injectable } from '@angular/core';
import { Observable } from "rxjs"; //se inserta
import { GLOBAL } from "./GLOBAL";//se inserta
import { HttpClient,HttpHeaders } from "@angular/common/http";//se inserta

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;
  constructor(private _http: HttpClient) { 

    this.url = GLOBAL.url;
  }

  login_admin(data:any):Observable<any>
  {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers})
  }

}
