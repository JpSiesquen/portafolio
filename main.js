//overlay = ventana emergente
const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    } 
});

//Efecto aparecer imagenes cargadas.
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
//
// Agregamos los listener de los enlaces para filtrar por categorias
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces. forEach( (elemento) =>{
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');
// Alt + 96 = `
            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos'? grid.filter('[data-categoria]') : grid.filter(`[data-categoria ="${categoria}"]`);
        });
    });
// Agregamos el listener de la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });
// Agregamos un listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
            
        });
    });
// EvenListener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    }); 
// EvenListener del overlay
    overlay.addEventListener('click', () => {
        overlay.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });           
});
