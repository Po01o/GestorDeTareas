import React from "react";
import { useContext, useState } from "react";
import GestorContext from "../GestorContext";

function Lista() {
  const { tareas, filtro, dispatch } = useContext(GestorContext);
  const [editandoId, setEditandoId] = useState(null);
  const [editandoDatos, setEditandoDatos] = useState({ titulo: "", descripcion: "" });

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "Completadas") return tarea.completada;
    if (filtro === "Pendientes") return !tarea.completada;
    return true;
  });

  return (
    <div style={styles.contenedor}>
      {tareasFiltradas.length === 0 ? (
        <div style={styles.vacio}>
          <span style={styles.vacioIcon}>◎</span>
          <p style={styles.vacioTexto}>No hay tareas aquí</p>
        </div>
      ) : (
        tareasFiltradas.map((tarea) => (
          <div
            key={tarea.id}
            style={tarea.completada ? styles.tareaCompletada : styles.tarea}
          >
            <div style={styles.checkWrapper}>
              <input
                type="checkbox"
                id={`check-${tarea.id}`}
                checked={tarea.completada}
                onChange={() => dispatch({ tipo: "CAMBIAR_ESTADO", id: tarea.id })}
                style={styles.checkboxNative}
              />
              <label htmlFor={`check-${tarea.id}`} style={styles.checkboxCustom}>
                {tarea.completada && <span style={styles.checkMark}>✓</span>}
              </label>
            </div>

            {editandoId === tarea.id ? (
              <div style={styles.editArea}>
                <input
                  style={styles.inputEditar}
                  value={editandoDatos.titulo}
                  onChange={(e) =>
                    setEditandoDatos({ ...editandoDatos, titulo: e.target.value })
                  }
                  placeholder="Título"
                />
                <input
                  style={styles.inputEditar}
                  value={editandoDatos.descripcion}
                  onChange={(e) =>
                    setEditandoDatos({ ...editandoDatos, descripcion: e.target.value })
                  }
                  placeholder="Descripción"
                />
              </div>
            ) : (
              <div style={styles.textoArea}>
                <span style={tarea.completada ? styles.tituloCompletado : styles.titulo}>
                  {tarea.titulo}
                </span>
                <span style={styles.descripcion}>{tarea.descripcion}</span>
              </div>
            )}

            <div style={styles.botones}>
              {editandoId === tarea.id ? (
                <>
                  <button
                    style={styles.botonGuardar}
                    onClick={() => {
                      dispatch({
                        tipo: "EDITAR_TAREA",
                        tarea: {
                          id: tarea.id,
                          titulo: editandoDatos.titulo,
                          descripcion: editandoDatos.descripcion,
                        },
                      });
                      setEditandoId(null);
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    style={styles.botonCancelar}
                    onClick={() => setEditandoId(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={styles.botonEditar}
                    onClick={() => {
                      setEditandoId(tarea.id);
                      setEditandoDatos({ titulo: tarea.titulo, descripcion: tarea.descripcion });
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.botonEliminar}
                    onClick={() => dispatch({ tipo: "ELIMINAR_TAREA", id: tarea.id })}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  tarea: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#fffde7",
    border: "1px solid #d4a000",
    borderRadius: "12px",
    padding: "14px 18px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  tareaCompletada: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #86efac",
    borderRadius: "12px",
    padding: "14px 18px",
    boxSizing: "border-box",
    opacity: "0.8",
    boxShadow: "none",
  },
  checkWrapper: {
    position: "relative",
    flexShrink: 0,
  },
  checkboxNative: {
    position: "absolute",
    opacity: 0,
    width: "24px",
    height: "24px",
    cursor: "pointer",
    zIndex: 1,
    margin: 0,
  },
  checkboxCustom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    border: "2px solid #d4a000",
    backgroundColor: "#fef3c7",
    cursor: "pointer",
    transition: "all 0.15s",
    flexShrink: 0,
  },
  checkMark: {
    color: "#16a34a",
    fontSize: "13px",
    fontWeight: "800",
    lineHeight: 1,
  },
  textoArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    minWidth: 0,
  },
  titulo: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#3b2a00",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tituloCompletado: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#86a086",
    textDecoration: "line-through",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  descripcion: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    color: "#a07800",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  editArea: {
    flex: 1,
    display: "flex",
    gap: "10px",
    minWidth: 0,
  },
  inputEditar: {
    flex: 1,
    backgroundColor: "#fef3c7",
    border: "1px solid #d4a000",
    borderRadius: "6px",
    padding: "7px 12px",
    color: "#3b2a00",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.85rem",
    outline: "none",
    minWidth: 0,
  },
  botones: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
  },
  botonEditar: {
    backgroundColor: "transparent",
    color: "#a07800",
    border: "1px solid #d4a000",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    fontWeight: "600",
    letterSpacing: "0.04em",
    transition: "all 0.15s",
  },
  botonEliminar: {
    backgroundColor: "transparent",
    color: "#dc2626",
    border: "1px solid #d4a000",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    fontWeight: "600",
    letterSpacing: "0.04em",
    transition: "all 0.15s",
  },
  botonGuardar: {
    backgroundColor: "#d4a000",
    color: "#3b2a00",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    fontWeight: "700",
    transition: "all 0.15s",
  },
  botonCancelar: {
    backgroundColor: "transparent",
    color: "#a07800",
    border: "1px solid #d4a000",
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    fontWeight: "600",
    transition: "all 0.15s",
  },
  vacio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    color: "#a07800",
  },
  vacioIcon: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  vacioTexto: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.85rem",
    color: "#a07800",
    margin: 0,
  },
};

export default Lista;
