import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url:string = '';
  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  registro_producto_admin(data:any,file:any,token:any):Observable<any>{

    let headers = new HttpHeaders({'Authorization':token });
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categoria',data.categoria);
    fd.append('portada',file);
    return this._http.post(this.url+'registro_producto_admin',fd,{headers});
  }

  listar_producto_filtro_admin(filtro:any,token:any):Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token });
    return this._http.get(this.url+'listar_producto_filtro_admin/'+filtro,{headers})
  }

  eliminar_producto_admin(id:any,token:any):Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token });
    return this._http.delete(this.url+'eliminar_producto_admin/'+id,{headers});
  }
}
