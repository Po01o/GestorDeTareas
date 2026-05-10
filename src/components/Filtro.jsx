import React from "react";
import { useContext } from "react";
import GestorContext from "../GestorContext";

function Filtro() {
  const { tareas, filtro, dispatch } = useContext(GestorContext);

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "Completadas") return tarea.completada;
    if (filtro === "Pendientes") return !tarea.completada;
    return true;
  });

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>Gestor de Tareas</h2>
      <div style={styles.controles}>
        <div style={styles.filtroWrapper}>
          <span style={styles.filtroLabel}>Filtrar:</span>
          <select
            style={styles.select}
            value={filtro}
            onChange={(e) => dispatch({ tipo: "FILTRAR", filtro: e.target.value })}
          >
            <option value="Todas">Todas</option>
            <option value="Pendientes">Pendientes</option>
            <option value="Completadas">Completadas</option>
          </select>
        </div>
        <span style={styles.contador}>
          {tareasFiltradas.length} tarea{tareasFiltradas.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

const styles = {
  contenedor: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0 4px",
    marginBottom: "4px",
  },
  titulo: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#3b2a00",
    margin: "0 0 16px 0",
    letterSpacing: "-0.02em",
    borderLeft: "4px solid #f0c000",
    paddingLeft: "14px",
  },
  controles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fffde7",
    border: "1px solid #d4a000",
    borderRadius: "10px",
    padding: "10px 18px",
  },
  filtroWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filtroLabel: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    color: "#a07800",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  select: {
    backgroundColor: "#fef3c7",
    border: "1px solid #d4a000",
    borderRadius: "6px",
    padding: "6px 12px",
    color: "#3b2a00",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.85rem",
    cursor: "pointer",
    outline: "none",
  },
  contador: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.8rem",
    color: "#a07800",
    letterSpacing: "0.05em",
  },
};

export default Filtro;
