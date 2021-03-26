import { Project } from './project'
import { ToDo } from './toDo'

const appLogic = (() => {
    let projects = [];

    const getProjects = () => projects;

    const addProject = (title) => {
        projects.push(Project(title))
        console.log(projects)
    }

    const deleteProject = (index) => {
        projects.splice(index, 1);
    }

    return {
        getProjects, addProject, deleteProject
    }

})()

const modalListeners = (() => {
    const modalInit = document.querySelector('#addProjectMod');
    const addProject = document.querySelector('#addProjBtn');
    const projInput = document.querySelector('#projName');
    const modalBg = document.querySelector('.modal-bg');
    const closeModal = document.querySelector('.modal-close');

    const addListeners = () => {
        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })
        modalInit.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })
        addProject.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
            appLogic.addProject(projInput.value);
            domManipulation.renderProjectsList();
            projInput.value = '';
        })
    }
    const init = (() => {
        addListeners();
    })()
})()

const mainContainerListeners = (() => {
    const checkedDivs = document.querySelectorAll('.todo-checked');
    const toDoInfos = document.querySelectorAll('.todo-info');

    const addListeners = () => {
        checkedDivs.forEach(checkedDiv => {
            checkedDiv.addEventListener('click', () => {
                if (checkedDiv.classList.contains('checked')) {
                    checkedDiv.classList.remove('checked');
                } else {
                    checkedDiv.classList.add('checked')
                }
            })
        });

        toDoInfos.forEach(toDoInfo => {
            toDoInfo.addEventListener('click', () => {
                let toDoContainer = document.querySelector(`#todo-${toDoInfo.id}`);
                if (toDoContainer.style.maxHeight) {
                    console.log('w');
                    toDoContainer.style.maxHeight = null;
                    console.log('r')
                } else {
                    toDoContainer.style.maxHeight = '40em';
                }
            })
        });
    }

    const _init = (() => {
        addListeners();
    })()
})()

const domManipulation = (() => {
    const projectsList = document.querySelector('#projectsList');

    const renderProjectsList = () => {
        let projects = appLogic.getProjects();
        projectsList.innerHTML = '';
        projects.forEach(project => {
            let projectLiItem = document.createElement('li');
            projectLiItem.innerText = project.getTitle();
            projectLiItem.classList.add('proj-list-item');
            projectsList.appendChild(projectLiItem);
        });
    }

    const _init = (() => {
        // addListeners();
    })()

    return { renderProjectsList }
})()

// domManipulation.init();
feather.replace();
// let newTodo = ToDo('titulo', 'descripcion', 'dueDate', 0);
// let newProject = Project('Proj #2')

// newTodo.getToDoInfo();
// newTodo.setPriority(2)
// newTodo.getToDoInfo();

// newProject.addToDo(newTodo)
// newProject.getToDos()[0].getToDoInfo();
// console.log(newProject.getToDos());
// newProject.removeToDo(0);
// console.log(newProject.getToDos());
