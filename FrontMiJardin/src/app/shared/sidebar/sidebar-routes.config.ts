 import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/index',
        title: 'Pagina Principal',
        icon: 'ft-home',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol:'PRINCIPAL',
        submenu: []
    },
    {
        path: '/administracionFlujoAprobacion',
        title: 'Aprobar NC',
        icon: 'ft-file-text',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'APROBADOR',
        submenu: []
    },
    {
        path: '/administracionUsuario',
        title: 'Admin. Usuarios',
        icon: 'ft-user',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol:'ADMINISTRADOR',
        submenu: []
    },
    {
        path: '/administracionTRM',
        title: 'Admin. TRM',
        icon: 'ft-edit-2',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'ADMINISTRADOR',
        submenu: []
    },
    {
        path: '/consultarNotaContable',
        title: 'Consultar NC',
        icon: 'ft-search',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'ORIGINADOR',
        submenu: []
    },
    {
        path: '/crearNotaContable',
        title: 'Crear NC',
        icon: 'ft-plus-circle',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol:'ORIGINADOR',
        submenu: []
    },
    {
        path: '/servicioCliente',
        title: 'Servicio Cliente',
        icon: 'ft-users',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'SERVCLIENTE',
        submenu: []
    },
    {
        path: '/adminAprobadores',
        title: 'Admin. Flujo Aprobacion',
        icon: 'ft-monitor',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'ADMINISTRADOR',
        submenu: []
    },
    {
        path: '/reportes',
        title: 'Reportes',
        icon: 'ft-clipboard',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        rol: 'ADMINISTRADOR',
        submenu: []
    },
    
    /*{
        path: '',
        title: 'Administracion de Materiales',
        icon: 'ft-align-left',
        class: 'has-sub',
        badge: '',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
            {
                path: '/changelog',
                title: 'Third Level 1.1',
                icon: '',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            },
            {
                path: 'javascript:;',
                title: 'Third Level 1.2',
                icon: '',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: true,
                submenu: []
            },
        ]
    },
    {
        path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },*/


];
//D:\Syngenta Source\syngentaPresentacion\src\app\pages\content-pages
