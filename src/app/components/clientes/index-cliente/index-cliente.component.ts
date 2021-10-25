import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any>=[];
  public filtro_apellidos = "";
  public filtro_email = '';
  public page = 1;
  public pageSize = 1;
  constructor(private _clienteService:ClienteService) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data()
  {
    this._clienteService.listar_clientes_filtro_admin(null,null).subscribe(
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

    this._clienteService.listar_clientes_filtro_admin(tipo,filtro).subscribe(
      response=>{
        this.clientes = response.data;
      },
      error=>
      {
       console.log(error);
      }
    )

  }

}
