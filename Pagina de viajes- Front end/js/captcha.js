"use strict"

//lOGICA DEL CAPTCHA

let valores = [];
insertarCaptcha();
let form = document.querySelector('#form');
form.addEventListener('submit', verificarCaptcha);
const renovarCaptcha = document.getElementById("btn-refresh");
renovarCaptcha.addEventListener("click",insertarCaptcha)



function insertarCaptcha(){
    valores=[];
    for(let i = 0; i<8; i++){
        const caracterAleatorio = generarCaracterAleatorio();
        valores.push(caracterAleatorio);
    }
    mostrar();
  
}

function generarCaracterAleatorio(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return caracterAleatorio;
}

function mostrar(){
    let lista = document.querySelector(".box_captcha");
    lista.innerHTML = "";
    for(let i of valores){
        lista.innerHTML += "<li>"+ i +"</li>";
    }
    
}

function verificarCaptcha(e){
    e.preventDefault();
    const input = document.getElementById('captcha');
    const texto = input.value;
    const arreglo = Array.from(texto); // Dividir el texto por espacios en blanco
    verificar(arreglo);
}

function verificar(arreglo) {
  let mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = "";
  if (arreglo.length !== 0) {
    if (valores.length === arreglo.length) {
      let esIgual = true;

      for (let i = 0; i < valores.length; i++) {
        if (valores[i] !== arreglo[i]) {
          esIgual = false;
          break;
        }
      }

      if (esIgual) {
        mensaje.classList.remove("incorrecto");
        mensaje.classList.add("correcto");
        mensaje.innerHTML = "Su formulario de consulta fue enviada con éxito";
        insertarCaptcha();
        
      } else {
        mensaje.classList.remove("correcto");
        mensaje.classList.add("incorrecto");
        mensaje.innerHTML = "Captcha incorrecto";
        insertarCaptcha();
      }
    } else {
      mensaje.classList.remove("correcto");
      mensaje.classList.add("incorrecto");
      mensaje.innerHTML = "Captcha incorrecto";
      insertarCaptcha();
    }
  } else {
    mensaje.classList.remove("correcto");
    mensaje.classList.add("incorrecto");
    mensaje.innerHTML = "No introdujo el captcha";
    insertarCaptcha();
  }
}