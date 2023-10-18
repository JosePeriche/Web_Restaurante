const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEntradas = document.querySelector('.entradas');
const btnComidas = document.querySelector('.comidas');
const btnPostres = document.querySelector('.postres');
const btnBebidas = document.querySelector('.bebidas');
const contenedorPlatos = document.querySelector('.platos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platos();
})

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();

}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton,overlay) =>{
    boton.addEventListener('click',()=>{
       navegacion.classList.add('ocultar');
       overlay.remove();
       boton.remove();
    });
    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const platos = () =>{
    let platosArreglo = [];
    const platos = document.querySelectorAll('.plato');

    platos.forEach(plato=> platosArreglo = [...platosArreglo,plato]);

    const entradas = platosArreglo.filter(entrada=> entrada.getAttribute('data-plato') === 'entrada');
    const comidas = platosArreglo.filter(comida=> comida.getAttribute('data-plato') === 'comida');
    const postres = platosArreglo.filter(postre=> postre.getAttribute('data-plato') === 'postre');
    const bebidas = platosArreglo.filter(bebida=> bebida.getAttribute('data-plato') === 'bebida');
    
    mostrarPlatos(entradas,comidas,postres,bebidas, platosArreglo);

}

const mostrarPlatos = (entradas,comidas,postres,bebidas,todos) =>{
    btnEntradas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        entradas.forEach(entrada=> contenedorPlatos.appendChild(entrada));
    });
    btnComidas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        comidas.forEach(comida=> contenedorPlatos.appendChild(comida));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        postres.forEach(postre=> contenedorPlatos.appendChild(postre));
    });
    btnBebidas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatos);
        bebidas.forEach(bebida=> contenedorPlatos.appendChild(bebida));
    });
    btnTodos.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatos);
        todos.forEach(todo=> contenedorPlatos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}