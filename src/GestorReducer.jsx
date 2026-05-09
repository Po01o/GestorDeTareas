const estadoInicial = {
    tareas: [],
    filtro: "Todas"
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
                    tarea.id === accion.id ? {
                        ...tarea,
                        completada: !tarea.completada
                    } : tarea
                )
            };
        case "FILTRAR":
            return {
                ...estado,
                filtro: accion.filtro
            };
        case "EDITAR_TAREA":
            return {
                ...estado, 
                tareas: estado.tareas.map(tarea =>
                    tarea.id === accion.tarea.id ? { 
                        ...tarea, 
                        ...accion.tarea 
                    } : tarea
                )
            }
        default:
            return estado;
    }
}

export { estadoInicial, GestorReducer };