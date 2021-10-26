import { Routes, RouterModule  } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { AdminGuard } from "./guards/admin.guard";// para proteger rutas

const appRoute : Routes = [
    {path:'',redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio',component:InicioComponent, canActivate:[AdminGuard]},
    {path:'panel', children:[
        {path:'clientes', component:IndexClienteComponent, canActivate:[AdminGuard]}
    ]},
    {path:'login',component:LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
