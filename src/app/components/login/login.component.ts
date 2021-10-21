import { Component, OnInit } from '@angular/core';

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
  constructor() { 
      
    $('.cs-offcanvas-enabled').css({'padding-left':'0px','display':'block'});
    $('.cs-offcanvas-enabled > .col-xl-9').css({'max-width':'100%'});
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    
    if(loginForm.valid)
    {
      console.log(this.user);
      alert("valido")
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
