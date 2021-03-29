import { Project } from './project'
import { ToDo } from './toDo'

const appLogic = (() => {
    let projects = [];

    const getProjects = () => projects;

    const getProject = (index) => projects[index];

    const addProject = (title, description) => {
        projects.push(Project(title, description))
    }

    const deleteProject = (index) => {
        projects.splice(index, 1);
    }

    return {
        getProjects, addProject, deleteProject, getProject
    }

})()

// appLogic.addProject('titulo 1', 'prubea 1');

const mainContainerListeners = (() => {
    const checkedDivs = document.querySelectorAll('.todo-checked');
    const toDoInfos = document.querySelectorAll('.todo-info');
    const addTasksBtn = document.querySelector('#addTasksBtn');

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
                    toDoContainer.style.maxHeight = null;
                } else {
                    toDoContainer.style.maxHeight = '40em';
                }
            })
        });

        // addTasksBtn.addEventListener('click', () => {

        // })
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
        projects.forEach((project, index) => {
            let projectLiItem = document.createElement('li');
            projectLiItem.innerText = project.getTitle();
            projectLiItem.id = `projList-${index}`;
            projectLiItem.classList.add('proj-list-item');
            projectsList.appendChild(projectLiItem);
        });
        sideNavListeners.addListeners();
    }

    const renderMainContainer = (index) => {
        let project = appLogic.getProject(index);
        let mainContainer = document.querySelector('.main-container');

        let projInfoContainer = document.createElement('div');
        let projInfo = document.createElement('div');

        let projTitleH4 = document.createElement('h4');
        let projDescrP = document.createElement('p');

        mainContainer.innerHTML = '';
        projInfoContainer.classList.add('proj-info-container');
        projInfo.classList.add('proj-info');
        projTitleH4.classList.add('proj-title');
        projTitleH4.innerText = project.getTitle();
        projDescrP.classList.add('proj-description');
        projDescrP.innerText = project.getDescription();

        projInfo.appendChild(projTitleH4);
        projInfo.appendChild(projDescrP);

        projInfoContainer.appendChild(projInfo)

        let btnContainer = document.createElement('div');
        let btn = document.createElement('button');

        btnContainer.classList.add('add-btn-container');
        btn.classList.add('button', 'add-btn');
        btn.id = `addTasksBtn`
        btn.innerText = 'Añadir tarea';


        btnContainer.appendChild(btn);

        projInfoContainer.appendChild(btnContainer);

        mainContainer.appendChild(projInfoContainer);

        modalListeners.taskModalListener();
    }

    const _init = (() => {
        // addListeners();
    })()

    return { renderProjectsList, renderMainContainer }
})()

const sideNavListeners = (() => {

    const addListeners = () => {
        let projectListsItems = document.querySelectorAll('.proj-list-item');
        projectListsItems.forEach(projectListItem => {
            projectListItem.addEventListener('click', () => {
                domManipulation.renderMainContainer(projectListItem.id.split('-')[1]);
            })
        });
    }

    const _init = (() => {
        addListeners();
    })()

    return { addListeners }
})()

const modalListeners = (() => {

    const projModalListeners = () => {
        const modalInit = document.querySelector('#addProjectMod');
        const addProject = document.querySelector('#addProjBtn');
        const projInput = document.querySelector('#projName');
        const projDescr = document.querySelector('#projDesc');
        const modalBg = document.querySelector('#projModal');
        // const modalBg = document.querySelector('#taskModal');
        const closeModal = document.querySelector('#closeProjModal');
        // const closeModal = document.querySelector('#closeTaskModal');

        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })

        modalInit.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })
        addProject.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
            appLogic.addProject(projInput.value, projDescr.value);
            domManipulation.renderProjectsList();
            projInput.value = '';
            projDescr.value = '';
        })
    }

    const taskModalListener = () => {
        const modalInit = document.querySelector('#addTasksBtn');
        const modalBg = document.querySelector('#taskModal');
        const closeModal = document.querySelector('#closeTaskModal');

        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })

        modalInit.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })
    }

    const init = (() => {
        projModalListeners();
        taskModalListener();
    })()
    return { taskModalListener }
})()

feather.replace();

