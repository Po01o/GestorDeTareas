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
            <div className="gestor-contenedor">
                <Agregar/>
                <Filtro/>
                <Lista/>
            </div>
        </GestorContext.Provider>
    );
}

export default Gestor;
