import React, {useEffect, useState} from 'react';
import './style.css';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { obtenerTiendas, obtenerUsuario, selectTienda } from './Redux/actions/usersActions';
import Loader from 'react-loader-spinner';
import Navbar from './Navbar';

const Home = () => {
    // HOOKS
    const dispatch = useDispatch();
    const history = useHistory();
    // STORE
    const usuario = useSelector((state) => state.usuarios);
    const tiendas = useSelector((state) => state.usuarios.tiendas);
    // STATE
    const [selectedOption, setSelectedOption] = useState(false);
    const [storeType, setStoreType] = useState(0);
    const [selectedStore, setSelectedStore] = useState({});

    useEffect(() => {
        dispatch(obtenerTiendas());
        // Obtener info del usuario logueado.
        dispatch(obtenerUsuario());
        dispatch((selectTienda(0)))
    }, [dispatch])

    useEffect(() => {
        try {
            setStoreType(usuario.me.Tienda.type);
        }
        catch(e){
            setStoreType(0);
        }
    }, [usuario])

    const seleccionarTienda = (x) => {
        setStoreType(x.type);
        setSelectedOption(true);
        setSelectedStore(x);
        dispatch(selectTienda(x.id));
    }

    if(usuario.me !== null && tiendas?.length > 0){
        if(usuario.me.rol === "ADMIN"){
            if(!selectedOption){
                return (
                    <>
                        <Navbar />
                        <div className="adminHomeView">
                            <div className='adminHomeViewBox' onClick={() => history.push("/usuarios")}>
                                <h2>Usuarios</h2>
                                <img className="homeViewImage" src="icons/usuarios.png" alt="USUARIOS"></img>
                            </div>
                            {tiendas.map((x,y) => 
                                <div className='adminHomeViewBox' onClick={() => seleccionarTienda(x)}>
                                    <h2>{x.name}</h2>
                                    {y%2 === 0 &&
                                        <img src="icons/charging.png" alt="" className="homeViewImage" style={{cursor: "pointer"}} onClick={()=>setSelectedOption(false)}/>
                                    }
                                    {y%2 !== 0 &&
                                        <img src="icons/010-chat.png" alt="" className="homeViewImage" style={{cursor: "pointer"}} onClick={()=>setSelectedOption(false)}/>
                                    }
                                </div>)}
                        </div>
                    </>
                )
            }
            else if(selectedOption && selectedStore.type === 1){
                return (
                    <div className="contenedor">
                    <h4 style={{position: 'absolute', left: "0", top: "0", cursor: "pointer"}} onClick={() => setSelectedOption(false)}>←Regresar</h4>
                    <p className='titleMenuText'>{selectedStore.name}</p>
                    {/* VENTAS */}  
                    <div className="contenedor1" id="uno" onClick={() => history.push("/venta")}>
                        <img  className="icon" src="icons/ventas.png" width="100px" alt="VENTAS"></img>
                        <p className="texto">VENTAS</p>
                    </div>
                    < div className="contenedor0" id="cero" /> 
                    {/* PRODUCTOS */}
                    <div className="contenedor1" id="dos" onClick={() => history.push("/productos")}>
                        <img  className="icon" src="icons/productos.png" width="100px" alt="PRODUCTOS"></img>
                        <p className="texto">PRODUCTOS</p>
                    </div>
                    <div className="contenedor0" id="cero" /> 
                        {/* USUARIOS Y REPORTES */}
                        {
                            usuario.me !== null && usuario.me.rol === "ADMIN" &&
                            <>
                                < div className="contenedor0" id="cero" /> 
                                {/* REPORTES */}
                                <div className="contenedor1" id="cuatro" onClick={() => history.push("/ventas")}>
                                    <img  className="icon" src="icons/reportes.png" width="50px" alt="REPORTES"></img>
                                    <p className="texto">REPORTES</p>
                                </div>
                                <div className="contenedor0" id="cero" /> 
                            </>
                        }
                        {/* CAJA */}
                        <div className="contenedor1" id="cinco" onClick={() => history.push("/caja")}>
                            <img  className="icon" src="icons/caja.png" width="50px" alt="CAJA"></img>
                            <p className="texto">CAJA</p>
                        </div>
                        <div className="contenedor0" id="cero" /> 
                        {/* CANCELACIONES */}
                        <div className="contenedor1" id="cinco" onClick={() => history.push("/canceladas")}>
                            <img  className="icon" src="icons/cancelaciones.png" width="50px" alt="CANCELACIONES"></img>
                            <p className="texto">CANCELACIONES</p>
                        </div>
                        <div className="contenedor0" id="cero" /> 
                    </div>
                )
            }
            else if(selectedOption && selectedStore.type === 2){
                return (
                    <>
                    <div className="contenedor">
                        <h4 style={{position: 'absolute', left: "0", top: "0", cursor: "pointer"}} onClick={() => setSelectedOption(false)}>←Regresar</h4>
                            {/* VENTAS */}
                            <div className="contenedor1" id="uno" onClick={() => history.push("/ventaBaruch")}>
                                <img  className="icon" src="icons/ventas.png" width="50px" alt="VENTAS"></img>
                                <p className="texto">VENTAS</p>
                            </div>
                            < div className="contenedor0" id="cero" /> 
                            {/* PRODUCTOS */}
                            < div className="contenedor1" id="dos" onClick={() => history.push("/productosBaruch")}>
                                <img  className="icon" src="icons/productos.png" width="50px" alt="PRODUCTOS"></img>
                                <p className="texto">PRODUCTOS</p>
                            </div>
                            < div className="contenedor0" id="cero" /> 
                            {/* USUARIOS Y REPORTES */}
                            {
                                usuario.me !== null && usuario.me.rol === "ADMIN" &&
                                <>
                                    < div className="contenedor0" id="cero" /> 
                                        {/* REPORTES */}
                                        <div className="contenedor1" id="cuatro" onClick={() => history.push("/ventasBaruch")}>
                                            <img  className="icon" src="icons/reportes.png" width="50px" alt="REPORTES"></img>
                                            <p className="texto">REPORTES</p>
                                        </div>
                                        <div className="contenedor0" id="cero" /> 
                                </>
                            }
                            {/* CAJA */}
                            <div className="contenedor1" id="cinco" onClick={() => history.push("/cajaBaruch")}>
                                <img  className="icon" src="icons/caja.png" width="50px" alt="CAJA"></img>
                                <p className="texto">CAJA</p>
                            </div>
                            <div className="contenedor0" id="cero" /> 
                        </div>
                    </>
                )
            }
        }
        // TIPO CELULARES
        else if(usuario.me.rol === "VENTAS" && storeType === 1){
            return (
                <>
                <div className="contenedor">
                    <Navbar />
                    {/* VENTAS */}  
                    <div className="contenedor1" id="uno" onClick={() => history.push("/venta")}>
                        <img  className="icon" src="icons/ventas.png" width="100px" alt="VENTAS"></img>
                        <p className="texto">VENTAS</p>
                    </div>
                    < div className="contenedor0" id="cero" /> 
                    {/* PRODUCTOS */}
                    <div className="contenedor1" id="dos" onClick={() => history.push("/productos")}>
                        <img  className="icon" src="icons/productos.png" width="100px" alt="PRODUCTOS"></img>
                        <p className="texto">PRODUCTOS</p>
                    </div>
                    <div className="contenedor0" id="cero" /> 
                        {/* USUARIOS Y REPORTES */}
                        {
                            usuario.me !== null && usuario.me.rol === "ADMIN" &&
                            <>
                                < div className="contenedor0" id="cero" /> 
                                {/* REPORTES */}
                                <div className="contenedor1" id="cuatro" onClick={() => history.push("/ventas")}>
                                    <img  className="icon" src="icons/reportes.png" width="50px" alt="REPORTES"></img>
                                    <p className="texto">REPORTES</p>
                                </div>
                                <div className="contenedor0" id="cero" /> 
                            </>
                        }
                        {/* CAJA */}
                        <div className="contenedor1" id="cinco" onClick={() => history.push("/caja")}>
                            <img  className="icon" src="icons/caja.png" width="50px" alt="CAJA"></img>
                            <p className="texto">CAJA</p>
                        </div>
                        <div className="contenedor0" id="cero" /> 
                        {/* CANCELACIONES */}
                        <div className="contenedor1" id="cinco" onClick={() => history.push("/canceladas")}>
                            <img  className="icon" src="icons/cancelaciones.png" width="50px" alt="CANCELACIONES"></img>
                            <p className="texto">CANCELACIONES</p>
                        </div>
                        <div className="contenedor0" id="cero" /> 
                    </div>
                    </>
            )
        }
        // TIPO DETALLE
        else if(usuario.me.rol === "VENTAS" && storeType === 2){
            return (
                <div className="contenedor p-5">
                    <Navbar />
                    <h4 style={{position: 'absolute', left: "0", top: "0", cursor: "pointer"}} onClick={() => setSelectedOption(false)}>←Regresar</h4>
                    {/* VENTAS */}
                    <div className="contenedor1" id="uno" onClick={() => history.push("/ventaBaruch")}>
                        <img  className="icon" src="icons/ventas.png" width="50px" alt="VENTAS"></img>
                        <p className="texto">VENTAS</p>
                    </div>
                    < div className="contenedor0" id="cero" /> 
                    {/* PRODUCTOS */}
                    < div className="contenedor1" id="dos" onClick={() => history.push("/productosBaruch")}>
                        <img  className="icon" src="icons/productos.png" width="50px" alt="PRODUCTOS"></img>
                        <p className="texto">PRODUCTOS</p>
                    </div>
                    < div className="contenedor0" id="cero" /> 
                    {/* USUARIOS Y REPORTES */}
                    {
                        usuario.me !== null && usuario.me.rol === "ADMIN" &&
                        <>
                            < div className="contenedor0" id="cero" /> 
                                {/* REPORTES */}
                                <div className="contenedor1" id="cuatro" onClick={() => history.push("/ventasBaruch")}>
                                    <img  className="icon" src="icons/reportes.png" width="50px" alt="REPORTES"></img>
                                    <p className="texto">REPORTES</p>
                                </div>
                                <div className="contenedor0" id="cero" /> 
                        </>
                    }
                    {/* CAJA */}
                    <div className="contenedor1" id="cinco" onClick={() => history.push("/cajaBaruch")}>
                        <img  className="icon" src="icons/caja.png" width="50px" alt="CAJA"></img>
                        <p className="texto">CAJA</p>
                    </div>
                    <div className="contenedor0" id="cero" /> 
                </div>
            )
        }
        else if(usuario.me.rol === "VENTAS" && storeType === 0){
            return( <p></p> )
        }
    }else {
        return(
            <div
                style={{display:"flex", alignItems:"center", justifyContent:"center"}}
            >
                <Loader
                    type="ThreeDots"
                    color="#121D3B"
                    height={100}
                    width={100}
                />
            </div>
        )
    }
}

export default Home;