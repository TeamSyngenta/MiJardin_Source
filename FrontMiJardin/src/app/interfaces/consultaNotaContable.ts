export class consultaNotaContable {
    idNotaContable: number;
    idCliente: number;
    codCliente: string;
    idEstadoNota: number;
    tipoNotaContable: number;
    idNotaContableSap: number;
    productoSeleccionado: number;
    fechaInicio: string;
    fechaFinal: string;
    constructor() {
        this.idEstadoNota = 0;
        this.tipoNotaContable = 2;
        this.productoSeleccionado = 0;
    }

}
