import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token : any = '';
  constructor(
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.token = this._adminService.getToken()    
  }

  ngOnInit(): void {

   
    if( this.token )
    {
      this._router.navigate(['/']);
      return;
    }
    
    $('.cs-offcanvas-enabled').css({'padding-left':'0px','display':'block'});
    $('.cs-offcanvas-enabled > .col-xl-9').css({'max-width':'100%'});
  }

  login(loginForm: any){
    
    if(loginForm.valid)
    {
      let data ={
        email:this.user.email,
        password:this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined)
          {
            iziToast.error({
              title:'Error',
              class:'text-danger',
              position:'topCenter',
              message:response.message
            })
          }
          else
          {
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            $('.cs-offcanvas-enabled').css({'padding-left':'','display':''});
            $('.cs-offcanvas-enabled > .col-xl-9').css({'max-width':''});
            this._router.navigate(['/']);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }
    else
    {
      iziToast.error({
        title:'Error',
        class:'text-danger',
        position:'topCenter',
        message:'los datos no son validos'
      })
    }
  }
}
