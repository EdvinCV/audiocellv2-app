import React, {Component} from 'react';
import './recibo.css';

class Recibo extends Component {
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
                style={{width:"80mm", padding:"3mm", fontFamily: "serif", color: "black", fontSize: "10px"}}
            >
                {/* ENCABEZADO COMPROBANTE */}
                <div>
                    <center> <img src="icons/recibo.jpeg" alt="ChatMovil" width="200px" style={{filter: "grayscale(100%)"}}/> </center>
                </div>
                <div className="formatoRecibo">
                    <div style={{margin:"auto", textAlign:"center"}}>
                        <br />
                        <h6><b>Entrada Principal, San Miguel Ixtahuacán, San Marcos</b></h6>
                        <h6>Venta de teléfonos celulares, accesorios, servicio técnico, bocinas de diferentes presentaciones y mucho más</h6>
                    </div>
                    <br />
                    <h6>NO. {data.correlativo || ""}</h6>
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
                                        <h6>{p.Producto.name}-{p.Producto.color}-{p.Producto.Categorium.name}</h6>
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
                {/* CONDICIONES DE GARANTÍA */}
                <div>
                    <h6><b>CONDICIONES DE GARANTÍA</b></h6>
                    <p style={{margin: "0"}}>1.El dispositivo no carga y/o dura poco tiempo con carga</p>
                    <p style={{margin: "0"}}>2.La pantalla no funciona</p>
                    <p style={{margin: "0"}}>3.El micrófono y bocina presentan problemas.</p>
                    <p style={{margin: "0"}}>4.La cámara presenta inconvenientes.</p>
                    <p>
                        <b>Accesorios:</b>
                        No cuentan con ningun tipo de garantia
                        todos los accesorios se entregan probados.
                    </p>
                    <p>
                        EL TIEMPO ESTIMADO DE ENTREGA PARA CUBRIR GARANTIA (Tigo, Claro, Liberado) ES DE 15 DIAS HABILES.
                    </p>
                    <p>
                        El cliente acepta las condiciones de garantía descritas en este documento.
                    </p>
                <p>
                        Los dispositivos pierden garantia si presentan rastros de humedad o golpes</p>
                </div>
                <div style={{textAlign: "center"}}>
                    <p><b>SERVICIO Y GARANTÍA ES NUESTRO COMPROMISO CADA DÍA</b></p>
                    <p><b>GRACIAS POR SU COMPRA</b></p>
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


export default Recibo;