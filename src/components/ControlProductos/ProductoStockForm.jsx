import React from 'react';
import Select from 'react-select';
import {Field, reduxForm} from 'redux-form';

const validate = values => {
    const errors = {}
    if(!values.cantidad || values.cantidad < 0){
        errors.cantidad = "Campo requerido";
    }
    if(!values.precioCompra || values.precioCompra < 0){
        errors.precioCompra = "Campo requerido";
    }

    return errors;
}

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error }
}) => (
    <div>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} type={type} className="form-control"/>
        {touched && ((error && <span style={{color: "red"}}>{error}</span>))}
    </div>
);


const ProductoStockForm = (props) => {    
    // STATE
    const {handleSubmit,productos,setProductoStock,productoStock} = props;
    
    const handleInputChange = (e) => {
        setProductoStock(e);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Seleccione un producto</label>
                <Select
                    name="producto"
                    options={productos}
                    onChange={handleInputChange}
                    value={productoStock}
                />
                <br /> 
            </div>
            <div className="mb-3">
                <Field
                    name="proveedor"
                    type="string"
                    component={renderField}
                    label="Proveedor"
                    placeholder="Ingrese el proveedor"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="cantidad"
                    type="number"
                    component={renderField}
                    label="Cantidad Ingresada"
                    placeholder="Ingrese la cantidad"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="precioCompra"
                    type="number"
                    component={renderField}
                    label="Precio Compra"
                    placeholder="Ingrese el precio"
                />
            </div>
            <div>
                <button 
                    type="submit"
                    className="mt-3 btn btn-primary btn-block"
                >
                Guardar
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'productoStockForm',
    validate
})(ProductoStockForm);