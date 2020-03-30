(()=>{

	var listaDeTareas = document.querySelector('.contenedor .listaDeTareas .lista');
    var titulo = document.querySelector('.contenedor .cajaPantalla .tituloTarea');
	var descripcion = document.querySelector('.contenedor .cajaPantalla .descripcionTarea');
	var botonAgregar = document.querySelector('.contenedor .cajaPantalla #buttonAgregar');
	var botonesCerrar = document.querySelectorAll('contenedor .listaDeTareas .lista .item #botonEliminar');
	//var botonEliminar = document.querySelector('.contenedor .listaDeTareas .item #botonEliminar');
	 
	botonAgregar.addEventListener('click',()=>{
        
        //Obtenemos los datos al momento de realizar el click
		var contenidoTitulo = titulo.value;
		var contenidoDescripcion = descripcion.value;
        
        //Reinicimos valores

        titulo.value = null;
		descripcion.value =null;

		//Genero variables para un "item" nuevo

		var button = document.createElement('input');
		var item = document.createElement('div');
		var h3 = document.createElement('h3');
	    var p =document.createElement('p');
        
        //Agrego el atributos para la etiqueta correspondiente
	    item.setAttribute("id","item");
	    button.setAttribute("id","botonEliminar");
	    button.setAttribute("type","button");
	    button.setAttribute("value","borrar");


        //Encapsulamos el texto 
	    var contTitulo = document.createTextNode(contenidoTitulo);
	    var contDescripcion = document.createTextNode(contenidoDescripcion);
       
        //Enlazamos las etiquetas html

	    h3.appendChild(contTitulo);
	    p.appendChild(contDescripcion);
	    item.appendChild(h3);
	    item.appendChild(p);
	    item.appendChild(button);
        listaDeTareas.appendChild(item);

        button.addEventListener('click',()=>{
        	listaDeTareas.removeChild(item);
        });
        
        

    });

})();