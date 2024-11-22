import React from 'react';
import {Field, reduxForm} from 'redux-form';
const validate = values => {
    const errors = {}
    if(!values.username){
        errors.username = "Debes ingresar un nombre de usuario";
    }
    if(!values.password){
        errors.password = "Debes ingresar una contraseña";
    }

    return errors;
}

const renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
    }) => (
    <div>
      <div
        style={{maxWidth:"500px", margin:"0 auto"}}
      >
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched &&
          ((error && <span style={{marginLeft: "30px", fontSize: "15px", color: "red", opacity: "0.7"}}>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const LoginForm = (props) => {
    
    const {handleSubmit} = props;
    return (
        <form 
            onSubmit={handleSubmit}
        >
            <div
                className="form-group"
            >
                <label htmlFor=""><b>Ingrese usuario</b></label>
                <Field
                    name="username"
                    type="text"
                    component={renderField}
                    label="Usuario"
                    autoComplete={true}
                />
                <br/>
                <label htmlFor=""><b>Ingrese contraseña</b></label>
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Contraseña"
                    
                />
            </div>
            <div>
                <button 
                    style={{backgroundColor:"#121D3B", color: "white"}}
                    type="submit"
                    className="mt-2 btn btn-block"
                >
                Ingresar
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);