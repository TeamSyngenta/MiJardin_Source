import {Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';

import {ROUTES} from './sidebar-routes.config';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {customAnimations} from '../animations/custom-animations';
import {ConfigService} from '../services/config.service';
import {LayoutService} from '../services/layout.service';
import set = Reflect.set;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {

    @ViewChild('toggleIcon', {static: false}) toggleIcon: ElementRef;
    public menuItems: any[];
    depth: number;
    activeTitle: string;
    activeTitles: string[] = [];
    expanded: boolean;
    nav_collapsed_open = false;
    logoUrl = 'assets/img/LOGO_SYNC_BLANCO.png';
    public config: any = {};
    roles: Array<any>;
    public menuItemsValidos: any[] = [];

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private router: Router,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private configService: ConfigService,
        private layoutService: LayoutService,
    ) {
        if (this.depth === undefined) {
            this.depth = 0;
            this.expanded = true;
        }
    }


    validarRol: boolean = false;
    tamImag = 60;
    ngOnInit() {
        this.config = this.configService.templateConf;
        this.menuItems = ROUTES;

        //Cargar Variables Globales De Administacion Usuario

        this.roles = this.layoutService.consultarRoles();
        
        for(let rol of this.roles){
            for(let item of this.menuItems){
                if(item.rol === 'PRINCIPAL'){
                    if(!this.menuItemsValidos.includes(item)){
                        this.menuItemsValidos.push(item);
                    }
                }
                if(item.rol === rol){
                    this.menuItemsValidos.push(item);
                }
                if (rol == 'AFO' && item.rol == 'SERVCLIENTE') {
                    this.menuItemsValidos.push(item);
                }

            }
        }

        this.menuItems = this.menuItemsValidos;

        if (this.config.layout.sidebar.backgroundColor === 'white') {
            this.logoUrl = 'assets/img/LOGO_SYNC_BLANCO.png';
            this.tamImag = 60;
        } else {
            this.logoUrl = 'assets/img/LOGO_SYNC_BLANCO.png';
            this.tamImag = 60;
        }


    }

    ngAfterViewInit() {
        
        setTimeout(() => {
            if (this.config.layout.sidebar.collapsed != undefined) {
                if (this.config.layout.sidebar.collapsed === true) {
                    this.expanded = false;
                    this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
                    this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
                    this.nav_collapsed_open = true;
                } else if (this.config.layout.sidebar.collapsed === false) {
                    this.expanded = true;
                    this.tamImag = 60;
                    this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
                    this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
                    this.nav_collapsed_open = false;
                }
            }
        }, 0);


    }
    prueba = true;
    tamIcono() {
        
        this.prueba = !this.prueba;
        if (this.prueba) this.tamImag = 60;
        else this.tamImag = 30;
    }

    toggleSlideInOut() {
        
        this.expanded = !this.expanded;
    }

    handleToggle(titles) {
        this.activeTitles = titles;
    }

    // NGX Wizard - skip url change
    ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') !== -1) {
            this.router.navigate(['forms/ngx/wizard'], {skipLocationChange: false});
        }
    }
}
