import { useState, useEffect, useRef, useReducer } from 'react';
import GestorContext from '../GestorContext';
import Agregar from './Agregar';
import Lista from './Lista';
import { GestorReducer, estadoInicial } from '../GestorReducer';
import Filtro from './Filtro';


function Gestor() {
    console.log("Entrando:");
    //const [estado, dispatch] = useReducer(GestorReducer, estadoInicial)
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
        <GestorContext.Provider value={{tareas: estado.tareas, filtro: estado.filtro, dispatch}}>
            <div style={styles.app}>
                <h1 style={styles.titulo}>Gestor de Tareas</h1>
                <Agregar/>
                <Filtro/>
                <Lista/>
            </div>
        </GestorContext.Provider>
    );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#fdf6e3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 20px",
    fontFamily: "Verdana, sans-serif"
  },
  titulo: {
    fontSize: "2rem",
    color: "#5a4200",
    marginBottom: "20px",
    borderBottom: "3px solid #e0b840",
    paddingBottom: "8px",
    letterSpacing: "1px"
  }
};

export default Gestor;
