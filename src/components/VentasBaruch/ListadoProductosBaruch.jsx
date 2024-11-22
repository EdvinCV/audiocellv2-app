import React, { useEffect, useState, useRef } from 'react';
import {obtenerProductosVenta} from '../Redux/actions/productosBaruchActions';
import { useSelector, useDispatch } from 'react-redux';
import ProductoCardBaruch from './ProductoCardBaruch';
import CardItemBaruch from './CardItemBaruch';
import { obtenerCaja } from '../Redux/actions/cajaActionsBaruch';
import VentaFormBaruch from './VentaFormBaruch';
import Loader from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';
import ReciboBaruch from './ReciboBaruch';

const ListadoProductosBaruch = () => {
    // DISPATCH
    const dispatch = useDispatch();
    const componentRef = useRef();
    // STATE
    const [loading, setLoading] = useState(true);
    const [buscador, setBuscador] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    // STORE
    const productos = useSelector((state) => state.productosBaruch.productosVentaBaruch); 
    const productosSeleccionado = useSelector((state) => state.ventasBaruch.productosSeleccionadosBaruch);
    const cajaAbierta = useSelector((state) => state.cajaBaruch.cajaAbiertaBaruch);
    const infoRecibo = useSelector((state) => state.ventasBaruch.reciboBaruch);
    const productosVendidos = useSelector((state) => state.ventasBaruch.productosVendidosBaruch);

    // EFFECTS
    useEffect(() => {
        dispatch(obtenerProductosVenta());
        dispatch(obtenerCaja());
    }, [dispatch]);
    // Cuando cambia caja
    useEffect(() => {
        if(cajaAbierta === true){
            setLoading(false);
        }else if(cajaAbierta === false){
            setLoading(false);
        }
    }, [cajaAbierta])
    // Buscador de productos
    useEffect(() => {
        if(productos){
            setProductosSeleccionados(productos);
        }
    }, [productos])
    useEffect(() => {
        if(buscador !== ""){
            if(productos){
                const nuevosProductos = productos.filter(
                    (prod) => 
                        (prod.name.toLowerCase().search(buscador.toLowerCase()) !== -1) ||  (prod.producto.toLowerCase().search(buscador.toLowerCase()) !== -1));
                setProductosSeleccionados(nuevosProductos);
            }
        } else {
            if(productos){
                setProductosSeleccionados(productos);
            }
        }
    }, [buscador, productos])

    // FUNCTIONS
    const handleChangeBuscador = (e) => {
        setBuscador(e.target.value);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    useEffect(() => {
        if(infoRecibo){
            handlePrint();
        }
    }, [infoRecibo, handlePrint]);

    if(loading){
        return(
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Loader type="ThreeDots" color="#121D3B" height={100} width={100}/>
            </div>
        )
    }
    else if(cajaAbierta){
        return (
            <div className="contenedorVentas">
                {
                    (infoRecibo && productosVendidos) &&
                        <div style={{display: "none"}}>
                            <ReciboBaruch  ref={componentRef} infoRecibo={infoRecibo} productos={productosVendidos}/>
                        </div>
                }
                <div className="contenedorProductosVentas">
                    <input style={{maxWidth: "40%"}} className="form-control md-4" type="text" value={buscador} onChange={handleChangeBuscador} placeholder="Buscar..."/>
                    <div className="productosCategoria">
                        {
                            productosSeleccionados.map((prod) => (
                                <ProductoCardBaruch
                                    key={prod.id}
                                    {...prod}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="contenedorFormVenta">
                    <h5>Información Venta</h5>
                    <hr/>
                    {
                        productosSeleccionado ? (
                            <>
                                {
                                    productosSeleccionado.map((prod,index) => (
                                        <CardItemBaruch key={prod.id} producto={prod} />
                                    ))
                                }
                                <hr/>
                                <VentaFormBaruch />
                                <div style={{display:"none"}}>
                                </div>
                            </>
                        ) : (
                            <h4>No ha seleccionado ningún elemento.</h4>
                        )
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className="divCaja">
                <h1>DEBE ABRIR CAJA PARA CONTINUAR.</h1>
            </div>
        )
    }
}
export default ListadoProductosBaruch;