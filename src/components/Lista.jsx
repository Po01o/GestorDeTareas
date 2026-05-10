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
                                <input style={styles.input} value={editandoDatos.titulo} onChange={(e) => 
                                setEditandoDatos({...editandoDatos, titulo: e.target.value}) }/>

                                <textarea style={styles.input} value={editandoDatos.descripcion} onChange={(e) =>
                                setEditandoDatos({...editandoDatos, descripcion: e.target.value}) }/>

                                <button style={styles.botonAccion} onClick={() => { dispatch({tipo: "EDITAR_TAREA", tarea: { 
                                id: tarea.id, titulo: editandoDatos.titulo, descripcion: editandoDatos.descripcion}}); 
                                setEditandoId(null);}}>
                                    Guardar
                                </button>

                                <button style={styles.botonAccion} onClick={() => setEditandoId(null)}>
                                    Cancelar
                                </button>
                                </>
                            ) : (
                                <>
                                <h3 style={styles.tituloTarea}>{tarea.titulo}</h3>
                                <p style={styles.descripcion}>{tarea.descripcion}</p>

                                <button style={styles.botonAccion} onClick={() => dispatch({tipo: "CAMBIAR_ESTADO", id: tarea.id}) }>
                                    {tarea.completada ? "Pendiente": "Completar"}
                                </button>

                                <button style={styles.botonAccion} onClick={() => { setEditandoId(tarea.id);
                                setEditandoDatos({ titulo: tarea.titulo, descripcion: tarea.descripcion});}}>
                                    Editar
                                </button>

                                <button style={styles.botonEliminar} onClick={() => dispatch({tipo: "ELIMINAR_TAREA", id: tarea.id}) }>
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
    gap: "15px",
    width: "300px",
    marginTop: "10px"
  },
  tarea: {
    border: "2px solid #c9a800",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#fffde7",
    boxShadow: "2px 2px 6px rgba(180,140,0,0.15)",
    fontFamily: "Verdana, sans-serif"
  },
  tareaCompletada: {
    border: "2px solid #7aab50",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#f0ffe0",
    boxShadow: "2px 2px 6px rgba(100,160,60,0.15)",
    textDecoration: "line-through",
    opacity: "0.85",
    fontFamily: "Verdana, sans-serif"
  },
  tituloTarea: {
    margin: "0 0 5px 0",
    color: "#3b2a00",
    fontSize: "1rem"
  },
  descripcion: {
    margin: "0 0 10px 0",
    fontSize: "0.85rem",
    color: "#6b5000"
  },
  botonAccion: {
    marginRight: "6px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontFamily: "Verdana, sans-serif",
    fontSize: "0.8rem",
    backgroundColor: "#e0b840",
    color: "#3b2a00",
    fontWeight: "bold"
  },
  botonEliminar: {
    marginRight: "6px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontFamily: "Verdana, sans-serif",
    fontSize: "0.8rem",
    backgroundColor: "#e07040",
    color: "#fff",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    marginBottom: "6px",
    padding: "5px 8px",
    borderRadius: "5px",
    border: "1px solid #c9a800",
    backgroundColor: "#fffff0",
    fontFamily: "Verdana, sans-serif",
    color: "#3b2a00",
    textDecoration: "none",
    opacity: "1"
  }
};

export default Lista;
