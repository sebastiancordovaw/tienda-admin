import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente:any={
    genero:'',
  };
  public boton_crear:boolean = false;

  constructor(
    private _clienteService:ClienteService,
    private _adminService: AdminService,
    private _router:Router
    ) { }

  ngOnInit(): void {
  }

  registro(registroCLiente:any)
  {
    if(registroCLiente.valid)
    {
      this.boton_crear=true;
      this._clienteService.registro_cliente_admin(this.cliente, this._adminService.getToken()).subscribe(
        response=>{
          iziToast.success({
            title:'Success',
            class:'text-danger',
            position:'topCenter',
            message:'Se registro correctamente el cliente'
          });
          this.cliente={
            nombres:'',
            apellidos:'',
            email:'',
            telefono:'',
            genero:'',
            f_nacimiento:'',
            dni:''}
            
          this.boton_crear=false;
          this._router.navigate(['/panel/clientes']);
        },
        error=>{
          console.log(error);
        }
      )
    }else{
      iziToast.error({
        title:'Error',
        class:'text-danger',
        position:'topCenter',
        message:'los datos no son validos'
      })
    }
  }

}
