import React from 'react';
import Select from 'react-select';
import {Field, reduxForm} from 'redux-form';

const validate = values => {
    const errors = {}

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


const VentaProductos = (props) => {    
    const {handleSubmit,productos,setProductoVenta,productoStock} = props;
    
    const handleInputChange = (e) => {
        setProductoVenta(e);
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
            <div>
                <button 
                    type="submit"
                    className="mt-3 btn btn-primary btn-block"
                >
                Generar
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'ventaProductos',
    validate
})(VentaProductos);