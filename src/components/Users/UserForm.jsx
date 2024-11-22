import React from 'react';
import {Field, reduxForm} from 'redux-form';

const validate = values => {
    const errors = {}
    if(!values.rol){
        errors.rol = "Campo requerido";
    }
    if(!values.name){
        errors.name = "Campo requerido";
    }
    if(!values.password){
        errors.password = "Campo requerido";
    }
    if(!values.username){
        errors.username = "Campo requerido";
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
        <input {...input} placeholder={placeholder} type={type} className="form-control" maxLength="30"/>
        {touched && ((error && <span style={{color: "red"}}>{error}</span>))}
    </div>
);

const UserForm = (props) => {    
    const {handleSubmit, tiendas} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Tienda</label>
                <br/>
                <Field
                    name="tiendaId"
                    component="select"
                    className="form-control"
                    required
                >
                    <option value="0">Seleccione una tienda</option>
                    {tiendas.map((x,y) => 
                        <option value={x.id} key={x.id}>{x.name}</option>
                    )}
                </Field>
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
            <div className="mb-3">
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Nombre"
                    placeholder="Ingrese nombre"
                />
            </div>
            <div className="mb-3">
                <Field
                    name="username"
                    type="text"
                    component={renderField}
                    placeholder="Ingrese nombre usuario"
                    label="Usuario"
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
    form: 'productoForm',
    validate
})(UserForm);