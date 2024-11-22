import React, {Component} from 'react';
import './recibo.css';

class ReciboBaruch extends Component {
    constructor(){
        super();
        this.state = {
            totalVenta: 0
        }
    }

    getDerivedStateFrom

    render(){
        const data = this.props.infoRecibo ? this.props.infoRecibo : {};
        const prods = this.props.productos ? this.props.productos : [];
        return (
            // COMPROBANTE GENERAL
            <div
                style={{width:"80mm", padding:"3mm", fontFamily: "serif", color: "black", fontSize: "10px", borderColor: "black", borderStyle: "solid"}}
            >
                {/* ENCABEZADO COMPROBANTE */}
                <div>
                    <center> <img src="icons/detallesBaruchLogo.jpeg" alt="ChatMovil" width="250px" style={{filter: "grayscale(100%)"}}/> </center>
                </div>
                <div className="formatoRecibo">
                    <div style={{margin:"auto", textAlign:"center"}}>
                        <br />
                        <h6><b>Estamos ubicados en el centro comercial frente a la radio Arcángel San Miguel Ixtahuacan San Marcos</b></h6>
                    </div>
                    <br />
                    <h6>NO. {data.correlativo} BR2023221201</h6>
                </div>
                {/* INFO DEL COMPROBANTE */}
                <div>
                    <h6>FECHA: {new Date(data.createdAt).toLocaleDateString()}</h6>
                    <hr />
                    <h6>NOMBRE: {data.nombreCliente}</h6>
                    <h6>NIT: {data.nit ? data.nit : 'CF'}</h6>
                    <h6>DIRECCIÓN: {data.direccion}</h6>
                    <hr />
                </div>                
                {/* DESCRIPCION DEL ENCABEZADO */}
                <div
                    style={{display:"flex", justifyContent:"space-between"}}
                >
                    <div
                        style={{marginRight: "2px"}}
                    >
                        {
                            prods.map((p) => (
                                <div
                                    key={p.id}
                                >
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                        <h6>{p.Producto.name}-{p.Producto.color}</h6>
                                        <h6>.....Q.{p.precioFinal}</h6>
                                    </div>
                                    {/* AGREGAR TOTAL DE VENTA */}
                                    <div>
                                        {
                                            p.Producto.Categorium.name.includes("Kit") && 
                                            <>
                                                <h6>IMEI: {p.imei ? p.imei : '-'}</h6>
                                                <h6>ICC: {p.icc ? p.icc : '-'}</h6>
                                                <h6>No. {p.numero ? p.numero : '-'}</h6>
                                                <h6>DPI: {data.dpi ? data.dpi : '-'}</h6>
                                            </>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <div>
                            <h5>TOTAL VENTA: ...... Q.{data.total}</h5>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <br />
                    <p><b>GRACIAS POR SU COMPRA</b></p>
                    <p><b>ES UNA BENDICIÓN ATENDERLE, LOS ESPERAMOS</b></p>
                </div>
                <div
                    style={{height:"4cm", marginTop:"2 cm"}}
                >
                    <hr />
                </div>
            </div>
        );
    }
}


export default ReciboBaruch;