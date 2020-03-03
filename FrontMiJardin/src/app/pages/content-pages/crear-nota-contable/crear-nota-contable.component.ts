import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { CrearNotaContableService } from './crear-nota-contable.service';
import { AdministradorTRMService } from '../administrador-trm/administrador-trm.service';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { notaContable } from '../../../interfaces/notaContable';
import { nuevoProducto } from '../../../interfaces/nuevoProducto';
import { HttpClient } from '@angular/common/http';
import { find, filter } from 'rxjs/operators';
import { envioCorreo } from '../../../interfaces/envioCorreo';
import { tipoMoneda } from '../../../interfaces/TipoMoneda';
import { LayoutService } from 'app/shared/services/layout.service';
import { ModalDismissReasons, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tipoEstandar } from '../../../interfaces/tipoEstandar';
import { cliente } from '../../../interfaces/cliente';
import { filtroProducto } from '../../../interfaces/filtroProducto';
import { consultaNotaContable } from '../../../interfaces/consultaNotaContable';
import { MatTabChangeEvent } from '@angular/material';
import { unidadMedida } from '../../../interfaces/unidadMedida';


@Component({
    selector: 'app-crear-nota-contable',
    templateUrl: './crear-nota-contable.component.html',
    styleUrls: ['./crear-nota-contable.component.scss']
})
export class CrearNotaContableComponent implements OnInit {

    constructor(private servicioNotaContable: CrearNotaContableService, private router: Router, private http: HttpClient, private servicioUtilitarios: AdministradorTRMService, private usuarioLogueado: LayoutService, private modalService: NgbModal) { }
    
    @ViewChild('file',null) file: ElementRef;
    private _file: File;
    limpiarInputFile() {
        this.file.nativeElement.value = null;
    }
    listaUnidadesComerciales: Array<tipoEstandar>;
    listaPaises: Array<tipoEstandar>;
    listaEntidadesLegales: Array<tipoEstandar>;
    listaTiposMonedas: Array<tipoEstandar>;
    listaNegocios: Array<tipoEstandar>;
    listaConceptos: Array<tipoEstandar>;
    listaRegiones: Array<tipoEstandar>;
    listaTemporadas: Array<tipoEstandar>;
    listaPrograma: Array<tipoEstandar>;
    listaCuentasContables: Array<tipoEstandar>;
    listaUDN: Array<tipoEstandar>;
    closeResult: string;
    modalOptions: NgbModalOptions = {
        backdrop:"static"
    };
    tituloPOPUP: any;
    mensajePOPUP: any;
    monto = 0;
    montoUSD = 0;
    monedaD: number;
    monedaQ: tipoMoneda = new tipoMoneda;
    monedaPM: tipoMoneda = new tipoMoneda;
    monedaPC: tipoMoneda = new tipoMoneda;
    monedas: Array<tipoMoneda> = [];
    teste: Array<any>;
    listaClientes: Array<string> = [];
    prueba: Observable<any>;
    clienteSeleccionado: cliente = new cliente();
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    
    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
    
    
    arregloProductos: Array<nuevoProducto> = [];
    
    arregloNegocios: Array<any> = [];
    nuevoP = new nuevoProducto();
    producto = new nuevoProducto();
    monedaSel = true;
    borrador1 = true;
    verSiguente = true;
    nuevaNC = new notaContable();

    deshabilitarMoneda = true;
    tabProducto = true;
    btnAdjuntar = "hidden";
    masArchivo = "hidden";
    crearVal = false;
    codigoClienteInput = "";
    OcultarCombosRebate: boolean = true;
    activarBtnGuardar = false;
    
    productoSeleccionado: filtroProducto;
    nombreProductoMostar = '';
    nombreProductoMostarDetalle = '';
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    buscarProducto: string = "";
    parametroBuscar: string;
    buscarProd: string;
    parametroBusqueda: boolean;
    listaProductos: Array<filtroProducto>;
    parametrosBusqueda: consultaNotaContable = new consultaNotaContable(); 
    habilitarComboUDN: boolean = true;
    
