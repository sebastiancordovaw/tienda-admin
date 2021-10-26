import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit, DoCheck } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit, DoCheck {

  public clientes : Array<any>=[];
  public filtro_apellidos = "";
  public filtro_email = '';
  public page = 1;
  public pageSize = 1;
  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService
    ) { 

      
    }

  ngOnInit(): void {
    this.init_data();
    

  }

  ngDoCheck() {
    $(".btn-close").click(function(){
      $(".modal").modal("hide");
    });
  }

  init_data()
  {
    this._clienteService.listar_clientes_filtro_admin(null,null,this._adminService.getToken()).subscribe(
      response=>{
        this.clientes = response.data;
      },
      error=>
      {
       console.log(error);
      }
    )
  }

  filtro(tipo:any)
  {
    var filtro;
    if(tipo=="email")
    {
      filtro = this.filtro_email;
    }else if(tipo=="apellidos")
    {
      filtro = this.filtro_apellidos;
    }

    if(!filtro)
    {
      this.init_data();
      return;
    }

    this._clienteService.listar_clientes_filtro_admin(tipo,filtro,this._adminService.getToken()).subscribe(
      response=>{
        this.clientes = response.data;
      },
      error=>
      {
       console.log(error);
      }
    )

  }

  eliminar(id:any)
  {
    if(id)
    {
      this._clienteService.eliminar_cliente_admin(id,this._adminService.getToken()).subscribe(
        response=>{
          iziToast.success({
            title:'Success',
            class:'text-danger',
            position:'topCenter',
            message:'Cliente eliminado correctamente'
          });

          $("#delete-"+id).modal("hide");
          this.init_data();
        },
        error=>{
          console.log(error);
        }
      );
    }
    
  }

}
