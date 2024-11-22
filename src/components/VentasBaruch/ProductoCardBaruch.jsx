import React from 'react';
import { useDispatch } from 'react-redux';
import { agregarProductoCarrito } from '../Redux/actions/ventasActionBaruch';

const ProductoCardBaruch = ({id, name, producto, precioVenta, color, stock}) => {
    const dispatch = useDispatch();
    const handleAddCarrito = () => {
        dispatch(agregarProductoCarrito({id,name,producto,precioVenta,color, stock}))
    }

    return (
        <div className="productCard">
            <h6><strong>{name}</strong></h6>
            <h6><strong>{producto}</strong></h6>
            {
                color ?
                <p>{color}</p> :
                <p>---</p>
            }
            <p>Stock: {stock}</p>
            {
                precioVenta ?
                <p>Q.{precioVenta}</p> :
                <p>---</p>
            }
            <button
                className="btn btn-primary btn-block mb-0"
                onClick={handleAddCarrito}
            >
                Agregar
            </button>
        </div>
    );
}

export default ProductoCardBaruch;