    mostrarProductos(contentModificar) {
        this.modalOptions.size = "lg";
        this.tituloPOPUP = "CREAR NOTA CONTABLE - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }
 
    


    buscarProductos(buscarProd, parametroBusqueda, modalContentError) {
        

        if (buscarProd == '' || buscarProd == undefined && parametroBusqueda == undefined || parametroBusqueda == null) {
            this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
            this.abierto(modalContentError);
            this.mensajePOPUP = 'Ingrese los parametros de búsqueda (Descripción o Cód. Material sin marcar)';
            return null;

            

        } else if (buscarProd == '' || buscarProd == undefined) {
            this.tituloPOPUP = "ERROR - CONSULTAR NOTAS CONTABLES";
            this.mensajePOPUP = 'Ingrese datos en el campo Buscar para realizar la acción';
            this.abierto(modalContentError);
            return null;
        }

        if (buscarProd.length >= 4) {
            this.servicioNotaContable.getObtenerProductos(buscarProd, parametroBusqueda, this.clienteSeleccionado.idUnidadComercial).subscribe(
                data => {
                    this.listaProductos = data;
                    if (this.listaProductos.length > 0) this.ocultarTablaProductos = false
                    this.collectionSize = this.listaProductos.length;
                });
                
        } else {
            return null;

        }
       
    }
    limpiarCerrar() {
        this.listaProductos = [];
        this.buscarProd = '';
        this.parametroBusqueda = null;
        this.ocultarMensajeDes = true;
        this.ocultarMensajeCod = true;
        this.habilitarBoton = true;
        this.ocultarTablaProductos = true;
    }

    listaUnidadMedida: Array<unidadMedida>;
    obtenerUnidadMedida() {
        this.servicioNotaContable.getUnidadMedida(this.nuevaNC.idNegocio).subscribe(
            data => {
                
                this.listaUnidadMedida = data;
        });
    }

    ngOnInit() {

        this.clienteSeleccionado.idCombo = 0;
        this.nuevaNC.idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
        this.nuevaNC.idEstadoNotaContable = 1;
        
     
        this.servicioNotaContable.getObtenerNegocios().subscribe(
            data => {
                this.listaNegocios = data;
            });

        
        this.servicioNotaContable.getObtenerConceptos().subscribe(
            data => {
                this.listaConceptos = data;
            });

        this.servicioUtilitarios.getObtenerValorMoneda().subscribe(
            data => {

                this.monedas = data;
                this.monedaPC = this.monedas[0];
                this.monedaPM = this.monedas[1];
                this.monedaQ = this.monedas[2];

            });
    }

    deshabilitarMonedaF(cantidad) {
        if (cantidad > 0) this.deshabilitarMoneda = false;
        else this.deshabilitarMoneda = false;
    }

    public typed(value: string): void {
        this.teste = [];
        this.listaClientes = [];
        if (value.length >= 4) {
            this.servicioNotaContable.getClientes(value).subscribe(
                data => {
                    
                    this.teste = data;
                    for (let cliente of this.teste) {
                        this.listaClientes.push(cliente.codCliente);
                    }
                }
            );
        }

    }
    


    calcularValorUSD(idTipoMoneda, modalContentError) {
        
        var moneda = parseInt(idTipoMoneda);

        switch (moneda) {

            case this.monedaPC.idTipoMoneda: {
                this.nuevaNC.montoUSD = this.nuevaNC.monto / this.monedaPC.valor;
                break;
            }
            case 2: {
                this.monedaD = 1;
                this.nuevaNC.montoUSD = this.nuevaNC.monto / this.monedaD;
                break;
            }
            case this.monedaPM.idTipoMoneda: {
                this.nuevaNC.montoUSD = this.nuevaNC.monto / this.monedaPM.valor;
                break;
            }
            case this.monedaQ.idTipoMoneda: {
                this.nuevaNC.montoUSD = this.nuevaNC.monto / this.monedaQ.valor;
                break;
            }
            default: {
                
                this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                this.mensajePOPUP = 'Debe seleccionar un tipo de moneda';
                this.abierto(modalContentError);
                break;
            }
        }

    }
    
    SeleccionarProducto(produc: filtroProducto) {
        
        this.productoSeleccionado = produc;
        this.nombreProductoMostar = produc.nombre;
        this.listaProductos = [];
        this.buscarProd = '';
        this.producto.nombreProducto = this.productoSeleccionado.nombre;
        this.producto.idProducto = this.productoSeleccionado.tipo.toString();
        this.producto.unidadMedida = "0";
        
    }

    agregarProducto(modalContentError,producto) {
        
        if (producto.idProducto > 0 && producto.cantidad > 0 && producto.vlUnitario > 0) {

            if (producto.nLote != null && producto.nFactura != null) {
                
                if (producto.nLote.length > 0 && producto.nFactura.length > 0 ) {
                    this.producto.idMoneda = this.nuevaNC.idTipoMoneda.toString();
                    this.nuevoP = producto;
                    if (this.nuevoP.unidadMedida == "0") this.nuevoP.unidadMedida = "";
                    this.arregloProductos.push(this.nuevoP);
                    this.cambioPrecio(modalContentError);
                    this.producto = new nuevoProducto();
                    this.nombreProductoMostar = "";
                    this.producto.idMoneda = this.nuevaNC.idTipoMoneda.toString();
                } else {
                    this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = 'Ingrese todos los datos del producto.';
                    this.abierto(modalContentError);
                    return null;
                }

            } else {
                this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                this.mensajePOPUP = 'Ingrese todos los datos del producto.';
                this.abierto(modalContentError);
                return null;
            }

        } else {
            this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
            this.mensajePOPUP = 'Ingrese todos los datos del producto.';
            this.abierto(modalContentError);
            return null;
        }

        this.deshabilitarMonedaF(this.agregarProducto.length);



    }

    ObtenerArtibutosUnidadComercial(idPais) {
        if (idPais == "3") {
            this.habilitarComboUDN = false;
        } else {
            this.habilitarComboUDN = true;
        }
        this.nuevaNC.monto = 0;
        this.nuevaNC.montoUSD = 0;
        this.nuevaNC.idTipoMoneda = 0;
        this.nuevaNC.idUDN = 0;
        this.servicioNotaContable.getObtebtenerTiposMonedas(idPais).subscribe(
            data => {
                this.listaTiposMonedas = data;

            });
        
        this.servicioNotaContable.getObtenerUDN(idPais).subscribe(
            data => {
                this.listaUDN = data;

            });
        
    }


    seleccionoCliente(clienteSel:number) {
       
        this.clienteSeleccionado.idCombo = clienteSel;
        this.nuevaNC = new notaContable();
        this.nuevaNC.idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
        
        if (clienteSel > 0) {
            this.clienteSeleccionado = this.teste[clienteSel - 1];
            this.nuevaNC.idCliente = Number(this.clienteSeleccionado.idCliente);
            this.nuevaNC.nombrePais = this.clienteSeleccionado.nombrePais;
            this.nuevaNC.idUnidadComercial = Number(this.clienteSeleccionado.idUnidadComercial);
            this.nuevaNC.nombreUnidadComercial = this.clienteSeleccionado.nombreUnidadComercial;
            this.ObtenerArtibutosUnidadComercial(this.clienteSeleccionado.idPais);
            this.servicioNotaContable.getObtenerEntidadesLegales(this.clienteSeleccionado.idUnidadComercial).subscribe(
                data => {
                    
                    this.listaEntidadesLegales = data;
                });

            this.servicioNotaContable.getObtenerTemporadas(this.nuevaNC.idUnidadComercial).subscribe(
                data => {
                    this.listaTemporadas = data;
                });

           

            this.servicioNotaContable.getObtenerCuentasContables(this.nuevaNC.idUnidadComercial).subscribe(
                data => {
                    this.listaCuentasContables = data;
                });
        } else {
            
            this.nuevaNC = new notaContable();
            this.clienteSeleccionado = new cliente();
        }

        
          
        
    }


    habilidarProductos(monedaSel1,negocio1) {
        
        if (monedaSel1 > 0 && negocio1 > 0) {
            this.monedaSel = false;
            this.producto.idMoneda = monedaSel1;
            this.nuevaNC.monto = 0;
            this.nuevaNC.montoUSD = 0;
        } else {
            this.monedaSel = true;
        }


    }


    checkProducto(event: any) {
        
        if (event == true) {
            this.tabProducto = false;
            this.verSiguente = false;
            this.nuevaNC.monto = 0;
            this.nuevaNC.montoUSD = 0;
            this.arregloProductos = [];
            this.obtenerUnidadMedida();
            
        } else {
            this.tabProducto = true;
            this.nuevaNC.monto = 0;
            this.nuevaNC.montoUSD = 0;
            this.arregloProductos = [];
            
        }
        
    }




    eliminarAdjunto(index) {

        this.arrayfiles.splice(index, 1);
    }

    cambioPrecio(modalContentError) {
        var cantidad = 0;
        var valor = 0;
        this.nuevaNC.monto = 0;
        this.nuevaNC.montoUSD = 0;
        for (let producto of this.arregloProductos) {
            cantidad = parseFloat(producto.cantidad);
            valor = parseFloat(producto.vlUnitario);
            this.nuevaNC.monto += cantidad * valor;

        }
        this.calcularValorUSD(this.nuevaNC.idTipoMoneda, modalContentError);

    }

    eliminarProducto(modalContentError) {
        this.arregloProductos.splice(this.arregloProductos.indexOf(this.nuevoP), 1);
        this.cambioPrecio(modalContentError);
        this.deshabilitarMonedaF(this.agregarProducto.length);
    }

    cancelar(contentModal) {
        this.tituloPOPUP = "CREAR NOTA CONTABLE";
        this.mensajePOPUP = "¿Está seguro de Cancelar la Operación?";
        this.abierto(contentModal);
    }

    

    recargarPagina(validador: boolean) {
        
      if (validador)location.reload(true);
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
    guardar(contentModalError, contentModalConfirmacion) {
       
        
        this.nuevaNC.nombreCliente = this.clienteSeleccionado.nombreCliente;
        var descripcionCorreo = this.nuevaNC.descripcion;
        var nombreUnidadComercial = "";
        var nombreNegocio = "";
        
        if (this.arrayfiles.length > 0) this.nuevaNC.arregloArchivos = this.arrayfiles;
        if (this.validarFormularioCrearNC(this.nuevaNC, contentModalError)) {
            this.nuevaNC.idEstadoNotaContable = 1;

            nombreUnidadComercial = this.clienteSeleccionado.nombreUnidadComercial;
           
            for (let nombre of this.listaNegocios) {
                if (nombre.idTipo == this.nuevaNC.idNegocio) {
                    nombreNegocio = nombre.nombre;
                    break;
                }
            }
            var nuevoCorreo = new envioCorreo();
            nuevoCorreo.nombreUsuario = this.usuarioLogueado.consultarUsuarioLogeado().userName;
            nuevoCorreo.correoUsuario = this.usuarioLogueado.consultarUsuarioLogeado().correo;
            nuevoCorreo.nombreCliente = this.nuevaNC.nombreCliente;
            nuevoCorreo.estadoNota = "Pendiente";
            nuevoCorreo.descripcion = descripcionCorreo;
            nuevoCorreo.tipoNegocio = nombreNegocio.toString();
            nuevoCorreo.unidadComercial = nombreUnidadComercial.toString();
            this.nuevaNC.nuevoMail = nuevoCorreo;
            if (this.nuevaNC.tipoProducto) {
                if (this.arregloProductos.length <= 0) {
                    this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = "Debe agregar productos (pestaña Producto)";
                    this.abierto(contentModalError);
                    return null;
                } else {
                    this.tituloPOPUP = "CONFIRMACIÓN - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = "¿Desea crear la nota contable?";
                    this.abierto(contentModalConfirmacion);
                }
            } else {
                
                this.tituloPOPUP = "CONFIRMACIÓN - CREAR NOTA CONTABLE";
                this.mensajePOPUP = "¿Desea crear la nota contable?";
                this.abierto(contentModalConfirmacion);
            }
        }

    }

    confirmarGuardarNC(contentModal) {
        this.crearVal = true;
        var nuevaNota = this.nuevaNC;
        //nuevaNota.nuevoMail = new envioCorreo();
        var productos = null;
        this.activarBtnGuardar = true;
        if (this.arregloProductos.length > 0) {
            productos = this.arregloProductos;
        }
        this.servicioNotaContable.setNotaContable(this.nuevaNC, productos).subscribe(
            data => {
                debugger;
                var idNc = data;
                if (nuevaNota.notificacionCorreo) {
                    this.nuevaNC.nuevoMail.idNotaCredito = idNc;
                    this.servicioNotaContable.enviarCorreo(nuevaNota.nuevoMail);
                }
                if (nuevaNota.arregloArchivos) {
                    if (nuevaNota.arregloArchivos.length > 0) {
                        this.servicioNotaContable.setArchivosAdjuntos(nuevaNota.arregloArchivos, idNc, nuevaNota.idUsuario)
                    }
                }
                if (this.nuevaNC.idEstadoNotaContable == 2) {
                    this.tituloPOPUP = "CREAR BORRADOR NOTA CONTABLE";
                    this.mensajePOPUP = "Su borrador nota contable se creó satisfactoriamente con el id # " + idNc;
                } else {
                    this.tituloPOPUP = "CREAR NOTA CONTABLE";
                    this.mensajePOPUP = "Su nota contable se creó satisfactoriamente con el id # " + idNc;
                }
                this.activarBtnGuardar = false;
                this.abierto(contentModal);

            });
    }

    guardarBorrador(contentModalError, contentModalConfirmacion) {
        this.nuevaNC.idEstadoNotaContable = 2;
        var estado = "Borrador";

        this.nuevaNC.nombreCliente = this.clienteSeleccionado.nombreCliente;
        var descripcionCorreo = this.nuevaNC.descripcion;

        var nombreUnidadComercial = this.clienteSeleccionado.nombreUnidadComercial;
        
        var nombreNegocio = "";
        if (this.listaNegocios != null ) {
           
            for (let nombre of this.listaNegocios) {
                if (nombre.idTipo == this.nuevaNC.idNegocio) {
                    nombreNegocio = nombre.nombre;
                    break;
                }
            }
        }
        var nuevoCorreo = new envioCorreo();
        nuevoCorreo.nombreUsuario = this.usuarioLogueado.consultarUsuarioLogeado().userName;
        nuevoCorreo.correoUsuario = this.usuarioLogueado.consultarUsuarioLogeado().correo;
        nuevoCorreo.nombreCliente = this.nuevaNC.nombreCliente;
        nuevoCorreo.estadoNota = estado;
        nuevoCorreo.descripcion = descripcionCorreo;
        nuevoCorreo.tipoNegocio = nombreNegocio.toString();
        nuevoCorreo.unidadComercial = nombreUnidadComercial.toString();
        

        this.nuevaNC.nuevoMail = nuevoCorreo;

        if (this.arrayfiles.length > 0) this.nuevaNC.arregloArchivos = this.arrayfiles;
        if (this.nuevaNC.tipoProducto) {
            if (this.arregloProductos.length <= 0) {
                this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                this.mensajePOPUP = "Debe agregar productos (pestaña Producto)";
                this.abierto(contentModalError);
                return null;
            } else {
                this.tituloPOPUP = "CONFIRMACIÓN - CREAR NOTA BORRADOR CONTABLE";
                this.mensajePOPUP = "¿Desea crear borrador de la nota contable?";
                this.abierto(contentModalConfirmacion);
            }
        } else {

            this.tituloPOPUP = "CONFIRMACIÓN - CREAR BORRADOR NOTA CONTABLE";
            this.mensajePOPUP = "¿Desea crear borrador de la nota contable?";
            this.abierto(contentModalConfirmacion);
        }
    }

    validarFormularioCrearNC(notaContable: notaContable, contentModalError): boolean {
        
        this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
        if (notaContable == null) {
            return false;
        }

        if (notaContable.idCliente == null || notaContable.idCliente == 0) {
            this.mensajePOPUP = "Debe seleccionar un cliente (pestaña cliente)";
            this.abierto(contentModalError);
            return false;
        }

        if (notaContable.idTipoNota == null) {
            this.mensajePOPUP = "Debe seleccionar un tipo de nota contable (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;

        }
        
        if (notaContable.idEntidadLegal == null || notaContable.idEntidadLegal == 0) {
            this.mensajePOPUP = "Debe seleccionar entidad legal (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        if (notaContable.idTipoMoneda == null || notaContable.idTipoMoneda == 0) {
            this.mensajePOPUP = "Debe seleccionar tipo moneda (pestaña crear nota contable)";
            this.abierto(contentModalError);
            
            return false;
        }
        if (notaContable.idNegocio == null || notaContable.idNegocio == 0) {
            this.mensajePOPUP = "Debe seleccionar negocio (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        if (notaContable.idConcepto == null || notaContable.idConcepto == 0) {
            this.mensajePOPUP = "Debe seleccionar concepto (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        
        if ((notaContable.idUDN == null || notaContable.idUDN == 0) && this.clienteSeleccionado.idPais == "3") {
            this.mensajePOPUP = "Debe seleccionar UDN (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        if ((notaContable.monto == null || notaContable.monto <= 0) && (notaContable.tipoProducto == null || notaContable.tipoProducto == false)) {
            this.mensajePOPUP = "Debe ingresar monto (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        if (notaContable.descripcion == null || notaContable.descripcion.length < 1) {
            this.mensajePOPUP = "Debe ingresar descripción (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }
        if (notaContable.tipoProducto == null) {
            notaContable.tipoProducto = false;
        } 

        if (notaContable.notificacionCorreo == null) {
            notaContable.notificacionCorreo = false;
        }

        if (notaContable.arregloArchivos == null) {
            this.mensajePOPUP = "Debe agregar mínimo un archivo de evidencia (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        } else if (notaContable.arregloArchivos.length <= 0) {
            this.mensajePOPUP = "Debe agregar mínimo un archivo de evidencia (pestaña crear nota contable)";
            this.abierto(contentModalError);
            return false;
        }


        return true;
    }

    validacionGuardarBorrador() {
        
        this.borrador1 = true;
        if (this.nuevaNC.idCliente == null) {
            this.borrador1 = true;
            return null;
        } else if (this.nuevaNC.idCliente == 0) {
            this.borrador1 = true;
            return null;
        }
        if (this.nuevaNC.idTipoNota == null) {
            this.borrador1 = true;
            return null;
        }
        if (this.nuevaNC.descripcion == null) this.nuevaNC.descripcion == "";
        if (this.nuevaNC.idConcepto == null) this.nuevaNC.idConcepto == 0;
        
        if (this.nuevaNC.descripcion == null) {
            this.nuevaNC.descripcion = "";
        }

        if (this.nuevaNC.idConcepto == 0 && this.nuevaNC.descripcion.length <= 0 ) {
            this.borrador1 = true;
        } else {
            this.borrador1 = false;

        }
    }


    arrayfiles: Array<File> = [];
    temFile: File;
    uploadArchivo(event) {
        
        if (event.target.files && event.target.files.length > 0) {
            this.temFile = event.target.files[0];
            this.btnAdjuntar = "Show";
            event = null;
        }
        
        else return;


    }

    agregarTabla(modalContentError) {

        if (this.arrayfiles.length < 10) {
            var tamano = 20971520; // TAMAÑO MAX PERMITIDO
            if (this.temFile != null) {

                this.masArchivo = "Show"; // VISUALIZAR LA TABLA EN EL HTML
                var formatosValidos = ['img', 'bmp', 'gif ','jpeg ', 'jpg', 'tif', 'tiff ', 'png', 'pdf', 'mxls', 'doc', 'docx', 'xlsx', 'pptx', 'docm', 'dot', 'dotm', 'dotx', 'odt', 'rtf', 'txt', 'wps', 'xml', 'xps', 'csv', 'dbf', 'dif', 'ods', 'prn', 'slk', 'xlam', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx', 'xlw', 'bmp', 'emf', 'mp4', 'pot', 'potm', 'potx', 'ppt', 'pptm', 'pptx', 'wmv', 'avi', 'mp4', 'mkv', 'flv', 'mov']; // FORMATOS QUE SE DEBEN VALIDAR

                var archivo = this.temFile.name; // ARREGLO EN DONDE SE ENCUENTRA EL ARCHIVO CARGADO
                var ext = archivo.split('.'); // SEPARACION DEL NOMBRE DEL ARCHIVO Y LA EXTENCION
                var size = this.temFile.size; // TAMALLO DEL ARCHIVO EN BYTES
                var i;
                var val = false;
                for (i = 0; i < formatosValidos.length; i++) {
                    if (ext[1].toUpperCase() == formatosValidos[i].toUpperCase()) {
                        val = true;
                    }
                }
                if (size < tamano && val) {
                    val = true;
                } else {
                    val = false;
                }
                for (let fileNuevo of this.arrayfiles) {
                    if (fileNuevo.name === this.temFile.name) {
                        this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                        this.mensajePOPUP = 'El archivo "' + archivo + '" de evidencia ya fue cargado';
                        this.abierto(modalContentError);
                        this.temFile = null;
                        this.btnAdjuntar = "hidden";
                        this.limpiarInputFile();
                        return null;
                    }
                }


                if (!val) {
                    this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = 'El archivo "' + archivo + '" de evidencia no cumple con los parámetros establecidos';
                    this.abierto(modalContentError);
                    this.temFile = null;
                    this.btnAdjuntar = "hidden";
                    return null;
                }
                else {

                    this.arrayfiles.push(this.temFile);
                    this.temFile = null;
                    this.btnAdjuntar = "hidden";
                    this.limpiarInputFile();
                }
            } else {
                this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                this.mensajePOPUP = 'Se debe seleccionar un archivo';
                this.abierto(modalContentError);
                this.temFile = null;
                this.btnAdjuntar = "hidden";
                this.limpiarInputFile();
                return null;
            }
        } else {
            this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
            this.mensajePOPUP = 'Maximo 10 Archivos';
            this.abierto(modalContentError);
            return null;
        }


    }

    ocultarMensajeDes: boolean = true;
    ocultarMensajeCod: boolean = true;
    ocultarTablaProductos: boolean = true;
    habilitarBoton = true;

    visualizarMensaje() {
        
        if (this.parametroBusqueda.toString() == "true") {
            this.ocultarMensajeDes = false;
            this.ocultarMensajeCod = true;
            this.habilitarBoton = false;
        } else {
            this.ocultarMensajeDes = true;
            this.ocultarMensajeCod = false;
            this.habilitarBoton = false;
        }

    }


    detallesProducto(product: filtroProducto, contentModificar) {
        this.nombreProductoMostarDetalle = product.nombre;
        this.productoSeleccionado = product;
        this.producto.nombreProducto = this.productoSeleccionado.nombre;
        this.producto.idProducto = this.productoSeleccionado.tipo.toString();
        this.producto.unidadMedida = "0";
        this.tituloPOPUP = "CREAR NOTA CONTABLE - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }

    nombreProductoDetalle: string;
    cantidadProductoDetalle: string;
    vlrUnitarioProductoDetalle: string;
    loteProductoDetalle: string;
    facturaProductoDetalle: string;
    unidadMedidaDetalle: string;

    verDetallesProducto(mostrarProducto: nuevoProducto, contentModificar) {
        
        this.nombreProductoDetalle = mostrarProducto.nombreProducto;
        this.cantidadProductoDetalle = mostrarProducto.cantidad;
        this.vlrUnitarioProductoDetalle = mostrarProducto.vlUnitario;
        this.loteProductoDetalle = mostrarProducto.nLote;
        this.facturaProductoDetalle = mostrarProducto.nFactura;
        this.unidadMedidaDetalle = mostrarProducto.unidadMedida;

        this.tituloPOPUP = "CREAR NOTA CONTABLE - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }


    selectedIndex = 0;
    cambioPestana(tabChangeEvent: MatTabChangeEvent) {
        this.selectedIndex = tabChangeEvent.index;
    }

    CambiarPestanaSiguiente(){
        this.selectedIndex++;
    }

    CambiarPestanaAnterior() {
        this.selectedIndex--;
    }
        
    
    validacionRebate() {
        
        var concepto = parseInt(this.nuevaNC.idConcepto.toString());
        if (concepto == 9) {
            this.OcultarCombosRebate = false;
        }
        else {
            this.OcultarCombosRebate = true;
            this.nuevaNC.idCuentaContable = 0;
            this.nuevaNC.anio = null;
            this.nuevaNC.idTemporada = 0;
            this.nuevaNC.idPrograma = 0;
        }

    }

    validacionAnio(contentModificar) {
        debugger;
        if (this.nuevaNC.anio.toString().length != 4) {
            this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
            this.mensajePOPUP = 'Ingrese un formato de año correcto (AAAA)';
            this.abierto(contentModificar);
        }
    }

    cargarListaPrograma() {

        this.servicioNotaContable.getObtenerProgramas(this.nuevaNC.idTemporada).subscribe(
            data => {
                debugger;
                this.listaPrograma = data;
            });
    }
    

}

