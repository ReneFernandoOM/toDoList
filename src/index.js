import { Project } from './project'
import { ToDo } from './toDo'

const modalListeners = (() => {
    let addProject = document.querySelector('#addProject');
    const modalBg = document.querySelector('.modal-bg');
    const closeModal = document.querySelector('.modal-close');

    const addListeners = () => {
        closeModal.addEventListener('click', () => {
            modalBg.classList.remove('modal-active');
        })
        addProject.addEventListener('click', () => {
            modalBg.classList.add('modal-active');
        })
    }
    const init = (() => {
        addListeners();
    })()
})()

const domManipulation = (() => {
    let addProject = document.querySelector('#addProject');
    let modalBg = document.querySelector('.modal-bg');


    const _init = (() => {
        // addListeners();
    })()
})()

// domManipulation.init();
let newTodo = ToDo('titulo', 'descripcion', 'dueDate', 0);
let newProject = Project('Proj #2', 'Este es el segundo proyecto')
feather.replace();

newTodo.getToDoInfo();
newTodo.setPriority(2)
newTodo.getToDoInfo();

newProject.addToDo(newTodo)
newProject.getToDos()[0].getToDoInfo();
console.log(newProject.getToDos());
newProject.removeToDo(0);
console.log(newProject.getToDos());
