import React from 'react';
import Swal from 'sweetalert2';
import { generarVenta } from '../Redux/actions/ventasActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {obtenerProductosVenta} from '../Redux/actions/productosActions';
import { useEffect } from 'react';

const VentaForm = ({setPrintRecibo}) => {

    const dispatch = useDispatch();
    const [showData, setShowData] = useState(false);
    const productosSeleccionados = useSelector((state) => state.ventas.productosSeleccionados);
    const total = useSelector((state) => state.ventas.total);

    const [formValues, setFormValues] = useState({
        metodoPago: null,
        nombre: null,
        nit: null,
        direccion: null,
        dpi: null,
        imei: null,
        icc: null,
        numero: null
    });

    useEffect(() => {
        productosSeleccionados.forEach((prod) => {
            if(prod.name.includes("Kit")){
                setShowData(true);
            }
        });
    }, [productosSeleccionados]);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Desea finalizar la venta?',
            showCancelButton: true,
            cancelButtonText: `Cancelar`,
            confirmButtonText: `FINALIZAR`,
            confirmButtonColor: '#021d34'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(formValues.metodoPago === null || formValues.metodoPago === ""){
                    Swal.fire(
                        'Debe seleccionar un método de pago.',
                        'Audiocell.',
                        'error'
                    );
                }
                else {
                    await dispatch(generarVenta(formValues));
                    // Se reinicializan los valores del formulario
                    setFormValues({
                        metodoPago: null,
                        nombre: null,
                        nit: null,
                        direccion: null,
                        dpi: null,
                        imei: null,
                        icc: null,
                        numero: null
                    });
                    await dispatch(obtenerProductosVenta());
                    
                }
            }
        });
        
    }

    return (
        <form
            onSubmit={handleSubmitForm}
        >
            {/* TIPO DE VENTA */}
            <label htmlFor="">Seleccione método de pago</label>
            <select
                name="metodoPago"
                className="form-select"
                aria-label="Default select example"
                onChange={handleInputChange}
            >
                <option value="">SELECCIONE MÉTODO DE PAGO</option>
                <option value="EFECTIVO">EFECTIVO</option>
                <option value="TARJETA">TARJETA</option>
            </select>
            {/* NOMBRE DEL CLIENTE */}
            <label htmlFor="">Nombre</label>
            <input 
                name="nombre"
                className="form-control"
                type="text"
                placeholder="Ingrese nombre de cliente"
                onChange={handleInputChange}
                required
                maxLength={50}
            />
            {/* NIT DEL CLIENTE */}
            <label htmlFor="">NIT</label>
            <input
                name="nit"
                className="form-control"
                type="number"
                placeholder="Ingrese NIT"
                onInput={(e) => e.target.value = e.target.value.slice(0, 13)}
                onChange={handleInputChange}
            />
            {/* DPI DEL CLIENTE */}
            <label htmlFor="">DPI</label>
            <input
                name="dpi"
                className="form-control"
                type="number"
                placeholder="Ingrese dpi"
                onInput={(e) => e.target.value = e.target.value.slice(0, 13)}
                onChange={handleInputChange}
            />
            {/* DIRECCION DEL CLIENTE */}
            <label htmlFor="">Dirección</label>
            <input
                name="direccion"
                className="form-control"
                type="text"
                placeholder="Ingrese dirección"
                maxLength={30}
                onChange={handleInputChange}
            />
            {
                showData === true &&
                <>
                    {/* NUMERO DEL TELEFONO */}
                    <label htmlFor="">Número teléfono</label>
                    <input
                        name="numero"
                        className="form-control"
                        type="number"
                        placeholder="Ingrese número de teléfono"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 8)}
                        onChange={handleInputChange}
                        required
                    />
                    {/* IMEI DEL TELÉFONO */}
                    <label htmlFor="">IMEI</label>
                    <input
                        name="imei"
                        className="form-control"
                        type="number"
                        placeholder="Ingrese IMEI"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 20)}
                        onChange={handleInputChange}
                        required
                    />
                    {/* ICC DEL TELEFONO */}
                    <label htmlFor="">ICC</label>
                    <input
                        name="icc"
                        className="form-control"
                        type="number"
                        placeholder="Ingrese ICC"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 20)}
                        onChange={handleInputChange}
                        required
                    />
                </>
            }
            <br/>
            <h5>Total: Q.{total}</h5>
            <button 
                className="btn btn-danger btn-block"
                type="submit"
            >
                Finalizar
            </button>
        </form>
    )
}

export default VentaForm;