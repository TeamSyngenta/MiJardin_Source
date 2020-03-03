import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { AdministradorTRMService } from '../administrador-trm/administrador-trm.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from "@angular/router";
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
import { CrearNotaContableService } from '../crear-nota-contable/crear-nota-contable.service';
import { ModificarNotaContableService } from './modificar-nota-contable.service';
import { notaContableRecall } from '../../../interfaces/notaContableRecall';
import { MatTabChangeEvent } from '@angular/material';
import { ActualizarNotaContable } from '../../../interfaces/ActualizarNotaContable';




@Component({
    selector: 'app-modificar-nota-contable',
    templateUrl: './modificar-nota-contable.component.html',
    styleUrls: ['./modificar-nota-contable.component.scss']
})
export class ModificarNotaContableComponent implements OnInit {

    constructor(private rutaActiva: ActivatedRoute, private servicioNotaContable: CrearNotaContableService, private router: Router, private http: HttpClient, private servicioUtilitarios: AdministradorTRMService, private usuarioLogueado: LayoutService, private modalService: NgbModal, private servicioModificarNC: ModificarNotaContableService,) { }

    @ViewChild('file',null) file: ElementRef;
    private _file: File;
    limpiarInputFile() {
        this.file.nativeElement.value = null;
    }
    activarBtnGuardar = true;
    listaUnidadesComerciales: Array<tipoEstandar>;
    listaPaises: Array<tipoEstandar>;
    listaEntidadesLegales: Array<tipoEstandar>;
    listaTiposMonedas: Array<tipoEstandar>;
    listaNegocios: Array<tipoEstandar>;
    listaConceptos: Array<tipoEstandar>;
    listaRegiones: Array<tipoEstandar>;
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
    nuevaNC = new notaContable();

    deshabilitarMoneda = true;
    tabProducto = true;
    btnAdjuntar = "hidden";
    masArchivo = "hidden";
    crearVal = false;
    codigoClienteInput = "";
    isMexico = true;


    verSiguente = true;
    productoSeleccionado: filtroProducto;
    nombreProductoMostar = '';
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    buscarProducto: string = "";
    parametroBuscar: string;
    buscarProd: string;
    parametroBusqueda: boolean;
    listaProductos: Array<filtroProducto>;
    parametrosBusqueda: consultaNotaContable = new consultaNotaContable(); 

