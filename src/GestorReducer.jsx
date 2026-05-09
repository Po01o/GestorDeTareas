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
        case "ELIMINAR_TAREA":
            return {
                ...estado,
                tareas: estado.tareas.filter(
                    tarea => tarea.id !== accion.id
                )
            };
        case "CAMBIAR_ESTADO":
            return {
                ...estado,
                tareas: estado.tareas.map(tarea =>
                    tarea.id === accion.id
                    ? {
                        ...tarea,
                        completada: !tarea.completada
                    }
                    : tarea
                )
            };
        default:
            return estado;
    }
}

export { estadoInicial, GestorReducer };