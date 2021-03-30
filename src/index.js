import { Project } from './project'
import { ToDo } from './toDo'

const appLogic = (() => {
    let projects = [];

    const getProjects = () => projects;

    const getProject = (index) => projects[index];

    const addProject = (title, description) => {
        let projIndex = projects.push(Project(title, description)) - 1;
        domManipulation.renderTaskModal(projIndex);
    }

    const addToDoToProject = (projectIndex, toDoTitle, toDoDesc, toDoDueDate, toDoPrio) => {
        let newTodo = ToDo(toDoTitle, toDoDesc, toDoDueDate, toDoPrio);
        let project = getProject(projectIndex);
        project.addToDo(newTodo);
        domManipulation.toDoRender(projectIndex);
        console.log(`PROYECTO: ${projectIndex}`)
        // let projects[projectIndex].addToDo(newTodo);
    }

    const deleteProject = (index) => {
        projects.splice(index, 1);
        // TODO: ELIMINAR SU RESPECTIVO MODAL
    }

    return {
        getProjects, addProject, deleteProject, getProject, addToDoToProject
    }

})()

// appLogic.addProject('titulo 1', 'prubea 1');

const mainContainerListeners = (() => {

    const addListeners = () => {
        const checkedDivs = document.querySelectorAll('.todo-checked');
        const toDoInfos = document.querySelectorAll('.todo-info');
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
                let projId = toDoInfo.id.split('-')[1];
                let todoId = toDoInfo.id.split('-')[2];
                let toDoContainer = document.querySelector(`#todoInfo-${projId}-${todoId}`);
                if (toDoContainer.style.maxHeight) {
                    toDoContainer.style.maxHeight = null;
                } else {
                    toDoContainer.style.maxHeight = '40em';
                }
            })
        });
    }

    const _init = (() => {
        addListeners();
    })()
    return { addListeners }
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

        // mainContainer.innerHTML = '';
        while (mainContainer.lastElementChild) {
            mainContainer.removeChild(mainContainer.lastElementChild);
        }

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
        btn.id = `addTasksBtn-${index}`
        btn.innerText = 'Añadir tarea';


        btnContainer.appendChild(btn);

        projInfoContainer.appendChild(btnContainer);

        mainContainer.appendChild(projInfoContainer);

        let toDosContainer = document.createElement('div');
        toDosContainer.classList.add('todos-container');

        mainContainer.appendChild(toDosContainer);
        modalListeners.taskModalListener(index);
    }

    const renderTaskModal = (index) => {
        let mainContainer = document.querySelector('#mainContainer');
        let modalBg = document.createElement('div');
        let modal = document.createElement('div');
        let closeModal = document.createElement('span');
        let modalHeader = document.createElement('div');

        modalBg.classList.add('modal-bg');
        modalBg.id = `taskModal-${index}`;
        modal.classList.add('modal');
        closeModal.classList.add('modal-close');
        closeModal.id = `closeTaskModal-${index}`;
        closeModal.innerHTML = '&times;'
        modalHeader.classList.add('modal-header');
        modalHeader.innerText = 'Añadir tarea';

        modal.appendChild(closeModal);
        modal.appendChild(modalHeader);

        let modalContentContainer = document.createElement('div');

        let modalContent = document.createElement('div');
        let labelTaskName = document.createElement('label');
        let inputTaskName = document.createElement('input');
        let taskNameId = `taskName-${index}`;
        let labelTaskDesc = document.createElement('label');
        let inputTaskDesc = document.createElement('textarea');
        let taskDescId = `taskDesc-${index}`;

        modalContentContainer.classList.add('modal-content-container', 'pb-0');

        modalContent.classList.add('modal-content', 'py-0');
        labelTaskName.htmlFor = taskNameId;
        labelTaskName.innerText = 'Nombre de la tarea';
        inputTaskName.id = taskNameId;
        inputTaskName.type = 'text';
        labelTaskDesc.htmlFor = taskDescId;
        labelTaskDesc.innerText = 'Descripción de la tarea';
        inputTaskDesc.id = taskDescId;
        inputTaskDesc.cols = '30';
        inputTaskDesc.rows = '5';

        modalContent.appendChild(labelTaskName);
        modalContent.appendChild(inputTaskName);
        modalContent.appendChild(labelTaskDesc);
        modalContent.appendChild(inputTaskDesc);

        modalContentContainer.appendChild(modalContent);

        let modalTaskInfo = document.createElement('div');
        let labelDueDate = document.createElement('label');
        let inputDueDate = document.createElement('input');
        let dueDateId = `dueDate-${index}`;
        let labelPrio = document.createElement('label');
        let selectPrio = document.createElement('select');
        let prioId = `prioridad-${index}`;
        modalTaskInfo.classList.add('modal-task-info');

        labelDueDate.htmlFor = dueDateId;
        labelDueDate.innerText = 'Fecha de vencimiento';
        inputDueDate.id = dueDateId;
        inputDueDate.type = 'date';
        labelPrio.htmlFor = prioId;
        labelPrio.innerText = 'Prioridad:';
        selectPrio.id = prioId;
        ['Baja', 'Media', 'Alta'].forEach((element, iPos) => {
            selectPrio.add(new Option(element, iPos))
        })

        modalTaskInfo.appendChild(labelDueDate);
        modalTaskInfo.appendChild(inputDueDate);
        modalTaskInfo.appendChild(labelPrio);
        modalTaskInfo.appendChild(selectPrio);

        modalContentContainer.appendChild(modalTaskInfo);

        modal.appendChild(modalContentContainer);

        let buttonRow = document.createElement('div');
        let buttonSubmit = document.createElement('button');

        buttonRow.classList.add('button-row');
        buttonSubmit.classList.add('button', 'submit-btn');
        buttonSubmit.id = `addTask-${index}`;
        buttonSubmit.innerText = 'Agregar tarea';

        buttonRow.appendChild(buttonSubmit);

        modal.appendChild(buttonRow);
        modalBg.appendChild(modal);

        mainContainer.appendChild(modalBg);
    }

    const toDoRender = (index) => {
        let project = appLogic.getProject(index);

        let toDos = project.getToDos();

        let mainContainer = document.querySelector('.main-container');
        let toDosContainer = document.querySelector('.todos-container');
        toDosContainer.innerHTML = '';
        toDos.forEach((toDo, tDIndex) => {
            let todoDiv = document.createElement('div');
            let todoMainInfo = document.createElement('div');

            todoMainInfo.classList.add('todo-main-info');
            todoDiv.classList.add('todo-div');

            let todoLeftInfo = document.createElement('div');
            let todoCheck = document.createElement('div');
            let todoName = document.createElement('div');

            todoLeftInfo.classList.add('todo-left');
            todoCheck.classList.add('todo-checked');
            todoName.classList.add('todo-name');
            todoName.innerText = toDo.getTitle();

            todoLeftInfo.appendChild(todoCheck);
            todoLeftInfo.appendChild(todoName);

            let todoRight = document.createElement('div');
            let todoEditS = document.createElement('span');
            let todoEditI = document.createElement('i');
            let todoRemoveS = document.createElement('span');
            let todoRemoveI = document.createElement('i');
            let todoInfoS = document.createElement('span');
            let todoInfoI = document.createElement('i');

            todoRight.classList.add('todo-right');
            todoEditI.setAttribute('data-feather', 'edit');
            todoEditS.classList.add('todo-edit');
            todoEditS.appendChild(todoEditI);
            todoRemoveI.setAttribute('data-feather', 'x-square');
            todoRemoveS.classList.add('todo-remove');
            todoRemoveS.appendChild(todoRemoveI);
            todoInfoI.setAttribute('data-feather', 'info');
            todoInfoS.classList.add('todo-info');
            todoInfoS.id = `todoInfoBtn-${index}-${tDIndex}`;
            todoInfoS.appendChild(todoInfoI);

            todoRight.appendChild(todoEditS);
            todoRight.appendChild(todoRemoveS);
            todoRight.appendChild(todoInfoS);

            todoMainInfo.appendChild(todoLeftInfo);
            todoMainInfo.appendChild(todoRight);

            todoDiv.appendChild(todoMainInfo);

            let toDoInfoContainer = document.createElement('div');
            let toDoContent = document.createElement('div');
            let toDoDesc = document.createElement('div');
            let toDoAllInfo = document.createElement('div');
            let fechaP = document.createElement('p');
            let prioP = document.createElement('p');
            let proyP = document.createElement('p');

            toDoInfoContainer.classList.add('todo-info-container');
            toDoInfoContainer.id = `todoInfo-${index}-${tDIndex}`;

            toDoContent.classList.add('todo-content');
            toDoDesc.classList.add('todo-descrip');
            toDoDesc.innerText = toDo.getDescription();

            toDoAllInfo.classList.add('todo-all-info');
            fechaP.innerText = `Fecha: ${toDo.getDueDate()}`;
            prioP.innerText = `Prioridad: ${toDo.getPriority()}`;
            proyP.innerText = `Proyecto ${project.getTitle()}`;

            toDoAllInfo.appendChild(fechaP);
            toDoAllInfo.appendChild(prioP);
            toDoAllInfo.appendChild(proyP);

            toDoContent.appendChild(toDoDesc);
            toDoContent.appendChild(toDoAllInfo);

            toDoInfoContainer.appendChild(toDoContent);

            todoDiv.appendChild(toDoInfoContainer);

            toDosContainer.appendChild(todoDiv);

        });
        mainContainer.appendChild(toDosContainer);
        mainContainerListeners.addListeners();
        feather.replace();
    }

    const _init = (() => {
        // addListeners();
    })()

    return { renderProjectsList, renderMainContainer, renderTaskModal, toDoRender }
})()

