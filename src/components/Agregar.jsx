import React from "react";
import { useState, useContext, useReducer, useRef, useEffect } from "react";
import GestorContext from "../GestorContext";

function Agregar(){
    const { dispatch } = useContext(GestorContext)
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const tituloRef = useRef(null)

    useEffect(() => {
        tituloRef.current.focus();
    }, []);

    const agregarTarea = () => {
        if(titulo.trim() === "" || descripcion.trim() === ""){
            alert("Debes llenar ambos campos");
            return;
        }

        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            completada: false
        };

        dispatch({tipo: "AGREGAR_TAREA", tarea: nuevaTarea});

        setTitulo("");
        setDescripcion("");
        tituloRef.current.focus();
    };

    return (
        <div style={styles.contenedor}>
            <label style={styles.label} htmlFor="titulo">Nueva Tarea:</label>

            <textarea style={styles.textarea} ref={tituloRef} id="titulo" rows="2" cols="20" placeholder="Nombre" value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}/>

            <textarea style={styles.textarea} id="descripcion" rows="2" cols="33" placeholder="Descripcion" value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}/>

            <button style={styles.boton} onClick={agregarTarea}>
                Agregar
            </button>
        </div>
    );
}

const styles = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "2px solid #e0b840",
    borderRadius: "10px",
    width: "300px",
    backgroundColor: "#fffbe6",
    boxShadow: "3px 3px 8px rgba(180,140,0,0.2)"
  },
  label: {
    fontWeight: "bold",
    color: "#5a4200",
    fontFamily: "Verdana, sans-serif",
    fontSize: "1rem"
  },
  textarea: {
    borderRadius: "6px",
    border: "1px solid #c9a800",
    padding: "8px",
    backgroundColor: "#fffff0",
    fontFamily: "Verdana, sans-serif",
    fontSize: "0.9rem",
    resize: "vertical",
    color: "#3b2a00"
  },
  boton: {
    backgroundColor: "#e0b840",
    color: "#3b2a00",
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "Verdana, sans-serif",
    fontSize: "0.95rem"
  }
};

export default Agregar;
