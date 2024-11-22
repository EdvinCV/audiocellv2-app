import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Actions
import { 
    obtenerProductos, 
    crearProducto, 
    seleccionarProducto, 
    editarProducto, 
    deleteProducto, 
    obtenerTotalProductos, 
    getReporteProductos, 
    crearProductoStock, 
    obtenerListadoStock, 
    getReporteProductosStock, 
    obtenerTotalInvertido 
} from '../Redux/actions/productosBaruchActions';
import { obtenerUsuario } from '../Redux/actions/usersActions';
// Bootstrap
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { obtenerCategorias } from '../Redux/actions/categoriasBaruchActions';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import { clientToken } from '../../config/axios';
// Components
import ProductoStockForm from './ProductoStockForm';
import ListadoStockBaruch from './ListadoStockBaruch';
import ReporteStockBaruch from './ReporteStockBaruch';
import ProductoBaruchForm from './ProductoBaruchForm';
import ProductsBaruchTable from './ProductsBaruchTable';
import ProductoEditFormBaruch from './ProductoEditFormBaruch';

const ProductosBaruch = () => {
    // Mostrar formulario de creacion.
    const [show, setShow] = useState(false);
    // Mostrar formulario de edicion.
    const [showFormEdit, setShowFormEdit] = useState(false);
    // Mostrar formulario de stock.
    const [showStock, setShowStock] = useState(false);
    const [productoStock, setProductoStock] = useState(null);
    const [showListadoStock, setShowListadoStock] = useState(false);
    const [formFechasReporte, setFormFechasReporte] = useState({
        fechaInicio: null,
        fechaFin: null
    });
    const handleInputChangeReporte = (e) => {
        setFormFechasReporte({...formFechasReporte,[e.target.name] : e.target.value});
    }
    // Verificar si usuario logueado es admin
    const [admin, setAdmin] = useState(false);
    // Opciones de productos para select
    const [productsOptions, setProductOptions] = useState([]);
    // Valor del buscador
    const [buscador, setBuscador] = useState("");
    // Loader
    const [loading, setLoading] = useState(true);
    // Dispatch
    const dispatch = useDispatch();
    
    // STORE
    const totalProductos = useSelector((state) => state.productosBaruch.totalProductosBaruch);
    const productos = useSelector((state) => state.productosBaruch.productosBaruch);
    const productosNoDisponibles = useSelector((state) => state.productosBaruch.productosBaruchNoDisponibles);
    const categorias = useSelector((state) => state.categoriasBaruch.categoriasBaruch);
    const usuario = useSelector((state) => state.usuarios);
    const listadoStock = useSelector((state) => state.productosBaruch.listadoStockBaruch);
    const reporteStock = useSelector((state) => state.productosBaruch.reporteStockBaruch);
    const totalInvertido = useSelector((state) => state.productosBaruch.totalInvertidoBaruch);
    
    // Obtener data del store
    useEffect(() => {
        dispatch(getReporteProductos());
        dispatch(obtenerTotalProductos());
        dispatch(obtenerProductos());
        dispatch(obtenerCategorias());
        dispatch(obtenerUsuario());
        dispatch(obtenerTotalInvertido());
    }, [dispatch])

    useEffect(() => {
        if(usuario){
            if(usuario.me){
                if(usuario.me.rol === "ADMIN"){
                    setAdmin(true);
                } else if(usuario.me.rol === "VENTAS"){
                    setAdmin(false);
                }
            }
        }
    }, [usuario])
    
    useEffect(() => {
        setLoading(false);
    }, [totalProductos]);
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
    // Obtener información de buscador
    useEffect(() => {
        if(buscador === ""){
            dispatch(obtenerTotalProductos());
            dispatch(obtenerProductos());
        } else {
            dispatch(obtenerTotalProductos(buscador));
            dispatch(obtenerProductos(1,buscador));
        }
    }, [buscador, dispatch])
    // Submit crear producto
    const handleSubmit = (values) => {
        setShow(false);
        dispatch(crearProducto(values));
    }
    // Submit agregar stock
    const handleSubmitStock = (values) => {
        if(!productoStock){
            Swal.fire('Debe seleccionar un producto','','error');
        }else {
            setShowStock(false);
            dispatch(crearProductoStock({cantidad:values.cantidad, precio:values.precioCompra,productoId: productoStock.value, proveedor: values.proveedor}));
        }
    }
    // Seleccionar producto para editar
    const handleSelectProducto = (producto) => {
        Swal.fire({
            title: 'Introduzca contraseña',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const user = {
                    password,
                    username: usuario.me.username
                    
                }
                return clientToken.post(`api/producto/verificar`, user)
                    .then(response => {
                        if(response.data.ok){
                            return response.data.msg
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Contraseña incorrecta, vuelva a intentar`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(seleccionarProducto(producto));
                    setShowFormEdit(true);
                }
            });
    }
    // Agregar stock
    const handleAgregarStock = (producto) => {
        Swal.fire({
            title: 'Introduzca contraseña',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                const user = {
                    password,
                    username: usuario.me.username
                    
                }
                return clientToken.post(`api/producto/verificar`, user)
                    .then(response => {
                        if(response.data.ok){
                            return response.data.msg
                        }
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Contraseña incorrecta, vuelva a intentar`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowStock(true);
                }
            });
    }
    // Seleccionar listado de stock
    const handleListStock = (producto) => {
        setShowListadoStock(true);
        dispatch(obtenerListadoStock(producto));
    }
    // Submit editar producto
    const handleSubmitEdit = (values) => {
        dispatch(editarProducto(values));
        setShowFormEdit(false);
    }
    // Cambiar valor del buscador
    const handleChangeBuscador = (e) => {
        setBuscador(e.target.value);
    }
    // Eliminar producto
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Desea eliminar el producto?',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Introduzca contraseña',
                    input: 'password',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: 'Confirmar',
                    showLoaderOnConfirm: true,
                    preConfirm: (password) => {
                        const user = {
                            password,
                            username: usuario.me.username
                            
                        }
                        return clientToken.post(`api/producto/verificar`, user)
                            .then(response => {
                                if(response.data.ok){
                                    return response.data.msg
                                }
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Contraseña incorrecta, vuelva a intentar`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(deleteProducto(id));
                        }
                    });
            }
        });
    }
    // Submit Reporte
    const handleSubmitReporte = () => {
        const {fechaInicio, fechaFin} = formFechasReporte;
            if(!fechaInicio || !fechaFin){
                Swal.fire(
                    'Debe seleccionar dos fechas.',
                    'Audiocell.',
                    'error'
                );
            } else {
                const endDate = new Date(fechaFin);
                endDate.setDate(endDate.getDate() + 1);
                formFechasReporte.fechaFin = endDate;
                dispatch(getReporteProductosStock(formFechasReporte));
            }
    }

    if(loading){
        return (
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Loader type="ThreeDots" color="#121D3B" height={100} width={100}/>
            </div>
        )
    } else {
        return (
            <div className="contenedor-controlProductos">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 mt-10">
                <Tab eventKey="home" title="Control Productos">
                    <div className="contenedor-productos">
                    <h1>Productos Disponibles</h1>
                    <br />
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}>
                        {
                            admin &&
                                <>
                                    <button className="btn btn-primary" onClick={() => setShow(true)}>
                                        Agregar Producto
                                    </button>
                                    <button className="btn btn-primary mt-2" onClick={handleAgregarStock}>
                                        Agregar Stock
                                    </button>
                                </>
                        }
                        <input
                            name="buscador"
                            className="form-control"
                            style={{maxWidth:"300px", marginTop:"2px"}}
                            type="text"
                            value={buscador}
                            onChange={handleChangeBuscador}
                            placeholder="Buscar..."
                        />
                    </div>
                    <hr/>
                    <div style={{overflowY: "scroll", textAlign: "center", maxHeight:"700px"}}>
                        {
                            productos ? (
                                productos.length > 0 ? (
                                    <ProductsBaruchTable
                                        data={productos}
                                        handleSelectProducto={handleSelectProducto}
                                        handleDelete={handleDelete}
                                        usuario={usuario}
                                        totalProductos={totalProductos}
                                        handleListStock={handleListStock}
                                    />
                                ) : (
                                    <p>No existen productos...</p>
                                )
                            ) : (
                                <Loader
                                    type="ThreeDots"
                                    color="#121D3B"
                                    height={100}
                                    width={100}
                                />
                            )
                        }
                    </div>
                    {/* FORM PARA CREAR NUEVO PRODUCTO */}
                    <Modal
                        show={show}
                        onHide={() => {setShow(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nuevo producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoBaruchForm
                                onSubmit={handleSubmit}
                                categorias={categorias}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA EDITAR PRODUCTO */}
                    <Modal
                        show={showFormEdit}
                        onHide={() => {setShowFormEdit(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoEditFormBaruch
                                onSubmit={handleSubmitEdit}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA AGREGAR STOCK DE PRODUCTO */}
                    <Modal
                        show={showStock}
                        onHide={() => {setShowStock(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Stock de producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoStockForm 
                                onSubmit={handleSubmitStock}
                                productos={productsOptions}
                                setProductoStock={setProductoStock}
                                productoStock={productoStock}
                            />
                        </Modal.Body>
                    </Modal>
                    </div>
                </Tab>
                <Tab eventKey="homeNo" title="No Disponibles">
                    <div className="contenedor-productos">
                    <h1>Productos No Disponibles</h1>
                    <br />
                    <div
                        style={{display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}
                        >
                        {
                            admin &&
                                <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShow(true)}
                                >
                                    Agregar Producto
                                </button>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={handleAgregarStock}
                                >
                                    Agregar Stock
                                </button>
                                </>
                        }
                        <input
                            name="buscador"
                            className="form-control"
                            style={{maxWidth:"300px", marginTop:"2px"}}
                            type="text"
                            value={buscador}
                            onChange={handleChangeBuscador}
                            placeholder="Buscar..."
                        />
                    </div>
                    <hr/>
                    <div
                        style={{overflowY: "scroll", textAlign: "center", maxHeight:"700px"}}
                    >
                        {
                            productosNoDisponibles ? (
                                productosNoDisponibles.length > 0 ? (
                                    <ProductsBaruchTable
                                        data={productosNoDisponibles}
                                        handleSelectProducto={handleSelectProducto}
                                        handleDelete={handleDelete}
                                        usuario={usuario}
                                        totalProductos={totalProductos}
                                        handleListStock={handleListStock}
                                    />
                                ) : (
                                    <p>No existen productos...</p>
                                )
                            ) : (
                                <Loader
                                    type="ThreeDots"
                                    color="#121D3B"
                                    height={100}
                                    width={100}
                                />
                            )
                        }
                    </div>
                    {/* FORM PARA CREAR NUEVO PRODUCTO */}
                    <Modal
                        show={show}
                        onHide={() => {setShow(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nuevo producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoBaruchForm
                                onSubmit={handleSubmit}
                                categorias={categorias}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA EDITAR PRODUCTO */}
                    <Modal
                        show={showFormEdit}
                        onHide={() => {setShowFormEdit(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoEditFormBaruch
                                onSubmit={handleSubmitEdit}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* FORM PARA AGREGAR STOCK DE PRODUCTO */}
                    <Modal
                        show={showStock}
                        onHide={() => {setShowStock(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Stock de producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoStockForm 
                                onSubmit={handleSubmitStock}
                                productos={productsOptions}
                                setProductoStock={setProductoStock}
                                productoStock={productoStock}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* LISTADO DE STOCKS */}
                    <Modal
                        show={showListadoStock}
                        onHide={() => {setShowListadoStock(false)}}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Listado de Stock</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                listadoStock ? (
                                    <ListadoStockBaruch 
                                        stocks={listadoStock}
                                        setShowListadoStock={setShowListadoStock}
                                    />
                                ) : (
                                    <Loader
                                        type="ThreeDots"
                                        color="#121D3B"
                                        height={100}
                                        width={100}
                                    />
                                )
                            }
                        </Modal.Body>
                    </Modal>
                    </div>
                </Tab>
                <Tab eventKey="reporte" title="Reporte Stock">
                    <div className="contenedor-productos">
                        <h1>Reporte de Stock</h1>
                        <div
                            style={{display: "flex", justifyContent:"space-around", flexWrap:"wrap"}}
                        >
                    <div>
                        <label htmlFor="">Fecha Inicio</label>
                        <input
                                name="fechaInicio"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formInicio}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha Fin</label>
                        <input
                                name="fechaFin"
                                className="form-control md-4"
                                type="date"
                                value={formFechasReporte.formFin}
                                onChange={handleInputChangeReporte}
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleSubmitReporte}
                    >
                        Buscar
                    </button>
                </div>
                <hr />
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                {
                    reporteStock && 
                        <ReporteStockBaruch
                            data={reporteStock}
                            admin={admin}
                        />
                }
            </div>
            </div>
                </Tab>
                {
                    admin &&
                        <Tab eventKey="total" title="Inversión">
                            <div className="contenedor-productos">
                                <div className="card text-center">
                                    <div className="card-header">
                                        <h3>Información de inversión</h3>
                                    </div>
                                    <div className="card-body">
                                        <h3>Total: <b>Q.{totalInvertido | 0}</b> </h3>
                                        <h4>Fecha: {new Date().toLocaleString("es-GT", {timeZone: "America/Guatemala"})}</h4>
                                    </div>
                                    <div className="card-footer text-muted">
                                    Audiocell.
                                    </div>
                                </div>
                            </div>
                        </Tab>
                }
            </Tabs>
            {/* LISTADO DE STOCKS */}
            <Modal
                size="lg"
                show={showListadoStock}
                onHide={() => {setShowListadoStock(false)}}
                backdrop="static"
                keyboard={false}
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Listado de Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        listadoStock ? (
                            <ListadoStockBaruch
                                stocks={listadoStock}
                                setShowListadoStock={setShowListadoStock}
                            />
                        ) : (
                            <Loader
                                type="ThreeDots"
                                color="#121D3B"
                                height={100}
                                width={100}
                            />
                        )
                    }
                </Modal.Body>
            </Modal>
            </div>
        )
    }
}

export default ProductosBaruch;