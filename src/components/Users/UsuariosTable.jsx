import React from 'react';
import {FaEdit} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';

const UsuariosTable = ({data, handleSelectUser, handleDeleteUser}) => {
    console.log("USERS:::", data);
    return (
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
            <th scope="col">Tienda</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
        {
            data.map((usuario, index) => (
                <tr
                    key={usuario.id}
                >
                <th scope="row">{index+1}</th>
                <td>{usuario.name}</td>
                <td>{usuario.username}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.rol !== "ADMIN" ? usuario.Tienda?.name : "-"} </td>
                <td style={{display: "flex", justifyContent: "center"}}>
                  <div style={{marginLeft: "2px"}}>
                    <button 
                      className="btn btn-warning"
                      onClick={() => handleSelectUser(usuario)}
                    >
                    Editar
                    <FaEdit 
                      size="20px"
                    />
                    </button>
                  </div>
                </td>
                <td>
                  <div style={{marginLeft: "20px"}}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(usuario.id)}
                      >
                      Eliminar
                      <AiFillDelete 
                        size="20px"
                      />
                      </button>
                    </div>
                </td>
                </tr>
            ))
        }
        </tbody>
      </table>
    )
}

export default UsuariosTable;