import { useState, useEffect, useRef, useReducer } from 'react';
import GestorContext from '../GestorContext';
import Agregar from './Agregar';
import Lista from './Lista';
import { GestorReducer, estadoInicial } from '../GestorReducer';
import Filtro from './Filtro';


function Gestor() {
    const [estado, dispatch] = useReducer(GestorReducer, estadoInicial);

    return (
        <GestorContext.Provider value={{tareas: estado.tareas, filtro: estado.filtro, dispatch}}>
            <div>
                <Agregar/>
                <Filtro/>
                <Lista/>
            </div>
        </GestorContext.Provider>
    );
}

export default Gestor;
