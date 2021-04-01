const Project = (title, description) => {
    let toDos = [];
    const getTitle = () => title
    const getDescription = () => description

    const getToDos = () => {
        return toDos
    }

    const getToDo = (index) => {
        return toDos[index]
    }

    const addToDo = (toDo) => {
        toDos.push(toDo);
    }

    const removeToDo = (index) => {
        toDos.splice(index, 1);
    }

    return { getToDos, getToDo, addToDo, removeToDo, getTitle, getDescription }

}

export { Project }