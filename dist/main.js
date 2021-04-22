(()=>{"use strict";const e=(e,t)=>{let d=[];return{getToDos:()=>d,getToDo:e=>d[e],addToDo:e=>{d.push(e)},removeToDo:e=>{d.splice(e,1)},getTitle:()=>e,getDescription:()=>t}},t=(e,t,d,a)=>{const o={0:"Baja",1:"Normal",2:"Alta"},n=e=>{a=o[e]};return n(a),{getPriorityLevel:()=>Object.keys(o).find((e=>o[e]===a)),getToDoInfo:()=>{console.log(e,t,d,a)},getTitle:()=>e,getDescription:()=>t,getDueDate:()=>d,getPriority:()=>a,setPriority:n,setTitle:t=>e=t,setDescription:e=>t=e,setDueDate:e=>d=e}},d=(()=>{let d=[];const a=()=>{let e={};d.forEach(((t,d)=>{e[d]={},e[d].title=t.getTitle(),e[d].description=t.getDescription(),e[d].todos={};let a=t.getToDos();a&&a.forEach(((t,a)=>{console.log(t,d),e[d].todos[a]={},e[d].todos[a].title=t.getTitle(),e[d].todos[a].description=t.getDescription(),e[d].todos[a].dueDate=t.getDueDate(),e[d].todos[a].priority=t.getPriorityLevel()}))})),localStorage.setItem("projects",JSON.stringify(e))},n=e=>d[e];return{getProjects:()=>d,addProject:(t,n)=>{let l=e(t,n),i=d.push(l)-1;o.renderTaskModal(i),a()},saveProjects:a,loadProjects:()=>{let a=JSON.parse(localStorage.getItem("projects"));for(let[n,l]of Object.entries(a)){let a=e(l.title,l.description);for(let[e,d]of Object.entries(l.todos)){let e=t(d.title,d.description,d.dueDate,d.priority);a.addToDo(e)}d.push(a),o.renderTaskModal(n),o.renderMainContainer(n),o.toDoRender(n)}o.renderProjectsList()},deleteProject:e=>{d.splice(e,1)},getProject:n,addToDoToProject:(e,d,l,i,r)=>{let c=t(d,l,i,r);n(e).addToDo(c),o.toDoRender(e),a()},getTodaYDate:()=>{let e=new Date,t=e.getDate(),d=e.getMonth()+1;return t<10&&(t="0"+t),d<10&&(d="0"+t),`${e.getFullYear()}-${d}-${t}`}}})(),a=(()=>{const e=()=>{document.querySelectorAll(".todo-checked").forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("checked")?e.classList.remove("checked"):e.classList.add("checked")}))})),document.querySelectorAll(".todo-info").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1],d=e.id.split("-")[2],a=document.querySelector(`#todoInfo-${t}-${d}`);a.style.maxHeight?a.style.maxHeight=null:a.style.maxHeight="40em"}))})),document.querySelectorAll(".todo-remove").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1],a=e.id.split("-")[2],n=d.getProject(t);document.querySelector(`#editTaskModal-${t}-${a}`).remove(),n.removeToDo(a),o.toDoRender(t),d.saveProjects()}))})),document.querySelectorAll(".todo-edit").forEach((e=>{e.addEventListener("click",(()=>{const t=e.id.split("-")[1],d=e.id.split("-")[2];document.querySelector(`#editTaskModal-${t}-${d}`).classList.add("modal-active")}))}))};return e(),{addListeners:e}})(),o=(()=>{const e=document.querySelector("#projectsList");return{renderProjectsList:()=>{let t=d.getProjects();e.innerHTML="",t.forEach(((t,d)=>{let a=document.createElement("li");a.innerText=t.getTitle(),a.id=`projList-${d}`,a.classList.add("proj-list-item"),e.appendChild(a)})),n.addListeners()},renderMainContainer:e=>{let t=d.getProject(e),a=document.querySelector(".main-container"),o=document.createElement("div"),n=document.createElement("div"),i=document.createElement("h4"),r=document.createElement("p");for(;a.lastElementChild;)a.removeChild(a.lastElementChild);o.classList.add("proj-info-container"),n.classList.add("proj-info"),i.classList.add("proj-title"),i.innerText=t.getTitle(),r.classList.add("proj-description"),r.innerText=t.getDescription(),n.appendChild(i),n.appendChild(r),o.appendChild(n);let c=document.createElement("div"),s=document.createElement("button");c.classList.add("add-btn-container"),s.classList.add("button","add-btn"),s.id=`addTasksBtn-${e}`,s.innerText="Añadir tarea",c.appendChild(s),o.appendChild(c),a.appendChild(o);let m=document.createElement("div");m.classList.add("todos-container"),a.appendChild(m),l.taskModalListener(e)},renderTaskModal:e=>{let t=document.querySelector("#mainContainer"),a=document.createElement("div"),o=document.createElement("div"),n=document.createElement("span"),l=document.createElement("div");a.classList.add("modal-bg"),a.id=`taskModal-${e}`,o.classList.add("modal"),n.classList.add("modal-close"),n.id=`closeTaskModal-${e}`,n.innerHTML="&times;",l.classList.add("modal-header"),l.innerText="Añadir tarea",o.appendChild(n),o.appendChild(l);let i=document.createElement("div"),r=document.createElement("div"),c=document.createElement("label"),s=document.createElement("input"),m=`taskName-${e}`,u=document.createElement("label"),p=document.createElement("textarea"),h=`taskDesc-${e}`;i.classList.add("modal-content-container","pb-0"),r.classList.add("modal-content","py-0"),c.htmlFor=m,c.innerText="Nombre de la tarea",s.id=m,s.type="text",u.htmlFor=h,u.innerText="Descripción de la tarea",p.id=h,p.cols="30",p.rows="5",r.appendChild(c),r.appendChild(s),r.appendChild(u),r.appendChild(p),i.appendChild(r);let v=document.createElement("div"),E=document.createElement("label"),L=document.createElement("input"),T=d.getTodaYDate(),C=`dueDate-${e}`,$=document.createElement("label"),g=document.createElement("select"),D=`prioridad-${e}`;v.classList.add("modal-task-info"),E.htmlFor=C,E.innerText="Fecha de vencimiento",L.id=C,L.type="date",L.setAttribute("min",T),$.htmlFor=D,$.innerText="Prioridad:",g.id=D,["Baja","Normal","Alta"].forEach(((e,t)=>{g.add(new Option(e,t))})),v.appendChild(E),v.appendChild(L),v.appendChild($),v.appendChild(g),i.appendChild(v),o.appendChild(i);let y=document.createElement("div"),k=document.createElement("button");y.classList.add("button-row"),k.classList.add("button","submit-btn"),k.id=`addTask-${e}`,k.innerText="Agregar tarea",y.appendChild(k),o.appendChild(y),a.appendChild(o),t.appendChild(a)},toDoRender:e=>{document.querySelectorAll(".edit-modal").forEach((e=>{e.remove()}));let t=d.getProject(e),o=t.getToDos(),n=document.querySelector(".main-container"),i=document.querySelector(".todos-container");i&&i.remove(),i=document.createElement("div"),i.classList.add("todos-container"),o.forEach(((a,o)=>{let n=document.createElement("div"),r=document.createElement("div");r.classList.add("todo-main-info"),n.classList.add("todo-div");let c=document.createElement("div"),s=document.createElement("div"),m=document.createElement("div");c.classList.add("todo-left"),s.classList.add("todo-checked"),m.classList.add("todo-name"),m.innerText=a.getTitle(),c.appendChild(s),c.appendChild(m);let u=document.createElement("div"),p=document.createElement("span"),h=document.createElement("i"),v=document.createElement("span"),E=document.createElement("i"),L=document.createElement("span"),T=document.createElement("i");u.classList.add("todo-right"),h.setAttribute("data-feather","edit"),p.classList.add("todo-edit"),p.id=`todoEditBtn-${e}-${o}`,p.appendChild(h),E.setAttribute("data-feather","x-square"),v.classList.add("todo-remove"),v.id=`todoRmvBtn-${e}-${o}`,v.appendChild(E),T.setAttribute("data-feather","info"),L.classList.add("todo-info"),L.id=`todoInfoBtn-${e}-${o}`,L.appendChild(T),u.appendChild(p),u.appendChild(v),u.appendChild(L),r.appendChild(c),r.appendChild(u),n.appendChild(r);let C=document.createElement("div"),$=document.createElement("div"),g=document.createElement("div"),D=document.createElement("div"),y=document.createElement("p"),k=document.createElement("p"),j=document.createElement("p");C.classList.add("todo-info-container"),C.id=`todoInfo-${e}-${o}`,$.classList.add("todo-content"),g.classList.add("todo-descrip"),g.innerText=a.getDescription(),D.classList.add("todo-all-info"),y.innerText=`Fecha: ${a.getDueDate()}`,k.innerText=`Prioridad: ${a.getPriority()}`,j.innerText=`Proyecto: ${t.getTitle()}`,D.appendChild(y),D.appendChild(k),D.appendChild(j),$.appendChild(g),$.appendChild(D),C.appendChild($),n.appendChild(C),i.appendChild(n),((e,t)=>{if(document.querySelector(`#editTaskModal-${e}-${t}`))return;const a=d.getProject(e).getToDo(t);let o=document.querySelector("#mainContainer"),n=document.createElement("div"),i=document.createElement("div"),r=document.createElement("span"),c=document.createElement("div");n.classList.add("modal-bg","edit-modal"),n.id=`editTaskModal-${e}-${t}`,i.classList.add("modal"),r.classList.add("modal-close"),r.id=`closeEditTaskModal-${e}-${t}`,r.innerHTML="&times;",c.classList.add("modal-header"),c.innerText="Editar tarea",i.appendChild(r),i.appendChild(c);let s=document.createElement("div"),m=document.createElement("div"),u=document.createElement("label"),p=document.createElement("input"),h=`editTaskName-${e}-${t}`,v=document.createElement("label"),E=document.createElement("textarea"),L=`editTaskDesc-${e}-${t}`;s.classList.add("modal-content-container","pb-0"),m.classList.add("modal-content","py-0"),u.htmlFor=h,u.innerText="Nombre de la tarea",p.id=h,p.value=a.getTitle(),p.type="text",v.htmlFor=L,v.innerText="Descripción de la tarea",E.id=L,E.value=a.getDescription(),E.cols="30",E.rows="5",m.appendChild(u),m.appendChild(p),m.appendChild(v),m.appendChild(E),s.appendChild(m);let T=document.createElement("div"),C=document.createElement("label"),$=document.createElement("input"),g=d.getTodaYDate(),D=`editDueDate-${e}-${t}`,y=document.createElement("label"),k=document.createElement("select"),j=`editPrioridad-${e}-${t}`;T.classList.add("modal-task-info"),C.htmlFor=D,C.innerText="Fecha de vencimiento",$.id=D,$.type="date",$.value=a.getDueDate(),$.setAttribute("min",g),y.htmlFor=j,y.innerText="Prioridad:",k.id=j,["Baja","Normal","Alta"].forEach(((e,t)=>{k.add(new Option(e,t))})),k.value=a.getPriorityLevel(),T.appendChild(C),T.appendChild($),T.appendChild(y),T.appendChild(k),s.appendChild(T),i.appendChild(s);let S=document.createElement("div"),f=document.createElement("button");S.classList.add("button-row"),f.classList.add("button","submit-btn"),f.id=`editTask-${e}-${t}`,f.innerText="Editar tarea",S.appendChild(f),i.appendChild(S),n.appendChild(i),o.appendChild(n),l.editTaskModalListener(e,t)})(e,o)})),n.appendChild(i),a.addListeners(),feather.replace()}}})(),n=(()=>{const e=()=>{document.querySelectorAll(".proj-list-item").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1];o.renderMainContainer(t),o.toDoRender(t)}))}))};return e(),{addListeners:e}})(),l=((()=>{const e=document.querySelector("#addProjectMod"),t=document.querySelector("#addProjBtn"),a=document.querySelector("#projName"),n=document.querySelector("#projDesc"),l=document.querySelector("#projModal");document.querySelector("#closeProjModal").addEventListener("click",(()=>{l.classList.remove("modal-active")})),e.addEventListener("click",(()=>{l.classList.add("modal-active")})),t.addEventListener("click",(()=>{l.classList.remove("modal-active"),d.addProject(a.value,n.value),o.renderProjectsList(),a.value="",n.value=""}))})(),{taskModalListener:e=>{let t=document.querySelector(`#taskModal-${e}`);t&&(t=((e,t)=>{let d=e.cloneNode(!0);return e.parentNode.replaceChild(d,e),document.querySelector(`#taskModal-${t}`)})(t,e));const a=document.querySelector(`#addTasksBtn-${e}`),o=document.querySelector(`#closeTaskModal-${e}`),n=document.querySelector(`#taskName-${e}`),l=document.querySelector(`#taskDesc-${e}`),i=document.querySelector(`#dueDate-${e}`),r=document.querySelector(`#prioridad-${e}`),c=document.querySelector(`#addTask-${e}`);o.addEventListener("click",(()=>{t.classList.remove("modal-active")})),a.addEventListener("click",(()=>{t.classList.add("modal-active")})),c.addEventListener("click",(()=>{t.classList.remove("modal-active"),d.addToDoToProject(e,n.value,l.value,i.value,r.value),n.value="",l.value="",i.value="",r.value=""}))},editTaskModalListener:(e,t)=>{const a=document.querySelector(`#editTaskModal-${e}-${t}`),n=document.querySelector(`#closeEditTaskModal-${e}-${t}`),l=document.querySelector(`#editTaskName-${e}-${t}`),i=document.querySelector(`#editTaskDesc-${e}-${t}`),r=document.querySelector(`#editDueDate-${e}-${t}`),c=document.querySelector(`#editPrioridad-${e}-${t}`),s=document.querySelector(`#editTask-${e}-${t}`);let m=d.getProject(e).getToDo(t);n.addEventListener("click",(()=>{a.classList.remove("modal-active"),l.value=m.getTitle(),i.value=m.getDescription(),r.value=m.getDueDate(),c.value=m.getPriorityLevel()})),s.addEventListener("click",(()=>{let n=document.querySelector(`#todoInfo-${e}-${t}`);n.parentNode.removeChild(n),m.setTitle(l.value),m.setDescription(i.value),m.setDueDate(r.value),m.setPriority(c.value),a.classList.remove("modal-active"),a.parentNode.removeChild(a),o.toDoRender(e),d.saveProjects()}))}});window.onload=()=>{d.loadProjects()},feather.replace()})();