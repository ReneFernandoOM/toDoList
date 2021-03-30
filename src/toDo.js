const ToDo = (title, description, dueDate, priority) => {
    const _priorityLevels = {
        0: 'Baja',
        1: 'Normal',
        2: 'Alta'
    }

    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;

    const setPriority = (priorityLevel) => {
        priority = _priorityLevels[priorityLevel];
    }
    const getToDoInfo = () => {
        console.log(title, description, dueDate, priority);
    }

    const _init = (() => {
        setPriority(priority);
    })()

    return {
        setPriority, getToDoInfo, getTitle,
        getDescription, getDueDate, getPriority
    }
}

export { ToDo }