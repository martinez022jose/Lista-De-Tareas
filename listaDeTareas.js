const refListaDeTareas = document.getElementById('listaDeTareas');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const add = document.getElementById('add');
const reset = document.getElementById('reset');
const addTarea = document.getElementById('addTarea');
const errorDatos = document.getElementById('exit');

let refIndice = null;

let tareas = [];

let updates = [];

const getTareas = () => {
		let tareasRender = tareas.map((tarea,indice)=>`<div class="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12 p-2">
			<div class="card border border-secondary around">
				<div class="card-body text-center text-justify">
					<h5 class="card-title">${tarea.title}</h5>
					<p class="card-text">${tarea.descripcion}.</p>
					<button class="btn btn-danger del fas fa-trash-alt" data-indice=${indice} data-accion="Eliminar"></button>
					<button class="btn btn-warning edit fas fa-list" data-indice=${indice} data-accion="Editar" data-toggle="modal" data-target="#exampleModal"></button>
				</div>
				</div>
			</div>`).join('');

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
	let accionARealizar = addTarea.innerText;
	console.log(accionARealizar);
	let newTarea = {
		title: title.value,
		descripcion: desc.value,
	}
	
	try{
		if(newTarea.title == '' || newTarea.descripcion == ''){
			throw "Debe completar todos los campos";
		}else{
			switch(accionARealizar){
				case 'Actualizar':
					tareas[refIndice] = newTarea;
					
				break;
				default:
					tareas.push(newTarea);
				break;
				
			}	
			getTareas();
			resetForm();
		}
	}catch(e){
		errorDatos.innerHTML+=`<div id="exit" class="alert alert-danger" role="alert">
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

const resetTareas = ()=>{
	try{
		if( tareas.length == 0){
			throw "No presenta elementos a resetear";
		}else{
			tareas = [];
			getTareas();
		}
	}catch(e){
		errorDatos.innerHTML+=`<div id="exit" class="alert alert-danger" role="alert">
		${e}
	  	</div>`;
	}
	
}

const resetError = () => {
	errorDatos.innerHTML = '';
}

const eliminarTarea = (e)=>{
	e.preventDefault();
	let idRef = e.target.dataset.indice;
	delete tareas[idRef];
	getTareas();
}

const editarTarea = (e)=>{
	e.preventDefault();
	let indiceTarea = e.target.dataset.indice;
	if(indiceTarea){
		tareaUpdate = tareas[indiceTarea];
		title.value = tareaUpdate.title;
		desc.value = tareaUpdate.descripcion;
		addTarea.innerText = "Actualizar";
		refIndice = indiceTarea;
	}else{
		addTarea.innerText = "Guardar";
	}
}

getTareas();

addTarea.addEventListener('click', agregarTarea);
reset.addEventListener('click', resetTareas);
add.addEventListener('click',resetError);




