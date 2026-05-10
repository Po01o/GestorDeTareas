import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import GestorContext from "../GestorContext";

function Agregar() {
  const { dispatch } = useContext(GestorContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const tituloRef = useRef(null);

  useEffect(() => {
    tituloRef.current.focus();
  }, []);

  const agregarTarea = () => {
    if (titulo.trim() === "" || descripcion.trim() === "") {
      alert("Debes llenar ambos campos");
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      titulo: titulo,
      descripcion: descripcion,
      completada: false,
    };

    dispatch({ tipo: "AGREGAR_TAREA", tarea: nuevaTarea });
    setTitulo("");
    setDescripcion("");
    tituloRef.current.focus();
  };

  return (
    <div style={styles.contenedor}>
      <span style={styles.label}>+ Nueva tarea</span>
      <div style={styles.fila}>
        <textarea
          style={{ ...styles.input, flex: "1" }}
          ref={tituloRef}
          rows="1"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          style={{ ...styles.input, flex: "2" }}
          rows="1"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button style={styles.boton} onClick={agregarTarea}>
          Agregar
        </button>
      </div>
    </div>
  );
}

const styles = {
  contenedor: {
    width: "100%",
    backgroundColor: "#fffde7",
    border: "1px solid #d4a000",
    borderRadius: "14px",
    padding: "16px 24px",
    boxSizing: "border-box",
    boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.78rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f0c000",
    fontWeight: "600",
  },
  fila: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fef3c7",
    border: "1px solid #d4a000 ",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#3b2a00",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.88rem",
    resize: "none",
    outline: "none",
    transition: "border-color 0.2s",
    lineHeight: "1.4",
  },
  boton: {
    backgroundColor: "#d4a000",
    color: "#3b2a00",
    border: "none",
    borderRadius: "8px",
    padding: "10px 22px",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: "0.85rem",
    fontWeight: "700",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    transition: "background 0.18s",
  },
};

export default Agregar;
