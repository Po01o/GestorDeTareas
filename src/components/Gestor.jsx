import { useState, useEffect, useRef, useReducer } from 'react';
import GestorContext from '../GestorContext';
import Agregar from './Agregar';
import Lista from './Lista';
import { GestorReducer, estadoInicial } from '../GestorReducer';


function Gestor() {
    const [estado, dispatch] = useReducer(GestorReducer, estadoInicial);

    return (
        <GestorContext.Provider value={estado, dispatch}>
            <div>
                <Agregar/>
                <Lista/>
            </div>
        </GestorContext.Provider>
    );
}

const styles = {
    calculadora: {
        margin: '50px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }
}

export default Gestor;
