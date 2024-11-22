import React, {useEffect} from 'react';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import {useDispatch, useSelector} from 'react-redux';
import { obtenerCajas } from '../Redux/actions/cajaActionsBaruch';
import CajasTableBaruch from './CajasTableBaruch';

const ListadoCajasBaruch = () => {
    const dispatch = useDispatch();

    // STATE
    const [loading, setLoading] = useState(true);
    const [buscador, setBuscador] = useState("");
    const [cajasSeleccionadas, setCajasSeleccionadas] = useState([]);
    // STORE
    const cajas = useSelector((state) => state.cajaBaruch.cajasGeneralBaruch);

    // Obtener ventas
    useEffect(() => {
        console.log("hola");
        dispatch(obtenerCajas());
    }, [dispatch])

    useEffect(() => {
        if(cajas){
            setLoading(false);
        }
    }, [cajas])

    const handleChangeBuscador = (e) => {
        setBuscador(e.target.value);
    }

    useEffect(() => {
        if(buscador !== ""){
            const nuevasCajas = cajas.filter(
                (caja) => 
                    ((new Date(caja.createdAt).toLocaleDateString().search(buscador)) !== -1));
            setCajasSeleccionadas(nuevasCajas);
        } else {
            setCajasSeleccionadas(cajas);
        }
    }, [buscador, cajas])

    if(loading){
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
    } else if(cajas){
        return (
            <div className="contenedor-ventas">
                <div
                    style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", alignItems:"center"}}
                >
                    <h1>Listado de Cajas</h1>
                    <input
                        style={{maxWidth: "20%"}}
                        className="form-control md-4"
                        type="text"
                        value={buscador}
                        onChange={handleChangeBuscador}
                        placeholder="Buscar..."
                    />
                </div>
                <hr/>
                <div
                    style={{overflowY: "scroll", maxHeight: "400px"}}
                >
                    {
                        cajasSeleccionadas ? (
                            <CajasTableBaruch
                                data={cajasSeleccionadas}
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
                </div>
            </div>
        )
    }
}

export default ListadoCajasBaruch;