    mostrarProductos(contentModificar) {
        this.modalOptions.size = "lg";
        this.tituloPOPUP = "CREAR NOTA CONTABLE - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }

    buscarProductos(buscarProd, parametroBusqueda) {
        
        if (buscarProd.length >= 4) {
            this.servicioNotaContable.getObtenerProductos(buscarProd, parametroBusqueda, this.clienteSeleccionado.idUnidadComercial).subscribe(
                data => {
                    this.listaProductos = data;
                });
        } else return null;
       
    }
    limpiarCerrar() {
        this.listaProductos = [];
        this.buscarProd = '';
    }

    datosNotacontable: notaContableRecall;

    idNotaContableMostrar = this.rutaActiva.snapshot.params.idNC;

    ngOnInit() {

        
        this.datosNotacontable = new notaContableRecall();
        this.datosNotacontable.notaContable = new notaContable();

        this.clienteSeleccionado.idCombo = 0;
        this.datosNotacontable.notaContable.idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
        
        this.datosNotacontable.notaContable.idEstadoNotaContable = 1;
        
        
        this.servicioModificarNC.getDatosNotaContableRecall(this.rutaActiva.snapshot.params.idNC).subscribe(
            data => {
                
                this.datosNotacontable = data;
                this.servicioNotaContable.getClientes(this.datosNotacontable.notaContable.codCliente).subscribe(
                    data => {
                        this.teste = data;
                        for (let cliente of this.teste) {
                            this.listaClientes.push(cliente.codCliente);
                        }
                        this.clienteSeleccionado = this.teste[0];
                        this.datosNotacontable.notaContable.idCliente = Number(this.clienteSeleccionado.idCliente);
                        this.datosNotacontable.notaContable.nombrePais = this.clienteSeleccionado.nombrePais;
                        this.datosNotacontable.notaContable.idUnidadComercial = Number(this.clienteSeleccionado.idUnidadComercial);
                        this.datosNotacontable.notaContable.nombreUnidadComercial = this.clienteSeleccionado.nombreUnidadComercial;
                        this.ObtenerArtibutosUnidadComercial(this.clienteSeleccionado.idPais);
                        this.servicioNotaContable.getObtenerEntidadesLegales(this.clienteSeleccionado.idUnidadComercial).subscribe(
                            data => {

                                this.listaEntidadesLegales = data;
                            });
                        
                        this.servicioUtilitarios.getObtenerValorMoneda().subscribe(
                            data => {
                                
                                this.monedas = data;
                                this.monedaPC = this.monedas[0];
                                this.monedaPM = this.monedas[1];
                                this.monedaQ = this.monedas[2];
                                this.calcularValorUSD(this.datosNotacontable.notaContable.idTipoMoneda, null);
                            });
                        
                    }
                );
                
                //this.nuevaNC = this.datosNotacontable.notaContable;
                //this.typed(this.nuevaNC.codCliente);
                //this.seleccionoCliente(1);
                //this.clienteSeleccionado.idCombo = 1;
                //this.nuevaNC.idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
            });

       
        
        //this.nuevaNC.idEstadoNotaContable = 1;
        
     
        this.servicioNotaContable.getObtenerNegocios().subscribe(
            data => {
                this.listaNegocios = data;
            });

        
        this.servicioNotaContable.getObtenerConceptos().subscribe(
            data => {
                this.listaConceptos = data;
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
                this.datosNotacontable.notaContable.montoUSD = this.datosNotacontable.notaContable.monto / this.monedaPC.valor;
                break;
            }
            case 2: {
                this.monedaD = 1;
                this.datosNotacontable.notaContable.montoUSD = this.datosNotacontable.notaContable.monto / this.monedaD;
                break;
            }
            case this.monedaPM.idTipoMoneda: {
                this.datosNotacontable.notaContable.montoUSD = this.datosNotacontable.notaContable.monto / this.monedaPM.valor;
                break;
            }
            case this.monedaQ.idTipoMoneda: {
                this.datosNotacontable.notaContable.montoUSD = this.datosNotacontable.notaContable.monto / this.monedaQ.valor;
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
    }

    agregarProducto(modalContentError,producto) {

        if (producto.idProducto > 0 && producto.cantidad > 0 && producto.vlUnitario > 0 && producto.nLote > 0 && producto.nFactura > 0) {

            this.producto.idMoneda = this.nuevaNC.idTipoMoneda.toString();
            this.nuevoP = producto;
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

        this.deshabilitarMonedaF(this.agregarProducto.length);



    }

    ObtenerArtibutosUnidadComercial(idPais) {
        if (idPais == "3") {
            this.isMexico = false;
        } else {
            this.isMexico = true;
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
        
        this.servicioNotaContable.getObtenerRegiones(idPais).subscribe(
            data => {
                this.listaRegiones = data;

            });
        
    }


    seleccionoCliente(clienteSel:number) {
        
        this.clienteSeleccionado.idCombo = clienteSel;
        //this.nuevaNC = new notaContable();
        this.datosNotacontable.notaContable.idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
        
        if (clienteSel > 0) {
            this.clienteSeleccionado = this.teste[clienteSel - 1];
            this.datosNotacontable.notaContable.idCliente = Number(this.clienteSeleccionado.idCliente);
            this.datosNotacontable.notaContable.nombrePais = this.clienteSeleccionado.nombrePais;
            this.datosNotacontable.notaContable.idUnidadComercial = Number(this.clienteSeleccionado.idUnidadComercial);
            this.datosNotacontable.notaContable.nombreUnidadComercial = this.clienteSeleccionado.nombreUnidadComercial;
            this.ObtenerArtibutosUnidadComercial(this.clienteSeleccionado.idPais);
            this.servicioNotaContable.getObtenerEntidadesLegales(this.clienteSeleccionado.idUnidadComercial).subscribe(
                data => {
                    
                    this.listaEntidadesLegales = data;
                });

        } else {
            
            this.datosNotacontable.notaContable = new notaContable();
            this.clienteSeleccionado = new cliente();
        }
    }


    seleccionoMoneda(monedaSel1) {

        if (monedaSel1 > 0) {
            this.monedaSel = false;
            this.producto.idMoneda = monedaSel1;
            this.datosNotacontable.notaContable.monto = 0;
            this.datosNotacontable.notaContable.montoUSD = 0;
        } else {
            this.monedaSel = true;
        }


    }


    checkProducto(event: any) {

        if (event == true) {
            this.tabProducto = false;
            this.nuevaNC.monto = 0;
            this.nuevaNC.montoUSD = 0;
            this.arregloProductos = [];
        } else {
            this.tabProducto = true;
            this.nuevaNC.monto = 0;
            this.nuevaNC.montoUSD = 0;
            this.arregloProductos = [];
        }
    }

    eliminarAdjuntoM(index) {

        this.datosNotacontable.listaFicheros.splice(index, 1);
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
        if (this.nuevaNC.idEstadoNotaContable == 1) {
            var estado = "Pendiente";
        }
        this.nuevaNC.nombreCliente = this.clienteSeleccionado.nombreCliente;
        var descripcionCorreo = this.nuevaNC.descripcion;
        var nombreUnidadComercial = "";
        var nombreNegocio = "";
        if (this.arrayfiles.length > 0) this.nuevaNC.arregloArchivos = this.arrayfiles;
        if (this.validarFormularioCrearNC(this.nuevaNC, contentModalError)) {
            

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
            nuevoCorreo.estadoNota = estado;
            nuevoCorreo.descripcion = descripcionCorreo;
            nuevoCorreo.tipoNegocio = nombreNegocio.toString();
            nuevoCorreo.unidadComercial = nombreUnidadComercial.toString();
            if (this.nuevaNC.tipoProducto) {
                if (this.arregloProductos.length <= 0) {
                    this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = "Debe agregar productos";
                    this.abierto(contentModalError);
                    return null;
                } else {
                    this.tituloPOPUP = "CONFIRMACIÓN - CREAR NOTA CONTABLE";
                    this.mensajePOPUP = "¿Desea crear la nota credito?";
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
        var productos = null;
        if (this.arregloProductos.length > 0) {
            productos = this.arregloProductos;
        }
        this.servicioNotaContable.setNotaContable(this.nuevaNC, productos).subscribe(
            data => {
                var idNc = data;
                if (nuevaNota.notificacionCorreo) {
                    nuevaNota.nuevoMail.idNotaCredito = idNc;
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
                
                this.abierto(contentModal);

            });
    }

    guardarBorrador() {
        this.nuevaNC.idEstadoNotaContable = 2;
        var estado = "Borrador";
        debugger;
        const NuevosDatosNotaC = new ActualizarNotaContable();
        NuevosDatosNotaC.idNotaContable = this.idNotaContableMostrar;
        NuevosDatosNotaC.listaProductos = this.arregloProductos;
        NuevosDatosNotaC.notaContable = this.datosNotacontable.notaContable;
        this.servicioModificarNC.ActNotaContable(NuevosDatosNotaC).subscribe(
            data => {
                var resultado = data;
            }
        );
        /*
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
                this.mensajePOPUP = "Debe agregar productos";
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
        }*/
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
        

        if (this.nuevaNC.idConcepto == 0 && (this.nuevaNC.descripcion == "" || this.nuevaNC.descripcion.length <= 0  )) {
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
                var formatosValidos = ['img', 'bmp', 'gif ', 'jpeg ', 'jpg', 'tif', 'tiff ', 'png', 'pdf', 'mxls', 'doc', 'docx', 'xlsx', 'pptx', 'docm', 'dot', 'dotm', 'dotx', 'odt', 'rtf', 'txt', 'wps', 'xml', 'xps', 'csv', 'dbf', 'dif', 'ods', 'prn', 'slk', 'xlam', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx', 'xlw', 'bmp', 'emf', 'mp4', 'pot', 'potm', 'potx', 'ppt', 'pptm', 'pptx', 'wmv', 'avi', 'mp4', 'mkv', 'flv', 'mov']; // FORMATOS QUE SE DEBEN VALIDAR

                var archivo = this.temFile.name; // ARREGLO EN DONDE SE ENCUENTRA EL ARCHIVO CARGADO
                var ext = archivo.split('.'); // SEPARACION DEL NOMBRE DEL ARCHIVO Y LA EXTENCION
                var size = this.temFile.size; // TAMALLO DEL ARCHIVO EN BYTES
                var i;
                var val = false;
                for (i = 0; i < formatosValidos.length; i++) {
                    if (ext[1] == formatosValidos[i]) {
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
    nombreProductoDetalle: string;
    cantidadProductoDetalle: string;
    vlrUnitarioProductoDetalle: string;
    loteProductoDetalle: string;
    facturaProductoDetalle: string;

    verDetallesProducto(mostrarProducto: nuevoProducto, contentModificar) {
        
        this.nombreProductoDetalle = mostrarProducto.descripcion;
        this.cantidadProductoDetalle = mostrarProducto.cantidad;
        this.vlrUnitarioProductoDetalle = mostrarProducto.vlUnitario;
        this.loteProductoDetalle = mostrarProducto.nLote;
        this.facturaProductoDetalle = mostrarProducto.nFactura;

        this.tituloPOPUP = "CREAR NOTA CONTABLE - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }

    selectedIndex = 0;
    cambioPestana(tabChangeEvent: MatTabChangeEvent) {
        this.selectedIndex = tabChangeEvent.index;
    }

    CambiarPestanaSiguiente() {
        this.selectedIndex++;
    }

    CambiarPestanaAnterior() {
        this.selectedIndex--;
    }


   

}

