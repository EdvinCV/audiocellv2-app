import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {eliminarProductoCarrito, cambiarCantidadEpin, cambiarCantidadPrecio} from '../Redux/actions/ventasActionBaruch';
import Swal from 'sweetalert2';

const CardItemBaruch = ({producto}) => {
    const dispatch = useDispatch();

    const handleDeleteProduct = () => {
        dispatch(eliminarProductoCarrito(producto.id));
    }

    const handleTotal = (e) => {
        dispatch(cambiarCantidadEpin(e.target.value));
    }

    const handleChangePrecio = (e) => {
        if(e.target.value < 0){
            e.target.value = 1;
        }
        if(e.target.value > producto.stock){
            e.target.value = producto.stock;
        } else {
            dispatch(cambiarCantidadPrecio({id: producto.id,cantidad: e.target.value}));
        }
    }

    return(
        <div className="CardItem">
            <h5><b>{producto.name}</b></h5>
            <p>{producto.producto}</p>
            {
                (producto.name).includes("Epin") ? (
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Ingrese cantidad"
                        onChange={handleChangePrecio}
                        value={1}
                    />
                ) : (
                    <>
                        <p>Color: {producto.color ? producto.color: "-"}</p>
                        <p>Precio: {producto.precioVenta ? producto.precioVenta : "-"}</p>
                        <p>Stock: {producto.stock}</p>
                        <p>Ingrese cantidad:</p>
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={1}
                            onChange={handleChangePrecio}
                        />
                    </>
                )
            }
            <br/>
            <div>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteProduct}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default CardItemBaruch;