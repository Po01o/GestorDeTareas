const estadoInicial = {
    tareas: []
};

function GestorReducer(estado, accion){
    switch(accion.tipo){
        case "AGREGAR_TAREA":
            return {
                ...estado,
                tareas: [...estado.tareas, accion.tarea]
            };
        default:
            return estado;
    }
}

export { estadoInicial, GestorReducer };