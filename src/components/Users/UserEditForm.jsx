import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { seleccionarUsuario } from '../Redux/actions/usersActions';

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

let UserEditForm = (props) => {    
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    placeholder="Ingrese la contraseña"
                    label="Contraseña"
                />
            </div>
            <div className="mb-3">
                <label>Rol</label>
                <br/>
                <Field
                    name="rol"
                    component="select"
                    className="form-control"
                    required
                >
                    <option value="0">Seleccione un rol</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="VENTAS">VENTAS</option>
                </Field>
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

UserEditForm = reduxForm({
    form: 'userEditForm',
    validate
})(UserEditForm);

UserEditForm = connect(
    state => ({
        initialValues: state.usuarios.selectedUser
    }),
    { load: seleccionarUsuario }
)(UserEditForm);

export default UserEditForm;