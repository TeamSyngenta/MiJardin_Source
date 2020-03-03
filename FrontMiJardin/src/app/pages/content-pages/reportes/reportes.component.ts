import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../shared/services/layout.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatosNotaContableReportes } from '../../../interfaces/DatosNotaContableReportes';
import { ReportesService } from './reportes.service';
import { tipoEstandar } from '../../../interfaces/tipoEstandar';
import { filtroProducto } from '../../../interfaces/filtroProducto';
import { ConsultaDatosReportes } from '../../../interfaces/ConsultaDatosReportes';
import { DomSanitizer } from '@angular/platform-browser';
import * as xlsx from 'xlsx';
import { headersToString } from 'selenium-webdriver/http';
import { CdkHeaderCellDef } from '@angular/cdk/table';


@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

    constructor(private layoutService: LayoutService,
        private modalService: NgbModal, private ServicioReportesSync: ReportesService, private sanitizer: DomSanitizer, private router: Router) { }

    @ViewChild('reportesSync', { static: false }) reportesSync: DatosNotaContableReportes;
   
    headersToString:['certHolderName', 'certTypeName', 'completionDate', 'expirationDate', 'isExpired'];

    

    datosBusqueda: ConsultaDatosReportes = new ConsultaDatosReportes();
    productoSeleccionado: filtroProducto;
    nombreProductoMostar = '';
    page = 1;
    pageSize = 5;
    collectionSize = 0;

    modalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: "static"
    };
    closeResult: string;
    tituloPOPUP: any;
    mensajePOPUP: any;
    listaEstado: Array<tipoEstandar>;
    NotasC: Array<DatosNotaContableReportes> = null;
    idNotaC = 0;
    aprobador = null;
    originador = null;


    ngOnInit() {
        debugger;
        this.datosBusqueda = new ConsultaDatosReportes();

        this.ServicioReportesSync.getObtenerEstados().subscribe(
            data => {
                this.listaEstado = data;
                var i = 0;

                for (let tipoEstado of this.listaEstado) {
                    if (tipoEstado.idTipo == 2) {
                        this.listaEstado.splice(i, 1);
                        break
                    }
                    i++;
                }

            });

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    abierto(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    ocultarBotonExcel: boolean = true;
    ocultarMensajeCod: boolean = true;
    ocultarTablaProductos: boolean = true;
    habilitarBoton = true;

    buscar(modalContentError) {
        debugger;
        this.datosBusqueda;
        if (this.datosBusqueda.originador == '') {
            this.datosBusqueda.originador = null;
        }
        if (this.datosBusqueda.aprobador == '') {
            this.datosBusqueda.aprobador = null;
        }
        if (this.datosBusqueda.fechaFinal == '') {
            this.datosBusqueda.fechaFinal = null;
        }
        if (this.datosBusqueda.fechaInicio == '') {
            this.datosBusqueda.fechaInicio = null;
        }

        if (this.datosBusqueda.fechaFinal == null && this.datosBusqueda.fechaInicio == null && this.datosBusqueda.codCliente == null && this.datosBusqueda.idEstado == 0 && this.datosBusqueda.idNotaContable == null && this.datosBusqueda.idNotaContableSap == null && this.datosBusqueda.aprobador == '' &&  this.datosBusqueda.originador == '' && this.datosBusqueda.idTipoNotaContable == 2) {
            this.tituloPOPUP = "ERROR - CONSULTAR REPORTE";
            this.mensajePOPUP = 'Debe ingresar datos para realizar la busqueda'
            this.abierto(modalContentError);
            return null;
        } else {
            if (this.datosBusqueda.codCliente != null) {
                if (this.datosBusqueda.codCliente.length <= 0) this.datosBusqueda.codCliente = null;
            }
            if (this.datosBusqueda.idNotaContable == null) this.datosBusqueda.idNotaContable = 0;
            
            this.ServicioReportesSync.getConsultarDatosReporte(this.datosBusqueda).subscribe(
                data => {
                    
                    this.NotasC = data;

                    for (var i = 0; i < this.NotasC.length; i++) {
                        this.NotasC[i].listaAprobadores = this.NotasC[i].aprobador.split(",", 1000);
                    }

                    this.collectionSize = this.NotasC.length;

                    if (this.NotasC == null) {
                        this.tituloPOPUP = "ERROR - CONSULTAR REPORTE";
                        this.mensajePOPUP = 'No se encontraron registros para los datos ingresados'
                        this.abierto(modalContentError);
                        this.ocultarBotonExcel = true;
                    }
                    else if (this.NotasC.length == 0){
                        this.tituloPOPUP = "ERROR - CONSULTAR REPORTE";
                        this.mensajePOPUP = 'No se encontraron registros para los datos ingresados'
                        this.abierto(modalContentError);
                        this.ocultarBotonExcel = true;
                    }
                    if (this.NotasC.length > 0) {
                        this.ocultarBotonExcel = false;
                    }
                });
        }
    }

    limpiar() {
        this.datosBusqueda = new ConsultaDatosReportes();
        this.NotasC = null;
        this.ocultarBotonExcel = true;
        this.collectionSize = 0;
    }

   
    
    exportToExcel(): void {

        
        const ws: xlsx.WorkSheet =
            xlsx.utils.json_to_sheet(this.NotasC);
        const wb: xlsx.WorkBook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
        xlsx.writeFile(wb, 'reportes.xlsx');
    }
}

