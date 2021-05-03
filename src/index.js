import { Project } from './project'
import { ToDo } from './toDo'

const appLogic = (() => {
    let projects = [];

    const saveProjects = () => {
        let allData = {};
        projects.forEach((project, index) => {
            allData[index] = {};
            allData[index]['title'] = project.getTitle()
            allData[index]['description'] = project.getDescription()
            allData[index]['todos'] = {};
            let toDos = project.getToDos();
            if (!toDos) return
            toDos.forEach((toDo, tdIndex) => {
                console.log(toDo, index)
                allData[index]['todos'][tdIndex] = {};
                allData[index]['todos'][tdIndex]['title'] = toDo.getTitle();
                allData[index]['todos'][tdIndex]['description'] = toDo.getDescription();
                allData[index]['todos'][tdIndex]['dueDate'] = toDo.getDueDate();
                allData[index]['todos'][tdIndex]['priority'] = toDo.getPriorityLevel();
            });
        });
        localStorage.setItem('projects', JSON.stringify(allData));
    }

    const loadProjects = () => {
        removePageContent();
        let projectsStored = JSON.parse(localStorage.getItem('projects'));
        for (let [projIndex, projInfo] of Object.entries(projectsStored)) {
            let newProject = Project(projInfo['title'], projInfo['description'])

            for (let [tdIndex, tdInfo] of Object.entries(projInfo['todos'])) {
                let newTodo = ToDo(tdInfo['title'], tdInfo['description'], tdInfo['dueDate'], tdInfo['priority'])
                newProject.addToDo(newTodo);
            }
            projects.push(newProject);
            domManipulation.renderTaskModal(projIndex);
            domManipulation.renderDeleteProjectModal(projIndex);
            domManipulation.renderMainContainer(projIndex);
            domManipulation.toDoRender(projIndex);
        }
        domManipulation.renderProjectsList();
    }

    const renderApp = () => {
        const projectsList = document.querySelector('#projectsList');
        const mainContainer = document.querySelector('.main-container');
        const modals = document.querySelectorAll('.modal-bg');

        modals.forEach(modal => {
            if (modal.id == 'projModal') return;

            modal.parentElement.removeChild(modal);
        })

        projectsList.innerHTML = '';
        mainContainer.innerHTML = '';

        console.log(projects);

        projects.forEach((project, projIndex) => {
            domManipulation.renderTaskModal(projIndex);
            domManipulation.renderDeleteProjectModal(projIndex);
            domManipulation.renderMainContainer(projIndex);
            domManipulation.toDoRender(projIndex);
        })
        domManipulation.renderProjectsList();
    }

    const deleteProject = (index) => {
        projects.splice(index, 1);
        renderApp();
        saveProjects();
    }

    const removePageContent = () => {
        const projectsList = document.querySelector('#projectsList');
        const mainContainer = document.querySelector('.main-container');

        projectsList.innerHTML = '';
        mainContainer.innerHTML = '';
    }

    const getProjects = () => projects;

    const getProject = (index) => projects[index];

    const addProject = (title, description) => {
        let newProject = Project(title, description)
        let projIndex = projects.push(newProject) - 1;
        domManipulation.renderTaskModal(projIndex);
        domManipulation.renderDeleteProjectModal(projIndex);
        saveProjects();
    }

    const addToDoToProject = (projectIndex, toDoTitle, toDoDesc, toDoDueDate, toDoPrio) => {
        let newTodo = ToDo(toDoTitle, toDoDesc, toDoDueDate, toDoPrio);
        let project = getProject(projectIndex);
        project.addToDo(newTodo);
        domManipulation.toDoRender(projectIndex);
        saveProjects();
    }

    const getTodaYDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + dd
        }

        return `${yyyy}-${mm}-${dd}`
    }

    return {
        getProjects, addProject, saveProjects, loadProjects,
        deleteProject, getProject, addToDoToProject,
        getTodaYDate
    }

})()


