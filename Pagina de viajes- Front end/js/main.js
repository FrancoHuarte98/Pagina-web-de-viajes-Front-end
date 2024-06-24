"use strict"


//JSON PARA GUARDAR INFORMACION DE TABLA

let informacion = [{
  ciudad: "Cataratas del iguazu",
  edad_recomendada: "35-60 años",
  precio_por_persona: "ARS 85.500",
  excursion_estrella: "Salto Garganta del Diablo",
  mes_mas_concurrido:"Diciembre",
  temperatura_promedio:"28ºC",
},
{ciudad: "El calafate",
edad_recomendada: "50-60 años",
precio_por_persona: " ARS 112.800",
excursion_estrella: "Glaciar perito Moreno",
mes_mas_concurrido:"Febrero",
temperatura_promedio:"15ºC",},
{ciudad: "Salta",
edad_recomendada: "40-60 años",
precio_por_persona: "ARS 93.700",
excursion_estrella: "Cerro de los 7 colores",
mes_mas_concurrido:"Abril",
temperatura_promedio:"24ºC",},
{ciudad: "Cordoba",
edad_recomendada: "25-60 años",
precio_por_persona: "ARS 92.017",
excursion_estrella: "el gran balcon de las sierras",
mes_mas_concurrido:"Diciembre",
temperatura_promedio:"27ºC",},
{ciudad: "San Carlos de Bariloche",
edad_recomendada: "23-60 años",
precio_por_persona: "ARS 120.700",
excursion_estrella: "Circuito chico",
mes_mas_concurrido:"Enero",
temperatura_promedio:"25ºC",}
]

let tabla = [];

//LOGICA PARA AGREGAR Y ELIMINAR ELEMENTOS DE LA TABLA
const elementAgregarTable = document.getElementById("btn-table-agregar");
const elementEliminarTable = document.getElementById("btn-table-eliminar");
const elementVaciarTable = document.getElementById("btn-table-vaciar");
const elementAgregarx3 = document.getElementById("btn-table-agregarx3");


elementAgregarTable.addEventListener("click", agregarElementoTabla);
elementEliminarTable.addEventListener("click", eliminarElementoTabla);
elementVaciarTable.addEventListener("click", eliminarTodosElementoTabla);
elementAgregarx3.addEventListener("click", agregarElementosAleatoriamente)

function agregarElementosAleatoriamente(e){
  e.preventDefault();
    // Obtenemos una muestra aleatoria de tres objetos del arreglo 'informacion'
    const ciudadesAleatorias = []; 
    while (ciudadesAleatorias.length < 3) {
      const indiceAleatorio = Math.floor(Math.random() * informacion.length);
      const ciudadAleatoria = informacion[indiceAleatorio];
  
      // Evitamos duplicados
      if (!ciudadesAleatorias.includes(ciudadAleatoria)) {
        ciudadesAleatorias.push(ciudadAleatoria);
      }
    }
    tabla = ciudadesAleatorias;
    let mensaje1 = document.getElementById("mensaje");
    mensaje1.innerHTML = "";
    mensaje1.classList.remove("incorrecto");
    mensaje1.classList.add("correcto");
    mensaje1.innerHTML = "Se agregaron 3 ciudades aleatorias";
    mostrarTabla(tabla);
  }

function eliminarTodosElementoTabla(e) {
  e.preventDefault();
  tabla = [];
  limpiarTablaHTML();
}

function limpiarTablaHTML() {
  let tablaElemento = document.getElementById("tablaComparadora");
  tablaElemento.innerHTML = "";
  let mensaje1 = document.getElementById("mensaje");
  mensaje1.innerHTML = "";
  mensaje1.classList.remove("incorrecto");
  mensaje1.classList.add("correcto");
  mensaje1.innerHTML = "Se vacio correctamente la tabla";
  mostrarTabla(tabla);
}


document.addEventListener("DOMContentLoaded", function() {
  mostrarCiudadesPrecargadas();
});

function mostrarCiudadesPrecargadas() {
  let tablaHTML = generarTablaHTML(informacion);
  let tablaElemento = document.getElementById("tablaComparadora");
  tablaElemento.innerHTML = tablaHTML;
}

