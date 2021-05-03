(()=>{"use strict";const e=(e,t)=>{let d=[];return{getToDos:()=>d,getToDo:e=>d[e],addToDo:e=>{d.push(e)},removeToDo:e=>{d.splice(e,1)},getTitle:()=>e,getDescription:()=>t}},t=(e,t,d,o)=>{const a={0:"Baja",1:"Normal",2:"Alta"},n=e=>{o=a[e]};return n(o),{getPriorityLevel:()=>Object.keys(a).find((e=>a[e]===o)),getToDoInfo:()=>{console.log(e,t,d,o)},getTitle:()=>e,getDescription:()=>t,getDueDate:()=>d,getPriority:()=>o,setPriority:n,setTitle:t=>e=t,setDescription:e=>t=e,setDueDate:e=>d=e}},d=(()=>{let d=[];const o=()=>{let e={};d.forEach(((t,d)=>{e[d]={},e[d].title=t.getTitle(),e[d].description=t.getDescription(),e[d].todos={};let o=t.getToDos();o&&o.forEach(((t,o)=>{console.log(t,d),e[d].todos[o]={},e[d].todos[o].title=t.getTitle(),e[d].todos[o].description=t.getDescription(),e[d].todos[o].dueDate=t.getDueDate(),e[d].todos[o].priority=t.getPriorityLevel()}))})),localStorage.setItem("projects",JSON.stringify(e))},n=e=>d[e];return{getProjects:()=>d,addProject:(t,n)=>{let l=e(t,n),r=d.push(l)-1;a.renderTaskModal(r),a.renderDeleteProjectModal(r),o()},saveProjects:o,loadProjects:()=>{(()=>{const e=document.querySelector("#projectsList"),t=document.querySelector(".main-container");e.innerHTML="",t.innerHTML=""})();let o=JSON.parse(localStorage.getItem("projects"));for(let[n,l]of Object.entries(o)){let o=e(l.title,l.description);for(let[e,d]of Object.entries(l.todos)){let e=t(d.title,d.description,d.dueDate,d.priority);o.addToDo(e)}d.push(o),a.renderTaskModal(n),a.renderDeleteProjectModal(n),a.renderMainContainer(n),a.toDoRender(n)}a.renderProjectsList()},deleteProject:e=>{d.splice(e,1),(()=>{const e=document.querySelector("#projectsList"),t=document.querySelector(".main-container");document.querySelectorAll(".modal-bg").forEach((e=>{"projModal"!=e.id&&e.parentElement.removeChild(e)})),e.innerHTML="",t.innerHTML="",console.log(d),d.forEach(((e,t)=>{a.renderTaskModal(t),a.renderDeleteProjectModal(t),a.renderMainContainer(t),a.toDoRender(t)})),a.renderProjectsList()})(),o()},getProject:n,addToDoToProject:(e,d,l,r,c)=>{let i=t(d,l,r,c);n(e).addToDo(i),a.toDoRender(e),o()},getTodaYDate:()=>{let e=new Date,t=e.getDate(),d=e.getMonth()+1;return t<10&&(t="0"+t),d<10&&(d="0"+t),`${e.getFullYear()}-${d}-${t}`}}})(),o=(()=>{const e=()=>{document.querySelectorAll(".todo-checked").forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("checked")?e.classList.remove("checked"):e.classList.add("checked")}))})),document.querySelectorAll(".todo-info").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1],d=e.id.split("-")[2],o=document.querySelector(`#todoInfo-${t}-${d}`);o.style.maxHeight?o.style.maxHeight=null:o.style.maxHeight="40em"}))})),document.querySelectorAll(".todo-remove").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1],o=e.id.split("-")[2],n=d.getProject(t);document.querySelector(`#editTaskModal-${t}-${o}`).remove(),n.removeToDo(o),a.toDoRender(t),d.saveProjects()}))})),document.querySelectorAll(".todo-edit").forEach((e=>{e.addEventListener("click",(()=>{const t=e.id.split("-")[1],d=e.id.split("-")[2];document.querySelector(`#editTaskModal-${t}-${d}`).classList.add("modal-active")}))}))};return e(),{addListeners:e}})(),a=(()=>{const e=document.querySelector("#projectsList");return{renderProjectsList:()=>{let t=d.getProjects();e.innerHTML="",t.forEach(((t,d)=>{let o=document.createElement("li");o.innerText=t.getTitle(),o.id=`projList-${d}`,o.classList.add("proj-list-item"),e.appendChild(o)})),n.addListeners()},renderMainContainer:e=>{let t=d.getProject(e),o=document.querySelector(".main-container"),a=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div"),c=document.createElement("span"),i=document.createElement("i"),s=document.createElement("h4"),m=document.createElement("p");for(;o.lastElementChild;)o.removeChild(o.lastElementChild);i.setAttribute("data-feather","trash-2"),c.classList.add("remove-proj"),c.id=`removeProjBtn-${e}`,c.appendChild(i),a.classList.add("proj-info-container"),r.classList.add("proj-info"),s.classList.add("proj-title"),s.innerText=t.getTitle(),m.classList.add("proj-description"),m.innerText=t.getDescription(),n.classList.add("proj-info-title-container"),n.appendChild(s),n.appendChild(c),r.appendChild(n),r.appendChild(m),a.appendChild(r);let u=document.createElement("div"),p=document.createElement("button");u.classList.add("add-btn-container"),p.classList.add("button","add-btn","submit-btn"),p.id=`addTasksBtn-${e}`,p.innerText="Añadir tarea",u.appendChild(p),a.appendChild(u),o.appendChild(a);let h=document.createElement("div");h.classList.add("todos-container"),o.appendChild(h),l.taskModalListener(e),l.deleteProjectModalListener(e)},renderTaskModal:e=>{let t=document.querySelector("#mainContainer"),o=document.createElement("div"),a=document.createElement("div"),n=document.createElement("span"),l=document.createElement("div");o.classList.add("modal-bg"),o.id=`taskModal-${e}`,a.classList.add("modal"),n.classList.add("modal-close"),n.id=`closeTaskModal-${e}`,n.innerHTML="&times;",l.classList.add("modal-header"),l.innerText="Añadir tarea",a.appendChild(n),a.appendChild(l);let r=document.createElement("div"),c=document.createElement("div"),i=document.createElement("label"),s=document.createElement("input"),m=`taskName-${e}`,u=document.createElement("label"),p=document.createElement("textarea"),h=`taskDesc-${e}`;r.classList.add("modal-content-container","pb-0"),c.classList.add("modal-content","py-0"),i.htmlFor=m,i.innerText="Nombre de la tarea",s.id=m,s.type="text",u.htmlFor=h,u.innerText="Descripción de la tarea",p.id=h,p.cols="30",p.rows="5",c.appendChild(i),c.appendChild(s),c.appendChild(u),c.appendChild(p),r.appendChild(c);let v=document.createElement("div"),E=document.createElement("label"),L=document.createElement("input"),C=d.getTodaYDate(),T=`dueDate-${e}`,$=document.createElement("label"),y=document.createElement("select"),D=`prioridad-${e}`;v.classList.add("modal-task-info"),E.htmlFor=T,E.innerText="Fecha de vencimiento",L.id=T,L.type="date",L.setAttribute("min",C),$.htmlFor=D,$.innerText="Prioridad:",y.id=D,["Baja","Normal","Alta"].forEach(((e,t)=>{y.add(new Option(e,t))})),v.appendChild(E),v.appendChild(L),v.appendChild($),v.appendChild(y),r.appendChild(v),a.appendChild(r);let j=document.createElement("div"),g=document.createElement("button");j.classList.add("button-row"),g.classList.add("button","submit-btn"),g.id=`addTask-${e}`,g.innerText="Agregar tarea",j.appendChild(g),a.appendChild(j),o.appendChild(a),t.appendChild(o)},toDoRender:e=>{document.querySelectorAll(".edit-modal").forEach((e=>{e.remove()}));let t=d.getProject(e),a=t.getToDos(),n=document.querySelector(".main-container"),r=document.querySelector(".todos-container");r&&r.remove(),r=document.createElement("div"),r.classList.add("todos-container"),a.forEach(((o,a)=>{let n=document.createElement("div"),c=document.createElement("div");c.classList.add("todo-main-info"),n.classList.add("todo-div");let i=document.createElement("div"),s=document.createElement("div"),m=document.createElement("div");i.classList.add("todo-left"),s.classList.add("todo-checked"),m.classList.add("todo-name"),m.innerText=o.getTitle(),i.appendChild(s),i.appendChild(m);let u=document.createElement("div"),p=document.createElement("span"),h=document.createElement("i"),v=document.createElement("span"),E=document.createElement("i"),L=document.createElement("span"),C=document.createElement("i");u.classList.add("todo-right"),h.setAttribute("data-feather","edit"),p.classList.add("todo-edit"),p.id=`todoEditBtn-${e}-${a}`,p.appendChild(h),E.setAttribute("data-feather","x-square"),v.classList.add("todo-remove"),v.id=`todoRmvBtn-${e}-${a}`,v.appendChild(E),C.setAttribute("data-feather","info"),L.classList.add("todo-info"),L.id=`todoInfoBtn-${e}-${a}`,L.appendChild(C),u.appendChild(p),u.appendChild(v),u.appendChild(L),c.appendChild(i),c.appendChild(u),n.appendChild(c);let T=document.createElement("div"),$=document.createElement("div"),y=document.createElement("div"),D=document.createElement("div"),j=document.createElement("p"),g=document.createElement("p"),k=document.createElement("p");T.classList.add("todo-info-container"),T.id=`todoInfo-${e}-${a}`,$.classList.add("todo-content"),y.classList.add("todo-descrip"),y.innerText=o.getDescription(),D.classList.add("todo-all-info"),j.innerText=`Fecha: ${o.getDueDate()}`,g.innerText=`Prioridad: ${o.getPriority()}`,k.innerText=`Proyecto: ${t.getTitle()}`,D.appendChild(j),D.appendChild(g),D.appendChild(k),$.appendChild(y),$.appendChild(D),T.appendChild($),n.appendChild(T),r.appendChild(n),((e,t)=>{if(document.querySelector(`#editTaskModal-${e}-${t}`))return;const o=d.getProject(e).getToDo(t);let a=document.querySelector("#mainContainer"),n=document.createElement("div"),r=document.createElement("div"),c=document.createElement("span"),i=document.createElement("div");n.classList.add("modal-bg","edit-modal"),n.id=`editTaskModal-${e}-${t}`,r.classList.add("modal"),c.classList.add("modal-close"),c.id=`closeEditTaskModal-${e}-${t}`,c.innerHTML="&times;",i.classList.add("modal-header"),i.innerText="Editar tarea",r.appendChild(c),r.appendChild(i);let s=document.createElement("div"),m=document.createElement("div"),u=document.createElement("label"),p=document.createElement("input"),h=`editTaskName-${e}-${t}`,v=document.createElement("label"),E=document.createElement("textarea"),L=`editTaskDesc-${e}-${t}`;s.classList.add("modal-content-container","pb-0"),m.classList.add("modal-content","py-0"),u.htmlFor=h,u.innerText="Nombre de la tarea",p.id=h,p.value=o.getTitle(),p.type="text",v.htmlFor=L,v.innerText="Descripción de la tarea",E.id=L,E.value=o.getDescription(),E.cols="30",E.rows="5",m.appendChild(u),m.appendChild(p),m.appendChild(v),m.appendChild(E),s.appendChild(m);let C=document.createElement("div"),T=document.createElement("label"),$=document.createElement("input"),y=d.getTodaYDate(),D=`editDueDate-${e}-${t}`,j=document.createElement("label"),g=document.createElement("select"),k=`editPrioridad-${e}-${t}`;C.classList.add("modal-task-info"),T.htmlFor=D,T.innerText="Fecha de vencimiento",$.id=D,$.type="date",$.value=o.getDueDate(),$.setAttribute("min",y),j.htmlFor=k,j.innerText="Prioridad:",g.id=k,["Baja","Normal","Alta"].forEach(((e,t)=>{g.add(new Option(e,t))})),g.value=o.getPriorityLevel(),C.appendChild(T),C.appendChild($),C.appendChild(j),C.appendChild(g),s.appendChild(C),r.appendChild(s);let S=document.createElement("div"),P=document.createElement("button");S.classList.add("button-row"),P.classList.add("button","submit-btn"),P.id=`editTask-${e}-${t}`,P.innerText="Editar tarea",S.appendChild(P),r.appendChild(S),n.appendChild(r),a.appendChild(n),l.editTaskModalListener(e,t)})(e,a)})),n.appendChild(r),o.addListeners(),feather.replace()},removeProjectChildren:e=>{let t=document.querySelector(".main-container"),d=document.querySelector(`#taskModal-${e}`),o=document.querySelector(`#deleteProjectModal-${e}`),a=document.querySelector(`#projList-${e}`),n=document.querySelectorAll(".edit-modal");t.innerHTML="",d.parentElement.removeChild(d),o.parentElement.removeChild(o),a.parentElement.removeChild(a),n.forEach((t=>{n[0].id.split("-")[1]===e&&t.parentElement.removeChild(t)}))},renderDeleteProjectModal:e=>{let t=document.querySelector("#mainContainer"),d=document.createElement("div"),o=document.createElement("div"),a=document.createElement("span"),n=document.createElement("div");d.classList.add("modal-bg"),d.id=`deleteProjectModal-${e}`,o.classList.add("modal"),a.classList.add("modal-close"),a.id=`closeDeleteProjectModal-${e}`,a.innerHTML="&times;",n.classList.add("modal-header"),n.innerText="Eliminar proyecto",o.appendChild(a),o.appendChild(n);let l=document.createElement("div"),r=document.createElement("button"),c=document.createElement("button");l.classList.add("button-row"),r.id=`deleteProjectBtn-${e}`,r.classList.add("button","submit-btn"),r.textContent="Borrar proyecto",c.id=`cancelProjectBtn-${e}`,c.classList.add("button","cancel-btn"),c.textContent="Cancelar",l.appendChild(r),l.appendChild(c),o.appendChild(l),d.appendChild(o),t.appendChild(d)}}})(),n=(()=>{const e=()=>{document.querySelectorAll(".proj-list-item").forEach((e=>{e.addEventListener("click",(()=>{let t=e.id.split("-")[1];a.renderMainContainer(t),a.toDoRender(t)}))}))};return e(),{addListeners:e}})(),l=((()=>{const e=document.querySelector("#addProjectMod"),t=document.querySelector("#addProjBtn"),o=document.querySelector("#projName"),n=document.querySelector("#projDesc"),l=document.querySelector("#projModal");document.querySelector("#closeProjModal").addEventListener("click",(()=>{l.classList.remove("modal-active")})),e.addEventListener("click",(()=>{l.classList.add("modal-active")})),t.addEventListener("click",(()=>{l.classList.remove("modal-active"),d.addProject(o.value,n.value),a.renderProjectsList(),o.value="",n.value=""}))})(),{taskModalListener:e=>{let t=document.querySelector(`#taskModal-${e}`);t&&(t=((e,t)=>{let d=e.cloneNode(!0);return e.parentNode.replaceChild(d,e),document.querySelector(`#taskModal-${t}`)})(t,e));const o=document.querySelector(`#addTasksBtn-${e}`),a=document.querySelector(`#closeTaskModal-${e}`),n=document.querySelector(`#taskName-${e}`),l=document.querySelector(`#taskDesc-${e}`),r=document.querySelector(`#dueDate-${e}`),c=document.querySelector(`#prioridad-${e}`),i=document.querySelector(`#addTask-${e}`);a.addEventListener("click",(()=>{t.classList.remove("modal-active")})),o.addEventListener("click",(()=>{t.classList.add("modal-active")})),i.addEventListener("click",(()=>{t.classList.remove("modal-active"),d.addToDoToProject(e,n.value,l.value,r.value,c.value),n.value="",l.value="",r.value="",c.value=""}))},editTaskModalListener:(e,t)=>{const o=document.querySelector(`#editTaskModal-${e}-${t}`),n=document.querySelector(`#closeEditTaskModal-${e}-${t}`),l=document.querySelector(`#editTaskName-${e}-${t}`),r=document.querySelector(`#editTaskDesc-${e}-${t}`),c=document.querySelector(`#editDueDate-${e}-${t}`),i=document.querySelector(`#editPrioridad-${e}-${t}`),s=document.querySelector(`#editTask-${e}-${t}`);let m=d.getProject(e).getToDo(t);n.addEventListener("click",(()=>{o.classList.remove("modal-active"),l.value=m.getTitle(),r.value=m.getDescription(),c.value=m.getDueDate(),i.value=m.getPriorityLevel()})),s.addEventListener("click",(()=>{let n=document.querySelector(`#todoInfo-${e}-${t}`);n.parentNode.removeChild(n),m.setTitle(l.value),m.setDescription(r.value),m.setDueDate(c.value),m.setPriority(i.value),o.classList.remove("modal-active"),o.parentNode.removeChild(o),a.toDoRender(e),d.saveProjects()}))},deleteProjectModalListener:e=>{let t=document.querySelector(`#deleteProjectModal-${e}`);t&&(t=((e,t)=>{let d=e.cloneNode(!0);return e.parentNode.replaceChild(d,e),document.querySelector(`#deleteProjectModal-${t}`)})(t,e));const o=document.querySelector(`#removeProjBtn-${e}`),a=document.querySelector(`#closeDeleteProjectModal-${e}`),n=document.querySelector(`#cancelProjectBtn-${e}`),l=document.querySelector(`#deleteProjectBtn-${e}`);a.addEventListener("click",(()=>{t.classList.remove("modal-active")})),n.addEventListener("click",(()=>{t.classList.remove("modal-active")})),o.addEventListener("click",(()=>{t.classList.add("modal-active")})),l.addEventListener("click",(()=>{d.deleteProject(e)}))}});window.onload=()=>{d.loadProjects()},feather.replace()})();