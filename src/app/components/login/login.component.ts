import { Component, OnInit } from '@angular/core';
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
  constructor(
    private _adminService:AdminService
  ) { 
      
    $('.cs-offcanvas-enabled').css({'padding-left':'0px','display':'block'});
    $('.cs-offcanvas-enabled > .col-xl-9').css({'max-width':'100%'});
  }

  ngOnInit(): void {
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
          console.log(response);
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
