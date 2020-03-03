import { nuevoProducto } from "./nuevoProducto";
import { archivoAdjunto } from "./archivoAdjunto";
import { envioCorreo } from './envioCorreo';

export class notaContable {
    idCliente: number;
    idUsuario: number;
    idUnidadComercial: number;
    idEntidadLegal: number;
    idTipoMoneda: number;
    idUDN: number;
    idNegocio: number;
    idConcepto: number;
    idRegion: number;
    idTemporada: number;
    idPrograma: number;
    idCuentaContable: number;
    anio: number;
    nombrePais: string;
    nombreUnidadComercial: string;
    monto: number;
    montoUSD: number;
    descripcion: string;
    tipoProducto: boolean;
    idTipoNota: boolean;
    notificacionCorreo: boolean;
    idFlujoAprobacion: number;
    estatusAprobacion: number;
    idEstadoNotaContable: number;
    arrayProductos: Array<nuevoProducto>;
    arregloArchivos: Array<File>;
    //Variables EnvioCorreo
    nombreUsuario: string;
    correoUsuario: string;
    nombreCliente: string;
    codCliente: string;
    nonbreTipoNegocio: string;
    nuevoMail: envioCorreo;
    constructor() {
        this.idTemporada = 0;
        this.idPrograma = 0;
        this.idCuentaContable = 0;
        this.idCliente = 0;
        this.idConcepto = 0;
        this.idUnidadComercial = 0;
        this.idEntidadLegal = 0;
        this.idTipoMoneda = 0;
        this.idNegocio = 0;
        this.idRegion = 0;
        this.idUDN = 0;
       
    }
}
