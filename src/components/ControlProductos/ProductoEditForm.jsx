import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { seleccionarProducto } from '../Redux/actions/productosActions';

const validate = values => {
    const errors = {}
    if(!values.name){
        errors.name = "Campo requerido";
    }
    if(!values.categoria){
        errors.categoria = "Campo requerido";
    }
    if(!values.presentacion){
        errors.presentacion = "Campo requerido";
    }
    if(!values.precio){
        errors.precio = "Campo requerido";
    }
    if(!values.stock){
        errors.stock = "Campo requerido";
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error }
}) => (
    <div>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched && ((error && <span style={{color: "red"}}>{error}</span>))}
    </div>
  );

let ProductoEditForm = (props) => {    
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Nombre de producto"
                    placeholder="Ingrese el nombre"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="color"
                    type="text"
                    component={renderField}
                    placeholder="Ingrese el color"
                    label="Color"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="precioVenta"
                    type="number"
                    component={renderField}
                    placeholder="Ingrese el precio de venta"
                    label="Precio Venta"
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

ProductoEditForm = reduxForm({
    form: 'productoEditForm',
    validate
})(ProductoEditForm);

ProductoEditForm = connect(
    state => ({
        initialValues: state.productos.selectedProduct
    }),
    { load: seleccionarProducto }
)(ProductoEditForm);

export default ProductoEditForm;