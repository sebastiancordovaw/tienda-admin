import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";

declare var jQuery:any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adnminService:AdminService, private _router:Router)
  {

  }

  canActivate():any{
    if(!this._adnminService.isAuthenticated(['admin']))
    {
      this._router.navigate(['login']);
      $('.cs-offcanvas-enabled').css({'padding-left':'0px','display':'block'});
      $('.cs-offcanvas-enabled > .col-xl-9').css({'max-width':'100%'});
      return false;
    } 
    return true;
  }
  
}
