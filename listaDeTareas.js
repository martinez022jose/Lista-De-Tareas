const refListaDeTareas = document.getElementById('listaDeTareas');
const title = document.getElementById('title');
const desc = document.getElementById('desc');

const formTask = document.getElementById('formTask');
const addTarea = document.getElementById('addTarea');
const errorDatos = document.getElementById('exit');

let refIndice = null;
const add = document.getElementById('add');
let indiceRef = null;

let tareas = [
	{title: "Hola", descripcion: "sadadsadada"},
	{title: "chiques", descripcion: "asddadas"}
];

let updates = [];

const modal = document.getElementById('modales');


const getTareas = () => {
	let tareasRender = tareas.map((tarea,indice)=>`<div class="col-3 m-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${tarea.title}</h5>
        <p class="card-text">${tarea.descripcion}.</p>
        <button class="btn btn-danger del" data-indice=${indice}>Eliminar</button>
		<button class="btn btn-warning edit" data-indice=${indice} data-toggle="modal" data-target="#exampleModal">Editar</button>
      </div>
    </div>
  </div>`

	).join('');

	refListaDeTareas.innerHTML = tareasRender;
	Array.from(document.querySelectorAll('.edit')).forEach((tarea)=>{
		tarea.addEventListener('click', (e)=>{
			editarTarea(e);
		})
	});

	Array.from(document.querySelectorAll('.del')).forEach((tarea)=>{
		tarea.addEventListener('click', (e)=>{
			eliminarTarea(e);
		})
	});
	


	
}

const agregarTarea = (e) => {
	
	e.preventDefault();

	let accion = addTarea.innerText;

	let datos = {
		title: title.value,
		descripcion: desc.value,
	}

	try{
		if(datos.title == ''){
			throw "Debe completar todos los campos";
		}else{
			switch(accion){
				case 'Actualizar':
					tareas[refIndice] = datos;
					
				break;
				default:
					tareas.push(datos);
				break;
				
			}	
		
			
			getTareas();
			resetForm();
		}
	}catch(e){
		errorDatos.innerHTML+=`<div id="exit" class="alert alert-primary" role="alert">
		${e}
	  </div>`;
	}
}

const resetForm = ()=>{
	title.value = '';
	desc.value = '';
	setTimeout(()=>{
		addTarea.innerHTML = "Guardar";
	},1000);
}

const eliminarTarea = (e)=>{
	e.preventDefault();
	let idRef = e.target.dataset.indice;
	delete tareas[idRef];
	getTareas();

}

const editarTarea = (e)=>{
	e.preventDefault();
	if(e.target.dataset.indice){
		tareaUpdate = tareas[e.target.dataset.indice];
		title.value = tareaUpdate.title;
		desc.value = tareaUpdate.descripcion;
		addTarea.innerText = "Actualizar";
		refIndice = e.target.dataset.indice;
	}else{
		addTarea.innerText = "Guardar";
	}
	
	

}

addTarea.addEventListener('click', agregarTarea);

getTareas();


