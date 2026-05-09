import React from "react";

function Lista(){

    const lista = []
    return (
        <div>
            <label>Lista de tareas:</label>
            <select>
                <option></option>
                <option>Tareas completadas</option>
                <option>Tareas pendientes</option>
                <option>Todas las tareas</option>
            </select>
        </div>
    );
}

export default Lista