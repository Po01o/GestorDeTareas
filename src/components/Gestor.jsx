import { useEffect, useReducer } from 'react';
import GestorContext from '../GestorContext';
import Agregar from './Agregar';
import Lista from './Lista';
import { GestorReducer, estadoInicial } from '../GestorReducer';
import Filtro from './Filtro';

function Gestor() {
  console.log("Entrando:");
  const [estado, dispatch] = useReducer(GestorReducer, estadoInicial, (inicial) => {
    const tareasCreadas = localStorage.getItem('tareasCreadas');
    console.log("Cargando:", tareasCreadas);
    try {
      return tareasCreadas ? { ...inicial, tareas: JSON.parse(tareasCreadas) } : inicial;
    } catch (error) {
      console.log("Error al leer localStorage:", error);
      return inicial;
    }
  });

  useEffect(() => {
    console.log("Guardando:", estado.tareas);
    localStorage.setItem('tareasCreadas', JSON.stringify(estado.tareas));
  }, [estado.tareas]);

  return (
    <GestorContext.Provider value={{ tareas: estado.tareas, filtro: estado.filtro, dispatch }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #fef3c7; }
        input[type="checkbox"]:hover + label,
        label:hover { border-color: #f0c000 !important; background-color: #2a1f00 !important; }
      `}</style>
      <div style={styles.app}>
        <div style={styles.inner}>
          <Filtro />
          <Agregar />
          <Lista />
        </div>
      </div>
    </GestorContext.Provider>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#fef3c7",
    display: "flex",
    justifyContent: "center",
    padding: "40px 24px",
    fontFamily: "'DM Mono', 'Courier New', monospace",
  },
  inner: {
    width: "100%",
    maxWidth: "860px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export default Gestor;
