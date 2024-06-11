//Variables
let cartavolteada= 0;
let carta1 = null;
let carta2 = null;
let primerResult = null;
let segundoResult = null;
let movimientos = 0;
let puntos = 0;
let temporizador = false;
let timer = 30;
let timerinicial = 30;
let cuentaregresiva = null;

//Documento Html 
let mostrarmovimientos = document.getElementById('movimientos');
let mostrarpuntos = document.getElementById('puntos');
let mostrartiempo = document.getElementById('tiemporestante');

//Generador Random De Numeros
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5; })
console.log(numeros);

//Funciones
function cronometro(){
    cuentaregresiva = setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML='Tiempo '+timer+ ' segundos';

        if(timer == 0){
            clearInterval(cuentaregresiva);
            bloquearcartas();
        }
    },1000)
}
function bloquearcartas(){
    for(let i= 0; i<=15; i++){
        let cartabloqueada = document.getElementById(i);
        cartabloqueada.innerHTML= numeros[i];
        cartabloqueada.disabled= true;
    }
}
//Funcion Principal
function voltear(id){

    if(temporizador == false){
        cronometro();
        temporizador=true;
    }

    cartavolteada++;
    console.log(cartavolteada);
    if(cartavolteada == 1){
        //numero de la carta 1
        carta1 = document.getElementById(id);
        primerResult = numeros[id]
        carta1.innerHTML = primerResult; 
        //desactivar carta
        carta1.disabled=true;
    }else if(cartavolteada == 2){
        //numero de la carta 2
        carta2 = document.getElementById(id);
        segundoResult = numeros[id]
        carta2.innerHTML = segundoResult; 
        //desactivar carta
        carta2.disabled=true;
        //incrementar movimiento
        movimientos++;
        mostrarmovimientos.innerHTML= 'movimientos: ' + movimientos;
        
        if(primerResult == segundoResult){
            //contador
            cartavolteada = 0;

            //Puntos
            puntos++;
            mostrarpuntos.innerHTML = 'puntos: '+puntos;

            if(puntos==8){
                clearInterval(cuentaregresiva);
                mostrarpuntos.innerHTML='puntos: '+puntos+' Muy Bien';
                mostrartiempo.innerHTML='Solo demoraste: '+(timerinicial - timer)+' segundos';
                mostrarmovimientos.innerHTML='movimientos: '+movimientos+' Muy Bien';
            }
        }else{
            //Mostrar la carta para ver si es correcto o no
            setTimeout(()=>{
                carta1.innerHTML= ' ';
                carta2.innerHTML= ' ';
                carta1.disabled= false;
                carta2.disabled= false;
                cartavolteada= 0;
            },800);
        }
    }
}