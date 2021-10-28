import { Component, OnInit, DoCheck } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from "src/app/services/GLOBAL";
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit, DoCheck {
  public productos : Array<any>=[];
  public filtro_titulo = "";
  public page = 1;
  public pageSize = 1;
  public loading:boolean = true;
  public boton_eliminar:boolean = false;
  public url:string = '';
  constructor(public _adminService:AdminService,
              public _productoService:ProductoService ) {
                this.url = GLOBAL.url;
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
    this._productoService.listar_producto_filtro_admin(null,this._adminService.getToken()).subscribe(
      response=>{
        this.productos = response.data;
        this.loading=false;
      },
      error=>
      {
       console.log(error);
      }
    )
  }

  filtro()
  {
    let filtro = this.filtro_titulo

    if(!filtro)
    {
      this.init_data();
      return;
    }
    this.loading=true;
    this._productoService.listar_producto_filtro_admin(filtro,this._adminService.getToken()).subscribe(
      response=>{
          this.loading=false;
          this.productos = response.data;
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
      this.boton_eliminar=true;
      this._productoService.eliminar_producto_admin(id,this._adminService.getToken()).subscribe(
        response=>{
            iziToast.success({
              title:'Success',
              class:'text-danger',
              position:'topCenter',
              message:'Producto eliminado correctamente'
            });
             this.boton_eliminar=false;
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
