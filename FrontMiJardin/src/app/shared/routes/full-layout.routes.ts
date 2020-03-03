import {Routes, RouterModule} from '@angular/router';
import {AdministracionUsuarioComponent} from '../../pages/content-pages/administracion-usuario/administracion-usuario.component';
import { CrearNotaContableComponent } from '../../pages/content-pages/crear-nota-contable/crear-nota-contable.component';
import { ConsultaNotaContableComponent } from '../../pages/content-pages/consulta-nota-contable/consulta-nota-contable.component';
import { AdministradorTRMComponent } from '../../pages/content-pages/administrador-trm/administrador-trm.component';
import { ModificarNotaContableComponent } from '../../pages/content-pages/modificar-nota-contable/modificar-nota-contable.component';
import { AdministracionFlujoAprobacionComponent } from '../../pages/content-pages/administracion-flujo-aprobacion/administracion-flujo-aprobacion.component';
import { ServicioClienteComponent } from '../../pages/content-pages/servicio-cliente/servicio-cliente.component';
import { AdministradorAprobadoresComponent } from '../../pages/content-pages/administrador-aprobadores/administrador-aprobadores.component';
import { ReportesComponent } from '../../pages/content-pages/reportes/reportes.component';
//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
    {
        path: 'index',
        loadChildren: () => import('../../pages/full-layout-page/full-pages.module').then(m => m.FullPagesModule)
    },
    {
        path: 'administracionUsuario', component: AdministracionUsuarioComponent,
    },
    {
        path: 'crearNotaContable', component: CrearNotaContableComponent,
    },
    {
        path: 'consultarNotaContable', component: ConsultaNotaContableComponent,
    },
    {
        path: 'administracionTRM', component: AdministradorTRMComponent,
    },
    {
        path: 'modificarNC/:idNC', component: ModificarNotaContableComponent,
    },
    {
        path: 'administracionFlujoAprobacion', component: AdministracionFlujoAprobacionComponent,
    },
    {
        path: 'servicioCliente', component: ServicioClienteComponent,
    }
    ,
    {
        path: 'adminAprobadores', component: AdministradorAprobadoresComponent,
    }
    ,
    {
        path: 'reportes', component: ReportesComponent,
    }
];
