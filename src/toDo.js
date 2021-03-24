const ToDo = (title, description, dueDate, priority) => {
    const _priorityLevels = {
        0: 'Baja',
        1: 'Normal',
        2: 'Alta'
    }
    const setPriority = (priorityLevel) => {
        priority = _priorityLevels[priorityLevel];
    }
    const getToDoInfo = () => {
        console.log(title, description, dueDate, priority);
    }

    const _init = (() => {
        setPriority(priority);
    })()

    return { setPriority, getToDoInfo }
}

export { ToDo }