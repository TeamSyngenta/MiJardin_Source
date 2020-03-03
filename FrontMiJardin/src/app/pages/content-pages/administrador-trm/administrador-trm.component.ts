import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdministradorTRMService } from './administrador-trm.service';
import { tipoMoneda } from '../../../interfaces/TipoMoneda';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask'


@Component({
    selector: 'app-administrador-trm',
    templateUrl: './administrador-trm.component.html',
    styleUrls: ['./administrador-trm.component.scss']
})
export class AdministradorTRMComponent implements OnInit {

    constructor(private ServicioUtilitarios: AdministradorTRMService, private routter: Router, private http: HttpClient, private modalService: NgbModal, private NgxMaskModule: NgxMaskModule) { }
    monedas: Array<tipoMoneda> = [];
    monedasActualizar: Array<tipoMoneda> = [];
    monedaQ: tipoMoneda = new tipoMoneda();
    monedaPM: tipoMoneda = new tipoMoneda();
    monedaPC: tipoMoneda = new tipoMoneda();

    modalOptions: NgbModalOptions = {
        backdrop: "static"
    };
    closeResult: string;
    tituloPOPUP: any;
    mensajePOPUP: any;
    ngOnInit() {

        this.ServicioUtilitarios.getObtenerValorMoneda().subscribe(
            data => {

                this.monedas = data;
                this.monedaPC = this.monedas[0];
                this.monedaPC.valorNuevo = null;
                this.monedaPM = this.monedas[1];
                this.monedaPM.valorNuevo = null;
                this.monedaQ = this.monedas[2];
                this.monedaQ.valorNuevo = null;
            });
    }
    reloadVar = false;
    guardar(contentModalConfirmacion, contentModalError) {
        debugger;
        var valTRMMoneda = false;
        if (this.monedaPC.valorNuevo > 0) {
            this.monedasActualizar.push(this.monedaPC);
            valTRMMoneda = true;
        }
        if (this.monedaPM.valorNuevo > 0) {
            this.monedasActualizar.push(this.monedaPM);
            valTRMMoneda = true;
        }
        if (this.monedaQ.valorNuevo > 0) {
            this.monedasActualizar.push(this.monedaQ);
            valTRMMoneda = true;
        } 

        if (valTRMMoneda) {
            this.reloadVar = true;
            this.tituloPOPUP = "CONFIRMACI\u00D3N - ADMINISTRACI\u00D3N TRM";
            this.mensajePOPUP = "\u00BFEst\u00E1 seguro de actualizar los valores del TRM?";
            this.abierto(contentModalConfirmacion);
        }
            
        else {
            this.reloadVar = false;
            this.tituloPOPUP = "ERROR - ADMINISTRACI\u00D3N TRM";
            this.mensajePOPUP = "Debe ingresar un valor mayor a cero para poder actualizar";
            this.abierto(contentModalError);
        }
    }

    confirmarGuardar(contentModal) {
        this.reloadVar = true;
        
        this.ServicioUtilitarios.ActualizarValorMoneda(this.monedasActualizar).subscribe(
            data => {
                var res = data;
                
               
                if (res) {
                    this.tituloPOPUP = "GUARDAR - ADMINISTRACI\u00D3N TRM";
                    this.mensajePOPUP = "Se actualizaron los valores de TRM";
                    this.abierto(contentModal);
                } else {
                }
            }
        );
    }

    limpiar(contentModal) {
        this.tituloPOPUP = "ADMINISTRACI\u00D3N DE TRM";
        this.mensajePOPUP = "\u00BF Est\u00E1 seguro que desea limpiar los cambios realizados?";
        this.abierto(contentModal);
    }
    
    
    refrescarPagina() {
        
        if (this.reloadVar) location.reload(true);
    }



    abierto(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            
        }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                
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

    formatoMoneda(tipoMoneda) {
        {
           
            switch (tipoMoneda) {
                
                case 1: {
                    if (this.monedaPC.valorNF.length > 0) {
                        var money = this.monedaPC.valorNF;
                        this.monedaPC.valorNuevo = parseFloat(this.monedaPC.valorNF);
                        let valor = money;
                        
                        this.monedaPC.valorNF = money;
                    } else {
                        this.monedaPC.valorNuevo = 0;
                    }
                    break;
                }
                case 2: {
                    if (this.monedaPM.valorNF.length > 0) {
                        var money = this.monedaPM.valorNF;
                        this.monedaPM.valorNuevo = parseFloat(this.monedaPM.valorNF);
                        let valor = money;
                        
                        this.monedaPM.valorNF = money;
                    }else {
                        this.monedaPM.valorNuevo = 0;
                    }
                    break;
                }
                case 3: {
                    if (this.monedaQ.valorNF.length > 0) {
                        var money = this.monedaQ.valorNF;
                        this.monedaQ.valorNuevo = parseFloat(this.monedaQ.valorNF);
                        let valor = money;
                        
                        this.monedaQ.valorNF = money;
                    } else {
                        this.monedaQ.valorNuevo = 0;
                    }
                    break;
                }
                default: {

                    break;
                }
            }


        }
    }
}
