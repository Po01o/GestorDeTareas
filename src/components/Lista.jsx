import React from "react";
import { useContext, useState } from "react";
import GestorContext from "../GestorContext";

function Lista(){
    const { tareas, filtro, dispatch } = useContext(GestorContext);
    const [editandoId, setEditandoId] = useState(null);
    const [editandoDatos, setEditandoDatos] = useState({
        titulo: "",
        descripcion: ""
    });

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
            {tareasFiltradas.length === 0 ? <p>No hay tareas</p> : tareasFiltradas.map((tarea) => (
                        <div key={tarea.id} style={tarea.completada ? styles.tareaCompletada : styles.tarea}>
                            {editandoId === tarea.id ? (
                                <>
                                <input value={editandoDatos.titulo} onChange={(e) => 
                                setEditandoDatos({...editandoDatos, titulo: e.target.value}) }/>

                                <textarea value={editandoDatos.descripcion} onChange={(e) =>
                                setEditandoDatos({...editandoDatos, descripcion: e.target.value}) }/>

                                <button onClick={() => { dispatch({tipo: "EDITAR_TAREA", tarea: { 
                                id: tarea.id, titulo: editandoDatos.titulo, descripcion: editandoDatos.descripcion}}); 
                                setEditandoId(null);}}>
                                    Guardar
                                </button>

                                <button onClick={() => setEditandoId(null)}>
                                    Cancelar
                                </button>
                                </>
                            ) : (
                                <>
                                <h3>{tarea.titulo}</h3>
                                <p>{tarea.descripcion}</p>

                                <button onClick={() => dispatch({tipo: "CAMBIAR_ESTADO", id: tarea.id}) }>
                                    {tarea.completada ? "Pendiente": "Completar"}
                                </button>

                                <button onClick={() => { setEditandoId(tarea.id);
                                setEditandoDatos({ titulo: tarea.titulo, descripcion: tarea.descripcion});}}>
                                    Editar
                                </button>

                                <button onClick={() => dispatch({tipo: "ELIMINAR_TAREA", id: tarea.id}) }>
                                    Eliminar
                                </button>
                                </>
                            )}
                        </div>
                    )
                )
            }
        </div>
    );
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

export default Lista;