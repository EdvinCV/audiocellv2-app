import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { userLogout } from './Redux/actions/loginActions';
import { useHistory } from 'react-router-dom';
import { obtenerUsuario, selectTienda } from './Redux/actions/usersActions';
import './style.css';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // Obtener info del usuario logueado.
        dispatch(selectTienda());
        dispatch(obtenerUsuario());
    }, [dispatch])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
        history.push("/login");
    }

    const usuario = useSelector((state) => state.usuarios.me);

    return (
        <nav className="navbar navbar-dark fixed-top" style={{backgroundColor: "#121D3B"}}>
            <div className="container-fluid">
                <span 
                    className="navbar-media"
                    onClick={() => history.push("/home")}
                    style={{cursor: "pointer"}}
                >
                    <img src="icons/inicio.png" width="50px" alt="Audiocell" />
                    Audiocell - {usuario && usuario.name}
                </span>
                <span
                    className="navbar-media"
                    onClick={handleLogout}
                    href="#"
                    style={{cursor: "pointer"}}
                >
                    Cerrar Sesión
                </span>
            </div>
            
        </nav>
    );
}

export default Navbar;