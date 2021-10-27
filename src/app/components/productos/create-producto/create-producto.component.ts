import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery:any;
declare var $:any;

declare var iziToast:any;
@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})

export class CreateProductoComponent implements OnInit {

  public producto: any ={};
  public file : any = undefined;
  public imgSelect:any|ArrayBuffer = 'assets/img/01.jpg';
  public config:any = {};
  public boton_crear:boolean = false;
  constructor(private _productoService:ProductoService,
              private _adminService:AdminService,
              private _router:Router) { 
   this.config={
      height:300
    }
  }
  ngOnInit(): void {
  }

  registro(registroForm:any)
  {
    if(registroForm.valid && this.file!=undefined)
    {
      this.boton_crear=true;
      this._productoService.registro_producto_admin(this.producto,this.file,this._adminService.getToken()).subscribe(
        response=>{
          iziToast.success({
            title:'Success',
            class:'text-danger',
            position:'topCenter',
            message:'Se registro correctamente el producto'
          });
          this.producto={
            titulo: '',
            stock: '',
            precio: '',
            descripcion: '',
            contenido: '',
            categoria: '',
            portada: ''}
          this.boton_crear=false;  
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.boton_crear=false;  
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
      });
      this.boton_crear=false;  
    }
  }


  fileChangeEvent(event:any):void
  {
    var file;
    if(event.target.files && event.target.files[0])
    {
      file = <File>event.target.files[0];
    }else{
      iziToast.error({
        title:'Error',
        class:'text-danger',
        position:'topCenter',
        message:'No hay imagen'
      });
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
      $("#input-img-text").text('Seleccionar imagen');
      return;
    }

    if(file.size <= 4000000)
    {
      if(file.type=='image/png' ||
      file.type=='image/webp' ||
      file.type=='image/jpg' ||
      file.type=='image/gif' ||
      file.type=='image/jpeg')
      {
        const reader = new FileReader();
        reader.onload = e =>this.imgSelect = reader.result;
        reader.readAsDataURL(file);
        $("#input-img-text").text(file.name);
        this.file = file;

      }
      else{
        iziToast.error({
          title:'Error',
          class:'text-danger',
          position:'topCenter',
          message:'formato no valido'
        });
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
        $("#input-img-text").text('Seleccionar imagen');
        return;
      }
    }
    else{
      iziToast.error({
        title:'Error',
        class:'text-danger',
        position:'topCenter',
        message:'Imagen supera los 4 MG'
      });
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
      $("#input-img-text").text('Seleccionar imagen');
      return;
    }
  }

}
