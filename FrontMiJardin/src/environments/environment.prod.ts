// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    APIURL: 'http://10.190.32.36:8080/api/CrearNotaContable',
    MAILURL: 'http://10.190.32.36:8080/api/EnvioCorreo',
    SEGURIDADURL: 'http://10.190.32.36:8080/api/Seguridad',
    UTILITARIOSURL: 'http://10.190.32.36:8080/api/Utilitarios',
    REPORTESURL: 'http://10.190.32.36:8080/api/Reportes',
    MODIFICARURL: 'http://10.190.32.36:8080/api/ModificarNotaContable',
    APROBACIONRURL: 'http://10.190.32.36:8080/api/Aprobacion'
};

