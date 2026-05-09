import React from "react";
import { useState, useContext, useReducer } from "react";
import GestorContext from "../GestorContext";

function Agregar(){
    const { dispatch } = useContext(GestorContext)

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")

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
    };

    return (
        <div style={styles.contenedor}>
            <label htmlFor="titulo">Nueva Tarea:</label>

            <textarea id="titulo" rows="2" cols="20" placeholder="Nombre" value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}/>

            <textarea id="descripcion" rows="2" cols="33" placeholder="Descripcion" value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}/>

            <button onClick={agregarTarea}>
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
        padding: "15px",
        border: "1px solid gray",
        borderRadius: "10px",
        width: "300px"
    }
};


export default Agregar