export class ConsultaDatosReportes {
    idNotaContable: number;
    idCliente: number;
    codCliente: string;
    idEstado: number;
    idTipoNotaContable: number;
    idNotaContableSap: number;
    originador: string;
    aprobador: string;
    fechaInicio: string;
    fechaFinal: string;
    constructor() {
        this.idEstado = 0;
        this.idTipoNotaContable = 2;
        this.originador = null;
        this.aprobador = null;
    }

}