function generarTablaHTML(tabla) {
  let tablaHTML = '<table id="tablaComparadora">';
  tablaHTML += '<thead><tr><th>Ciudad</th><th>Edad recomendada</th><th>Precio por persona</th><th>Excursión estrella</th><th>Mes más concurrido</th><th>Temperatura promedio</th></tr></thead>';
  tablaHTML += '<tbody>';
  
 {
    tablaHTML += '<tr>';
    tablaHTML += '<td>' + tabla[0].ciudad + '</td>';
    tablaHTML += '<td>' + tabla[0].edad_recomendada + '</td>';
    tablaHTML += '<td>' + tabla[0].precio_por_persona + '</td>';
    tablaHTML += '<td>' + tabla[0].excursion_estrella + '</td>';
    tablaHTML += '<td>' + tabla[0].mes_mas_concurrido + '</td>';
    tablaHTML += '<td>' + tabla[0].temperatura_promedio + '</td>';
    tablaHTML += '</tr>';
  }

  tablaHTML += '</tbody></table>';

  return tablaHTML;
}





function agregarElementoTabla(e) {
    e.preventDefault();
  
    let ciudad = document.getElementById("ciudad").value;
    let edad = document.getElementById("edad").value;
    let precio = document.getElementById("precio").value;
    let excursion = document.getElementById("excursion").value;
    let mes = document.getElementById("mes").value;
    let temperatura = document.getElementById("temperatura").value;
  
    if (!ciudad || !edad || !precio || !excursion || !mes || !temperatura) {
      let mensaje1 = document.getElementById("mensaje");
      mensaje1.innerHTML = "";
      mensaje1.classList.remove("correcto");
      mensaje1.classList.add("incorrecto");
      mensaje1.innerHTML = "Completa todos los campos para agregar una ciudad nueva";
    }
    else{
      let ciudadNueva = {
        ciudad: ciudad,
        edad_recomendada: edad,
        precio_persona: precio,
        excursion_estrella: excursion,
        mes_mas_concurrido: mes,
        temp_promedio: temperatura
      };
    
      let esta = false;
      for (let i = 0; i < tabla.length; i++) {
        if (tabla[i].ciudad === ciudadNueva.ciudad) {
          esta = true;
          let mensaje1 = document.getElementById("mensaje");
          mensaje1.innerHTML = "";
          mensaje1.classList.remove("correcto");
          mensaje1.classList.add("incorrecto");
          mensaje1.innerHTML = "Esa ciudad ya está agregada a nuestra tabla comparadora";
          break;
        }
      }
    
      if (!esta) {
        tabla.push(ciudadNueva);
        let mensaje1 = document.getElementById("mensaje");
        mensaje1.innerHTML = "";
        mensaje1.classList.remove("incorrecto");
        mensaje1.classList.add("correcto");
        mensaje1.innerHTML = "Ciudad agregada correctamente";
      }
    
      mostrarTabla(tabla);
    }
}
  


function eliminarElementoTabla(e) {
  e.preventDefault();

  let ciudad = document.getElementById("ciudad").value;

  // Buscamos la posición del objeto en el arreglo 'tabla' basado en la ciudad
  let posicion = -1;
  for (let i = 0; i < tabla.length; i++) {
    if (tabla[i].ciudad === ciudad) {
      posicion = i;
      break;
    }
  }

  if (posicion !== -1) {
    // Eliminamos el objeto en la posición encontrada
    tabla.splice(posicion, 1);
    let mensaje1 = document.getElementById("mensaje");
    mensaje1.innerHTML = "";
    mensaje1.classList.remove("incorrecto");
    mensaje1.classList.add("correcto");
    mensaje1.innerHTML = "Ciudad eliminada correctamente";
  } else {
    let mensaje1 = document.getElementById("mensaje");
         mensaje1.innerHTML = "";
         mensaje1.classList.remove("correcto");
         mensaje1.classList.add("incorrecto");
         mensaje1.innerHTML = "Esa ciudad no se encuentra en la tabla";
  }
  mostrarTabla(tabla);
}


function mostrarTabla(tabla){
  let tablaHtml = document.getElementById("tablaComparadora");

  // Generamos el encabezado de la tabla
  let encabezado = "<tr>";
  for (let clave in tabla[0]) {
    encabezado += "<th>" + clave.replace(/_/g, " ") + "</th>";
  }
  encabezado += "</tr>";
  
  // Generamos las filas de datos
  let filas = "";
  tabla.forEach(function(objeto) {
    let fila = "<tr>";
    for (let clave in objeto) {
      fila += "<td>" + objeto[clave] + "</td>";
    }
    fila += "</tr>";
    filas += fila;
  });
  
  // Combinamos el encabezado y las filas en el contenido de la tabla
  let contenidoTabla = "<thead>" + encabezado + "</thead><tbody>" + filas + "</tbody>";
  
  // Actualizamos el contenido de la tabla
  tablaHtml.innerHTML = contenidoTabla;
}  
















