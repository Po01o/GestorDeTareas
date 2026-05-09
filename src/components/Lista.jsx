import React, { useContext } from "react";
import GestorContext from "../GestorContext";

function Lista(){
    const { tareas, dispatch } = useContext(GestorContext);

    return (
        <div style={styles.contenedor}>
            <h2>Lista de tareas</h2>
            {tareas.length === 0?<p>No hay tareas</p>:tareas.map((tarea) => (
                        <div
                            key={tarea.id}
                            style={tarea.completada? styles.tareaCompletada: styles.tarea}
                        >
                            <h3>{tarea.titulo}</h3>
                            <p>{tarea.descripcion}</p>
                            <button
                                onClick={() =>
                                    dispatch({
                                        tipo: "CAMBIAR_ESTADO",
                                        id: tarea.id
                                    })
                                }
                            >
                                {tarea.completada ? "Pendiente": "Completar"}
                            </button>

                            <button
                                onClick={() =>
                                    dispatch({
                                        tipo: "ELIMINAR_TAREA",
                                        id: tarea.id
                                    })
                                }
                            >
                                Eliminar
                            </button>
                        </div>
                    )
                )
            }
        </div>
    );

    /*return (
        <div>
            <label>Lista de tareas:</label>
            <select>
                <option></option>
                <option>Tareas completadas</option>
                <option>Tareas pendientes</option>
                <option>Todas las tareas</option>
            </select>
        </div>

    );*/
}

const styles = {
    contenedor: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    tarea: {
        border: "2px solid gray",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "white"
    },

    tareaCompletada: {
        border: "2px solid green",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#d4ffd4",
        textDecoration: "line-through"
    }

};

export default Lista
