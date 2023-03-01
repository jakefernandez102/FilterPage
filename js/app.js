
//Variables
const marcaAuto = document.querySelector('#marca');
const yearAuto = document.querySelector('#year');
const minimoAuto = document.querySelector('#minimo');
const maximoAuto = document.querySelector('#maximo');
const puertasAuto = document.querySelector('#puertas');
const transmisionAuto = document.querySelector('#transmision ');
const colorAuto = document.querySelector('#color ');
const btnRango = document.querySelector('#rango ');
const btnLimpiar = document.querySelector('#limpiar ');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
      marca: '',
      year: '',
      minimo: '',
      maximo: '',
      puertas: '',
      transmision: '',
      color: '',
};

// eventos
document.addEventListener('DOMContentLoaded', () => {
      // console.log(autos);

      //Muestra los automoviles al cargar
      mostrarAutos(autos);

      //Llenalas opciones de años
      llenaSelect();

      //Filtrar


});//fin de DOMContentLoaded

//event listener para los select de busqueda
marcaAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.marca = e.target.value;

      filtrarAuto();
});

yearAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.year = e.target.value;

      filtrarAuto();

});

minimoAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.minimo = e.target.value;
      filtrarAuto();

});



maximoAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.maximo = e.target.value;
      filtrarAuto();

});

puertasAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.puertas = e.target.value;
      filtrarAuto();

});

transmisionAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.transmision = e.target.value;
      filtrarAuto();

});

colorAuto.addEventListener('change', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      datosBusqueda.color = e.target.value;
      filtrarAuto();

      // console.log(datosBusqueda);
});
btnRango.addEventListener('click', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);


      filtrarRango(e);

      // console.log(datosBusqueda);
});
btnLimpiar.addEventListener('click', (e) => {
      // console.log('si cambio');
      // console.log(e.target.value);

      const formulario = document.querySelector('#buscador');

      formulario.reset();

      datosBusqueda.marca = '';
      datosBusqueda.precio = '';
      datosBusqueda.maximo = '';
      datosBusqueda.minimo = '';
      datosBusqueda.color = '';
      datosBusqueda.puertas = '';
      datosBusqueda.transmision = '';
      datosBusqueda.year = '';

      mostrarAutos(autos);

      // console.log(datosBusqueda);
});




// funciones

//muestra los vehiculos de BD
function mostrarAutos(autos) {

      LimpiarHTML();

      autos.forEach(auto => {
            const { marca, modelo, year, precio, puertas, color, transmision } = auto;
            const autoHTML = document.createElement('P');

            autoHTML.textContent = `
                 Marca: ${marca}  -- Modelo: ${modelo}  -- Año: ${year}  -- Precio: ${precio} -- Puertas: ${puertas} --  Color: ${color} -- Transmision: ${transmision}
            `;

            //insertar en el HTML
            resultado.appendChild(autoHTML);
      });
}

//LIMPIAR EL HTML
function LimpiarHTML() {
      while (resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
      }
}

//Llena el Select de los años
function llenaSelect() {

      for (let i = max; i >= min; i--) {
            const opcion = document.createElement('OPTION');
            opcion.value = i;
            opcion.textContent = i;
            //inserta las opciones de año
            yearAuto.appendChild(opcion);
      }
}


//funcion filter en base a la busqueda
//Funcion de alto nivel es pasarle por parametro una funcion a otra funcion:

function filtrarAuto() {
      const resultado = autos.filter(filtrarMarca).filter(filtraryear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
      // console.log(resultado);
      if(resultado.length){
            mostrarAutos(resultado);
      }else{
            noResultados();
      }
}

//Valida si no hay resultados y muestra un error
function noResultados(){
      LimpiarHTML();

      const noResultados = document.createElement('DIV');
      noResultados.classList.add('alerta','error');
      noResultados.textContent = 'No hay resultados, intenta con otros terminos de busqueda';

      resultado.appendChild(noResultados);

}

function filtrarRango(e) {
      // console.log(auto);

      const {minimo, maximo} = datosBusqueda;
      console.log(minimo);
      console.log(maximo);
      if(minimo && maximo){
          const resultado =  autos.filter(auto => {
            return auto.precio >= minimo && auto.precio <= maximo;
          }).filter(filtrarMarca);
          mostrarAutos(resultado);
      }
      else{
           console.log('no entra');
      }

}

//Filtrar por marca
function filtrarMarca(auto) {

      const { marca } = datosBusqueda;

      if (marca) {
            return auto.marca === marca;
      }

      return auto;
}

//Filtrar por año
function filtraryear(auto) {

      const { year } = datosBusqueda;

      if (year) {
            console.log(auto.year == year);
            return auto.year == year;
      }

      return auto;
}


//Filtrar por precio minimo
function filtrarMinimo(auto) {

      const { minimo } = datosBusqueda;

      if (minimo) {

            return auto.precio == minimo;
      }

      return auto;
}

//Filtrar por precio Maximo
function filtrarMaximo(auto) {

      const { maximo } = datosBusqueda;

      if (maximo) {

            return auto.precio <= maximo;
      }

      return auto;
}


//Filtrar por puertas
function filtrarPuertas(auto) {

      const { puertas } = datosBusqueda;

      if (puertas) {

            return auto.puertas == puertas;
      }

      return auto;
}

//Filtrar por transmision
function filtrarTransmision(auto) {

      const { transmision } = datosBusqueda;

      if (transmision) {

            return auto.transmision == transmision;
      }

      return auto;
}

//Filtrar por transmision
function filtrarColor(auto) {

      const { color } = datosBusqueda;

      if (color) {

            return auto.color == color;
      }

      return auto;
}