import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {TiDeleteOutline} from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { deleteStock } from '../Redux/actions/productosActions';

const ListadoStock = ({stocks,setShowListadoStock}) => {

    const dispatch = useDispatch();

    const handleDeleteStock = (id) => {
        dispatch(deleteStock(id));
        setShowListadoStock(false);
    }

    const [disponible, setDisponible] = useState(0);

    useEffect(() => {
        if(stocks){
            let temp = 0;
            for(let s of stocks){
                temp += s.cantidadRestante;
            }
            setDisponible(temp);
        }
    },[stocks]);

    return (
        stocks && stocks.length > 0 &&
        (
            <>
            <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>Proveedor</th>
                            <th>Compra</th>
                            <th>Comprado</th>
                            <th>Restante</th>
                            <th>Ingreso</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {    
                        stocks.map((stock) => {
                            return (
                                <tr key={stock.id}>
                                <td>{stock.proveedor}</td>
                                <td>Q.{stock.precioCompra}</td>
                                <td>{stock.cantidadComprada}</td>
                                <td>{stock.cantidadRestante}</td>
                                <td>{new Date(stock.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteStock(stock.id)}
                                    >
                                        <TiDeleteOutline
                                            size="20px"
                                        />
                                    </button>
                                </td>
                                </tr>
                            )})
                    }
                    </tbody>
                </table>
                <p><b>Disponible:</b> {disponible}</p>
            </>
        )
    )
}

export default ListadoStock;