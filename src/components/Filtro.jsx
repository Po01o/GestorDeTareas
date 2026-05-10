import React, { useState } from "react";
import { useContext } from "react";
import GestorContext from "../GestorContext";


function Filtro(){
    const { tareas, filtro, dispatch } = useContext(GestorContext)

    const tareasFiltradas = tareas.filter((tarea) => {
        if(filtro === "Completadas"){
            return tarea.completada;
        }
        if(filtro === "Pendientes"){
            return !tarea.completada;
        }

        return true;
    });

    return (
        <div style={styles.contenedor}>
            <h2 style={styles.titulo}>Lista de tareas</h2>
            <select style={styles.select} value={filtro} onChange={(e) => dispatch({tipo: "FILTRAR", filtro: e.target.value})}>
                <option value="Todas">Todas las tareas</option>
                <option value="Pendientes">Tareas pendientes</option>
                <option value="Completadas">Tareas completadas</option>
            </select>
            <p style={styles.contador}>Total de tareas: {tareasFiltradas.length}</p>
        </div>
    );
}

const styles = {
  contenedor: {
    marginTop: "20px",
    marginBottom: "10px",
    padding: "15px 20px",
    backgroundColor: "#fffbe6",
    border: "2px solid #e0b840",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "3px 3px 8px rgba(180,140,0,0.2)"
  },
  titulo: {
    color: "#5a4200",
    fontFamily: "Verdana, sans-serif",
    margin: "0 0 10px 0",
    fontSize: "1.1rem"
  },
  select: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #c9a800",
    backgroundColor: "#fffff0",
    fontFamily: "Verdana, sans-serif",
    fontSize: "0.9rem",
    color: "#3b2a00",
    cursor: "pointer"
  },
  contador: {
    marginTop: "8px",
    fontSize: "0.85rem",
    color: "#7a5c00",
    fontStyle: "italic"
  }
};

export default Filtro;
