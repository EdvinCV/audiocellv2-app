import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getReporteEncabezados, getReporteEncabezadosHoy, getReporteVentasGanancias, obtenerListadoVentasHoy, obtenerVentas, obtenerVentasUsuarios, getReporteVentasProducto} from '../Redux/actions/ventasActionBaruch';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import {Col, Container, Modal, Row, Tabs} from 'react-bootstrap';
import {RiPrinterLine} from 'react-icons/ri';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { Tab } from 'bootstrap';
import { obtenerUsuario } from '../Redux/actions/usersActions';
import { Redirect } from 'react-router-dom';
import VentaProductosBaruch from './VentaProductosBaruch';
import { obtenerProductos} from '../Redux/actions/productosBaruchActions';
import VentasDetalleTableBaruch from './VentasDetalleTableBaruch';
import VentasTableBaruch from './VentasTableBaruch';
import ReporteGananciasBaruch from './ReporteGananciasBaruch';

const ControlVentasBaruch = () => {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productosBaruch.productosBaruch);
    const productosNoDisponibles = useSelector((state) => state.productos.productosNoDisponibles);
    const [productoStock, setProductoVenta] = useState(null);
    const [formFechas, setFormFechas] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasReporte, setFormFechasReporte] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasGanancia, setFormFechasGanancia] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [formFechasEncabezado, setFormFechasEncabezado] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const [showForm, setShowForm] = useState(false);
    // Opciones de productos para select
    const [productsOptions, setProductOptions] = useState([]);
    const componentRef = useRef();

    // Obtener ventas
    useEffect(() => {
        dispatch(obtenerUsuario());
        dispatch(obtenerProductos());
    }, [dispatch])

    // Transformación de data de productos.
    useEffect(() => {
        if(productos && productosNoDisponibles){
            let productsTransform = productos.map((prod) => ({
                value: prod.id,
                label: `${prod.categoria}-${prod.name}${prod.color != null ? `-${prod.color}` : ''}`
            }));
            let productsTransformNo = productosNoDisponibles.map((prod) => ({
                value: prod.id,
                label: `${prod.categoria}-${prod.name}${prod.color != null ? `-${prod.color}` : ''}`
            }));
            setProductOptions([...productsTransform, ...productsTransformNo]);
        }
    }, [productos,productosNoDisponibles])

    const usuarioVerificacion = useSelector((state) => state.usuarios);

    const ventas = useSelector((state) => state.ventasBaruch.ventasBaruch);
    const reporteVentasUsuarios = useSelector((state) => state.ventas.reporteVentasUsuarios);
    const reporteGanancias = useSelector((state) => state.ventasBaruch.reporteGananciasBaruch);
    const ventaSeleccionada = useSelector((state) => state.ventas.ventaSeleccionada);
    const reporteEncabezados = useSelector((state) => state.ventas.encabezadosHoy);
    const reporteVentasProducto = useSelector((state) => state.ventasBaruch.reporteVentasProductoBaruch);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleInputChange = (e) => {
        setFormFechas({...formFechas,[e.target.name] : e.target.value});
    }

    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
    }

    const handleInputChangeGanancia = (e) => {
        setFormFechasGanancia({...formFechasGanancia,[e.target.name] : e.target.value});
    }

    const handleInputChangeEncabezado = (e) => {
        setFormFechasEncabezado({...formFechasEncabezado,[e.target.name] : e.target.value});
    }

    const handleObtenerVentas = () => {
        const {fechaInicio, fechaFin} = formFechas;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'Audiocell.',
                'error'
            );
        } else {
            const endDate = new Date(fechaFin);
            endDate.setDate(endDate.getDate() + 1);
            formFechas.fechaFin = endDate;
            dispatch(obtenerVentas(formFechas));
        }
    }

    const handleObtenerVentasHoy = () => {
        dispatch(obtenerListadoVentasHoy());
    }

    const handleObtenerVentasUsuarios = () => {
        const {fechaInicio, fechaFin} = formFechasReporte;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'Audiocell.',
                'error'
            );
        } else {
            dispatch(obtenerVentasUsuarios(formFechasReporte));
        }
    }

    const handleObtenerVentasGanancias = () => {
        const {fechaInicio, fechaFin} = formFechasGanancia;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'Audiocell.',
                'error'
            );
        } else {
            const endDate = new Date(fechaFin);
            endDate.setDate(endDate.getDate() + 1);
            formFechasGanancia.fechaFin = endDate;
            dispatch(getReporteVentasGanancias(formFechasGanancia));
        }
    }

    const handleObtenerEncabezados = () => {
        const {fechaInicio, fechaFin} = formFechasEncabezado;
        if(!fechaInicio || !fechaFin){
            Swal.fire(
                'Debe seleccionar dos fechas.',
                'Audiocell.',
                'error'
            );
        } else {
            dispatch(getReporteEncabezados(formFechasEncabezado));
        }
    }

    const handleObtenerEncabezadosHoy = () => {
        dispatch(getReporteEncabezadosHoy());
    }

    const handleObtenerVentasProducto = (values) => {
        if(productoStock == null)
        {
            Swal.fire('Error', 'Debe seleccionar un producto', 'error');
        }
        else
        {
            dispatch(getReporteVentasProducto(productoStock));
        }
    }

    if(usuarioVerificacion){
        if(usuarioVerificacion.me){
            console.log("USUARIO VER",usuarioVerificacion.me.rol);
            if(usuarioVerificacion.me.rol !== "ADMIN"){
                return (
                    <Redirect to="/home" />
                )
            }
        }
    }
    return (
        <div className="contenedor-ventasGeneral">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Reporte Ventas">
            <div className="contenedor-ventas">
            <h1>Listado de Ventas</h1>
            <div
                style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
            >
                <div>
                    <label htmlFor="">Fecha Inicio</label>
                    <input
                            name="fechaInicio"
                            className="form-control md-4"
                            type="date"
                            value={formFechas.formInicio}
                            onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Fecha Fin</label>
                    <input
                            name="fechaFin"
                            className="form-control md-4"
                            type="date"
                            value={formFechas.formFin}
                            onChange={handleInputChange}
                    />
                </div>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleObtenerVentas}
                >
                    Buscar Ventas
                </button>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleObtenerVentasHoy}
                >
                    Ventas Hoy
                </button>
            </div>
            <hr/>
            <div
                style={{overflowY: "scroll", maxHeight: "400px"}}
            >
                {
                    ventas ? (
                        <VentasTableBaruch
                            data={ventas}
                            setShowForm={setShowForm}
                        />
                    ) : (
                        <p></p>
                    )
                }
            </div>
            </div>
            </Tab>
            <Tab eventKey="ganancias" title="Reporte Ganancias">
            <div className="contenedor-ventas">
                <h1>Reporte de Ganancias</h1>
                <div
                    style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasGanancia.formInicio}
                                onChange={handleInputChangeGanancia}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasGanancia.formFin}
                                onChange={handleInputChangeGanancia}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleObtenerVentasGanancias}
                    >
                        Generar Reporte
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteGanancias ? (
                        <ReporteGananciasBaruch
                            data={reporteGanancias}
                        />
                    ) : (
                        <p></p>
                    )
                }
            </div>
            </div>
            </Tab>
            <Tab eventKey="vproductos" title="Ventas de producto">
            <div className="contenedor-ventas">
                <h1>Ventas por producto</h1>
                <div
                >
                    <VentaProductosBaruch
                        onSubmit={handleObtenerVentasProducto}
                        productos={productsOptions}
                        setProductoVenta={setProductoVenta}
                        productoStock={productoStock}
                    />
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    (reporteVentasProducto != null && reporteVentasProducto.length > 0) && (
                        <VentasDetalleTableBaruch 
                            data={reporteVentasProducto}
                        />
                    )
                }
            </div>
            </div>
            </Tab>
        </Tabs>
        </div>
    )
}

export default ControlVentasBaruch;