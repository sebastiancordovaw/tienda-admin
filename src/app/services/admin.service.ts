import { Injectable } from '@angular/core';
import { Observable } from "rxjs"; //se inserta
import { GLOBAL } from "./GLOBAL";//se inserta
import { HttpClient,HttpHeaders } from "@angular/common/http";//se inserta
import { JwtHelperService } from "@auth0/angular-jwt";// se inserta y se descarga

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

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    return localStorage.removeItem('token');
  }

  public isAuthenticated(allowRoles:String[]):boolean{

    const token  = this.getToken()!;
    
  
    if(!token)
    {
      return false;
    }

    try
    {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      
      if(!decodedToken)
      {
        this.removeToken();
        return false;
      }
    } 
    catch(error)
    {
        this.removeToken();
        return false;
    }
    

    return allowRoles.includes(decodedToken.role);
  }

}
