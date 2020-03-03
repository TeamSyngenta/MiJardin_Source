import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {FullLayoutComponent} from './layouts/full/full-layout.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {LoginPageComponent} from './pages/content-pages/login/login-page.component';
import {Full_ROUTES} from './shared/routes/full-layout.routes';
import {CONTENT_ROUTES} from './shared/routes/content-layout.routes';

import {AuthGuard} from './shared/auth/auth-guard.service';
import {AdministracionUsuarioComponent} from './pages/content-pages/administracion-usuario/administracion-usuario.component';


const appRoutes: Routes = [
    {path: '', component: LoginPageComponent, pathMatch: 'full'},
    {path: '', component: FullLayoutComponent, data: {title: 'full Views'}, children: Full_ROUTES, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
