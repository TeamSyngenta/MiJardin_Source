import {NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';
import { LoginPageComponent } from './pages/content-pages/login/login-page.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';


import {AuthService} from './shared/auth/auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {FormsModule} from '@angular/forms';
import {AdministracionUsuarioComponent} from './pages/content-pages/administracion-usuario/administracion-usuario.component';
import { CrearNotaContableComponent } from './pages/content-pages/crear-nota-contable/crear-nota-contable.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatTabsModule } from '@angular/material';
import { AdministradorTRMComponent } from './pages/content-pages/administrador-trm/administrador-trm.component';
import { ConsultaNotaContableComponent } from '../app/pages/content-pages/consulta-nota-contable/consulta-nota-contable.component';
import { ModificarNotaContableComponent } from './pages/content-pages/modificar-nota-contable/modificar-nota-contable.component';
import { AdministracionFlujoAprobacionComponent } from './pages/content-pages/administracion-flujo-aprobacion/administracion-flujo-aprobacion.component';
import { ServicioClienteComponent } from './pages/content-pages/servicio-cliente/servicio-cliente.component';
import { AdministradorAprobadoresComponent } from './pages/content-pages/administrador-aprobadores/administrador-aprobadores.component';
import { ReportesComponent } from './pages/content-pages/reportes/reportes.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
    
};


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, LoginPageComponent, AdministracionUsuarioComponent, CrearNotaContableComponent, AdministradorTRMComponent, ConsultaNotaContableComponent, ModificarNotaContableComponent, AdministracionFlujoAprobacionComponent, ServicioClienteComponent, AdministradorAprobadoresComponent, ReportesComponent],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        PerfectScrollbarModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTabsModule,
        Ng2SearchPipeModule,
        ChartsModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
