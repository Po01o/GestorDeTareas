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
        <div className="gestor-filtro">
            <h2>Lista de tareas</h2>
            <select value={filtro} onChange={(e) => dispatch({tipo: "FILTRAR", filtro: e.target.value})}>
                <option value="Todas">Todas las tareas</option>
                <option value="Pendientes">Tareas pendientes</option>
                <option value="Completadas">Tareas completadas</option>
            </select>
            <p>Total de tareas: {tareasFiltradas.length}</p>
        </div>
    );
}

export default Filtro;