const toDoListeners = (() => {

    const checkedListener = () => {
        const checkedDivs = document.querySelectorAll('.todo-checked');
        checkedDivs.forEach(checkedDiv => {
            checkedDiv.addEventListener('click', () => {
                if (checkedDiv.classList.contains('checked')) {
                    checkedDiv.classList.remove('checked');
                } else {
                    checkedDiv.classList.add('checked')
                }
            })
        });
    }

    const infoListener = () => {
        const toDoInfos = document.querySelectorAll('.todo-info');
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

    const removeListener = () => {
        const toDoRemoves = document.querySelectorAll('.todo-remove');
        toDoRemoves.forEach(toDoRemove => {
            toDoRemove.addEventListener('click', () => {
                let projId = toDoRemove.id.split('-')[1];
                let todoId = toDoRemove.id.split('-')[2];
                let project = appLogic.getProject(projId);
                let editModal = document.querySelector(`#editTaskModal-${projId}-${todoId}`)
                editModal.remove();
                project.removeToDo(todoId);
                domManipulation.toDoRender(projId);
                appLogic.saveProjects()
            })
        })
    }

    const editListener = () => {
        const toDoEdits = document.querySelectorAll('.todo-edit');
        toDoEdits.forEach(toDoEdit => {
            toDoEdit.addEventListener('click', () => {
                const projId = toDoEdit.id.split('-')[1];
                const todoId = toDoEdit.id.split('-')[2];
                const modalBg = document.querySelector(`#editTaskModal-${projId}-${todoId}`);
                modalBg.classList.add('modal-active');
            })
        })
    }

    const addListeners = () => {
        checkedListener();
        infoListener();
        removeListener();
        editListener();
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
        let projMainInfoDiv = document.createElement('div');
        let projInfo = document.createElement('div');
        let removeProjSpan = document.createElement('span');
        let removeProjIcon = document.createElement('i')
        let projTitleH4 = document.createElement('h4');
        let projDescrP = document.createElement('p');

        while (mainContainer.lastElementChild) {
            mainContainer.removeChild(mainContainer.lastElementChild);
        }

        removeProjIcon.setAttribute('data-feather', 'trash-2');
        removeProjSpan.classList.add('remove-proj');
        removeProjSpan.id = `removeProjBtn-${index}`;
        removeProjSpan.appendChild(removeProjIcon);

        projInfoContainer.classList.add('proj-info-container');
        projInfo.classList.add('proj-info');
        projTitleH4.classList.add('proj-title');
        projTitleH4.innerText = project.getTitle();
        projDescrP.classList.add('proj-description');
        projDescrP.innerText = project.getDescription();

        projMainInfoDiv.classList.add('proj-info-title-container')
        projMainInfoDiv.appendChild(projTitleH4);
        projMainInfoDiv.appendChild(removeProjSpan)

        projInfo.appendChild(projMainInfoDiv);
        projInfo.appendChild(projDescrP);

        projInfoContainer.appendChild(projInfo)

        let btnContainer = document.createElement('div');
        let btn = document.createElement('button');

        btnContainer.classList.add('add-btn-container');
        btn.classList.add('button', 'add-btn', 'submit-btn');
        btn.id = `addTasksBtn-${index}`
        btn.innerText = 'Añadir tarea';


        btnContainer.appendChild(btn);

        projInfoContainer.appendChild(btnContainer);

        mainContainer.appendChild(projInfoContainer);

        let toDosContainer = document.createElement('div');
        toDosContainer.classList.add('todos-container');

        mainContainer.appendChild(toDosContainer);
        modalListeners.taskModalListener(index);
        modalListeners.deleteProjectModalListener(index);
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
        let todayDate = appLogic.getTodaYDate();
        let dueDateId = `dueDate-${index}`;
        let labelPrio = document.createElement('label');
        let selectPrio = document.createElement('select');
        let prioId = `prioridad-${index}`;
        modalTaskInfo.classList.add('modal-task-info');

        labelDueDate.htmlFor = dueDateId;
        labelDueDate.innerText = 'Fecha de vencimiento';
        inputDueDate.id = dueDateId;
        inputDueDate.type = 'date';
        inputDueDate.setAttribute('min', todayDate);
        labelPrio.htmlFor = prioId;
        labelPrio.innerText = 'Prioridad:';
        selectPrio.id = prioId;
        ['Baja', 'Normal', 'Alta'].forEach((element, iPos) => {
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

    const renderDeleteProjectModal = (index) => {
        let mainContainer = document.querySelector('#mainContainer');
        let modalBg = document.createElement('div');
        let modal = document.createElement('div');
        let closeModal = document.createElement('span');
        let modalHeader = document.createElement('div');

        modalBg.classList.add('modal-bg');
        modalBg.id = `deleteProjectModal-${index}`;
        modal.classList.add('modal');
        closeModal.classList.add('modal-close');
        closeModal.id = `closeDeleteProjectModal-${index}`;
        closeModal.innerHTML = '&times;'
        modalHeader.classList.add('modal-header');
        modalHeader.innerText = 'Eliminar proyecto';

        modal.appendChild(closeModal);
        modal.appendChild(modalHeader);

        let buttonRow = document.createElement('div');
        let deleteProjBtn = document.createElement('button');
        let cancelProjBtn = document.createElement('button');

        buttonRow.classList.add('button-row');
        deleteProjBtn.id = `deleteProjectBtn-${index}`;
        deleteProjBtn.classList.add('button', 'submit-btn');
        deleteProjBtn.textContent = 'Borrar proyecto';
        cancelProjBtn.id = `cancelProjectBtn-${index}`;
        cancelProjBtn.classList.add('button', 'cancel-btn');
        cancelProjBtn.textContent = 'Cancelar';

        buttonRow.appendChild(deleteProjBtn);
        buttonRow.appendChild(cancelProjBtn);
        modal.appendChild(buttonRow);

        modalBg.appendChild(modal);

        mainContainer.appendChild(modalBg);
    }

    const renderEditToDoModal = (projIndex, tdIndex) => {
        let existingModal = document.querySelector(`#editTaskModal-${projIndex}-${tdIndex}`)
        if (existingModal) return;

        const project = appLogic.getProject(projIndex);
        const toDo = project.getToDo(tdIndex);
        let mainContainer = document.querySelector('#mainContainer');
        let modalBg = document.createElement('div');
        let modal = document.createElement('div');
        let closeModal = document.createElement('span');
        let modalHeader = document.createElement('div');

        modalBg.classList.add('modal-bg', 'edit-modal');
        modalBg.id = `editTaskModal-${projIndex}-${tdIndex}`;
        modal.classList.add('modal');
        closeModal.classList.add('modal-close');
        closeModal.id = `closeEditTaskModal-${projIndex}-${tdIndex}`;
        closeModal.innerHTML = '&times;'
        modalHeader.classList.add('modal-header');
        modalHeader.innerText = 'Editar tarea';

        modal.appendChild(closeModal);
        modal.appendChild(modalHeader);

        let modalContentContainer = document.createElement('div');

        let modalContent = document.createElement('div');
        let labelTaskName = document.createElement('label');
        let inputTaskName = document.createElement('input');
        let taskNameId = `editTaskName-${projIndex}-${tdIndex}`;
        let labelTaskDesc = document.createElement('label');
        let inputTaskDesc = document.createElement('textarea');
        let taskDescId = `editTaskDesc-${projIndex}-${tdIndex}`;

        modalContentContainer.classList.add('modal-content-container', 'pb-0');

        modalContent.classList.add('modal-content', 'py-0');
        labelTaskName.htmlFor = taskNameId;
        labelTaskName.innerText = 'Nombre de la tarea';
        inputTaskName.id = taskNameId;
        inputTaskName.value = toDo.getTitle();
        inputTaskName.type = 'text';
        labelTaskDesc.htmlFor = taskDescId;
        labelTaskDesc.innerText = 'Descripción de la tarea';
        inputTaskDesc.id = taskDescId;
        inputTaskDesc.value = toDo.getDescription();
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
        let todayDate = appLogic.getTodaYDate();
        let dueDateId = `editDueDate-${projIndex}-${tdIndex}`;
        let labelPrio = document.createElement('label');
        let selectPrio = document.createElement('select');
        let prioId = `editPrioridad-${projIndex}-${tdIndex}`;
        modalTaskInfo.classList.add('modal-task-info');

        labelDueDate.htmlFor = dueDateId;
        labelDueDate.innerText = 'Fecha de vencimiento';
        inputDueDate.id = dueDateId;
        inputDueDate.type = 'date';
        inputDueDate.value = toDo.getDueDate();
        inputDueDate.setAttribute('min', todayDate)
        labelPrio.htmlFor = prioId;
        labelPrio.innerText = 'Prioridad:';
        selectPrio.id = prioId;
        ['Baja', 'Normal', 'Alta'].forEach((element, iPos) => {
            selectPrio.add(new Option(element, iPos))
        })
        selectPrio.value = toDo.getPriorityLevel();
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
        buttonSubmit.id = `editTask-${projIndex}-${tdIndex}`;
        buttonSubmit.innerText = 'Editar tarea';

        buttonRow.appendChild(buttonSubmit);

        modal.appendChild(buttonRow);
        modalBg.appendChild(modal);

        mainContainer.appendChild(modalBg);
        modalListeners.editTaskModalListener(projIndex, tdIndex);
    }

    const removeProjectChildren = (projectIndex) => {
        let mainContainer = document.querySelector('.main-container');
        let addToDoModal = document.querySelector(`#taskModal-${projectIndex}`);
        let deleteProjModal = document.querySelector(`#deleteProjectModal-${projectIndex}`);
        let sideNavProjectDiv = document.querySelector(`#projList-${projectIndex}`);
        let editModals = document.querySelectorAll('.edit-modal');
        mainContainer.innerHTML = '';
        addToDoModal.parentElement.removeChild(addToDoModal);
        deleteProjModal.parentElement.removeChild(deleteProjModal);
        sideNavProjectDiv.parentElement.removeChild(sideNavProjectDiv);

        editModals.forEach(modal => {
            let modalId = editModals[0].id.split('-')[1];
            if (modalId === projectIndex) modal.parentElement.removeChild(modal)
        })
    }

    const removeEditModals = () => {
        const editModals = document.querySelectorAll('.edit-modal');
        editModals.forEach(editModal => {
            editModal.remove();
        });
    }

    const toDoRender = (index) => {
        removeEditModals();
        let project = appLogic.getProject(index);

        let toDos = project.getToDos();

        let mainContainer = document.querySelector('.main-container');
        let toDosContainer = document.querySelector('.todos-container');
        if (toDosContainer) toDosContainer.remove();
        toDosContainer = document.createElement('div');
        toDosContainer.classList.add('todos-container');
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
            todoEditS.id = `todoEditBtn-${index}-${tDIndex}`;
            todoEditS.appendChild(todoEditI);
            todoRemoveI.setAttribute('data-feather', 'x-square');
            todoRemoveS.classList.add('todo-remove');
            todoRemoveS.id = `todoRmvBtn-${index}-${tDIndex}`;
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
            proyP.innerText = `Proyecto: ${project.getTitle()}`;

            toDoAllInfo.appendChild(fechaP);
            toDoAllInfo.appendChild(prioP);
            toDoAllInfo.appendChild(proyP);

            toDoContent.appendChild(toDoDesc);
            toDoContent.appendChild(toDoAllInfo);

            toDoInfoContainer.appendChild(toDoContent);

            todoDiv.appendChild(toDoInfoContainer);

            toDosContainer.appendChild(todoDiv);
            renderEditToDoModal(index, tDIndex);
        });
        mainContainer.appendChild(toDosContainer);
        toDoListeners.addListeners();
        feather.replace();
    }

    const _init = (() => {
        // addListeners();
    })()

    return {
        renderProjectsList, renderMainContainer, renderTaskModal,
        toDoRender, removeProjectChildren, renderDeleteProjectModal
    }
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

        if (modalBg) {
            modalBg = removeTaskModalListeners(modalBg, index)
        }
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

    const deleteProjectModalListener = (index) => {
        let modalBg = document.querySelector(`#deleteProjectModal-${index}`);

        if (modalBg) {
            modalBg = removeDelProjModalListeners(modalBg, index)
        }

        const modalInit = document.querySelector(`#removeProjBtn-${index}`);
        const closeModal = document.querySelector(`#closeDeleteProjectModal-${index}`);
        const cancelDeleteProjBtn = document.querySelector(`#cancelProjectBtn-${index}`)
        const deleteProjectBtn = document.querySelector(`#deleteProjectBtn-${index}`);



        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })

        cancelDeleteProjBtn.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })

        modalInit.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })

        deleteProjectBtn.addEventListener('click', () => {
            appLogic.deleteProject(index);
        })


    }

    const editTaskModalListener = (projIndex, tdIndex) => {
        const modalBg = document.querySelector(`#editTaskModal-${projIndex}-${tdIndex}`);
        const closeModal = document.querySelector(`#closeEditTaskModal-${projIndex}-${tdIndex}`);
        const editTaskName = document.querySelector(`#editTaskName-${projIndex}-${tdIndex}`);
        const editTaskDesc = document.querySelector(`#editTaskDesc-${projIndex}-${tdIndex}`);
        const editTaskDueDate = document.querySelector(`#editDueDate-${projIndex}-${tdIndex}`);
        const editTaskPrio = document.querySelector(`#editPrioridad-${projIndex}-${tdIndex}`);
        const editTaskBtn = document.querySelector(`#editTask-${projIndex}-${tdIndex}`);

        let project = appLogic.getProject(projIndex);
        let toDo = project.getToDo(tdIndex);

        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
            editTaskName.value = toDo.getTitle();
            editTaskDesc.value = toDo.getDescription();
            editTaskDueDate.value = toDo.getDueDate();
            editTaskPrio.value = toDo.getPriorityLevel();
        })

        editTaskBtn.addEventListener('click', () => {
            let toDoInfoContainer = document.querySelector(`#todoInfo-${projIndex}-${tdIndex}`);
            toDoInfoContainer.parentNode.removeChild(toDoInfoContainer);
            toDo.setTitle(editTaskName.value);
            toDo.setDescription(editTaskDesc.value);
            toDo.setDueDate(editTaskDueDate.value);
            toDo.setPriority(editTaskPrio.value);
            modalBg.classList.remove('modal-active');
            modalBg.parentNode.removeChild(modalBg);
            domManipulation.toDoRender(projIndex);
            appLogic.saveProjects();
        })

    }

    const removeTaskModalListeners = (modalBg, index) => {
        let modalBgClone = modalBg.cloneNode(true)
        modalBg.parentNode.replaceChild(modalBgClone, modalBg);

        return document.querySelector(`#taskModal-${index}`);
    }

    const removeDelProjModalListeners = (modalBg, index) => {
        let modalBgClone = modalBg.cloneNode(true)
        modalBg.parentNode.replaceChild(modalBgClone, modalBg);

        return document.querySelector(`#deleteProjectModal-${index}`);
    }

    const init = (() => {
        projModalListeners();
    })()
    return { taskModalListener, editTaskModalListener, deleteProjectModalListener }
})()

window.onload = () => {
    appLogic.loadProjects();
}

feather.replace();