const sideNavListeners = (() => {

    const addListeners = () => {
        let projectListsItems = document.querySelectorAll('.proj-list-item');
        projectListsItems.forEach(projectListItem => {
            projectListItem.addEventListener('click', () => {
                let indexProject = projectListItem.id.split('-')[1];
                domManipulation.renderMainContainer(indexProject);
                domManipulation.toDoRender(indexProject);
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
        const closeModal = document.querySelector('#closeProjModal');

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

    const taskModalListener = (index) => {
        let modalBg = document.querySelector(`#taskModal-${index}`);


        modalBg = removeTaskModalListeners(modalBg, index)
        const modalInit = document.querySelector(`#addTasksBtn-${index}`);
        const closeModal = document.querySelector(`#closeTaskModal-${index}`);
        const taskName = document.querySelector(`#taskName-${index}`);
        const taskDesc = document.querySelector(`#taskDesc-${index}`);
        const taskDueDate = document.querySelector(`#dueDate-${index}`);
        const taskPrio = document.querySelector(`#prioridad-${index}`);
        const taskAddBtn = document.querySelector(`#addTask-${index}`);



        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })

        modalInit.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })

        taskAddBtn.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
            appLogic.addToDoToProject(index, taskName.value, taskDesc.value,
                taskDueDate.value, taskPrio.value);
            taskName.value = '';
            taskDesc.value = '';
            taskDueDate.value = '';
            taskPrio.value = '';
        })


    }

    const removeTaskModalListeners = (modalBg, index) => {
        let modalBgClone = modalBg.cloneNode(true)
        modalBg.parentNode.replaceChild(modalBgClone, modalBg);

        return document.querySelector(`#taskModal-${index}`);
    }

    const init = (() => {
        projModalListeners();
        taskModalListener('999');
    })()
    return { taskModalListener }
})()

feather.replace();

