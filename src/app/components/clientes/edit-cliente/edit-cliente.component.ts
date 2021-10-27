import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from "src/app/services/cliente.service";
declare var iziToast:any;


@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente:any=undefined;
  public id = '';
  public boton_actualizar:boolean = false;
  public load_data:boolean = true;
  constructor(
    private _route : ActivatedRoute,
    private _clienteService : ClienteService,
    private _adminService : AdminService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params["id"];
        this._clienteService.obtener_cliente_admin(this.id,this._adminService.getToken()).subscribe(
          response=>{
            if(response.data!=undefined)
            {
                this.cliente = response.data;
                this.load_data=false;
                return;
            }
            this.load_data=false;
            this.cliente = undefined; 
          },
          error=>{
            console.log('pasandooo');
            this.load_data=false;
           
          }
        )
      },
      error=>{
        this.load_data=false;
      }
    )
  }

  actualizar(updateC:any)  
  {
    if(updateC.valid)
    {
      this.boton_actualizar=true;
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this._adminService.getToken()).subscribe(
        response=>{
          iziToast.success({
            title:'Success',
            class:'text-danger',
            position:'topCenter',
            message:'Se actualizo correctamebnte'
          })
          this.boton_actualizar=false;
          this._router.navigate(['/panel/clientes']);
        },
        error=>{
          console.log('error');
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
