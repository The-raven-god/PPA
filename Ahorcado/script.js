// Variables
let palabras = ['zeus', 'atenea', 'poseidon', 'apolo', 'artemisa', 'afrodita', 'ares',
     'hermes', 'hera', 'hefesto', 'dionisio', 'deméter', 'perseo', 'hercules', 'orfeo',
      'prometeo', 'nemesis', 'triton', 'eros', 'centauro'];
let word = seleccionarPalabraAleatoria();
let wordSecret = word.split('');
let id = 0;
let caracter = [];
let fallos = 0;
let letter = '';
let idLits = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];
const formSubmit = document.querySelector('.inputs');
const intento = document.querySelector('.intento');
const btnIntento = document.querySelector('.btn-intento');
const palabraOculta = document.getElementById('palabra-oculta');

// Función para seleccionar una palabra al azar
function seleccionarPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

// Poner los _ de la palabra, y mostrarlo en el html
for (i in wordSecret) {
    caracter.push('_');
}
palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;

// Funciones
const añadirFragmento = (titulo, textBtn, texto) => {
    const fragment = document.createDocumentFragment();
    let element = crearModal(titulo, textBtn, texto);
    fragment.appendChild(element);
    document.querySelector('.modal').appendChild(fragment);
};

const ponerPalabra = letter => {
    let indexLetter = wordSecret.indexOf(letter);
    while (indexLetter != -1) {
        caracter.splice(indexLetter, 1, letter);
        wordSecret.splice(indexLetter, 1, '_');
        indexLetter = wordSecret.indexOf(letter);
    }
};

const crearModal = (titulo, textBtn, texto) => {
    const container = document.createElement('DIV');
    const title = document.createElement('H1');
    const text = document.createElement('P');
    const options = document.createElement('DIV');
    const btnOK = document.createElement('BUTTON');

    container.classList.add('container-modal');
    title.classList.add('title-modal');
    text.classList.add('text-modal');
    options.classList.add('options-modal');
    btnOK.classList.add('btn-options-ok');

    title.textContent = titulo;
    text.textContent = texto;
    btnOK.textContent = textBtn;

    options.appendChild(btnOK);
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(options);

    btnOK.addEventListener('click', () => {
        iniciarNuevaPartida();
        document.querySelector('.modal').removeChild(container);
    });

    return container;
};

const iniciarNuevaPartida = () => {
    word = seleccionarPalabraAleatoria();
    wordSecret = word.split('');
    caracter = [];
    for (i in wordSecret) {
        caracter.push('_');
    }
    id = 0;
    fallos = 0;
    letter = '';
    palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;
    intento.classList.remove('ocultar');
    intento.classList.add('intento');
    btnIntento.classList.remove('ocultar');
    btnIntento.classList.add('btn-intento');
    const partesDelAhorcado = document.querySelector('.ahorcado').querySelectorAll(`.parteDelAhorcado`);
    partesDelAhorcado.forEach(element => {
        element.classList.add('ocultar');
        element.classList.remove('mostrar');
    });
};

// Eventos
formSubmit.addEventListener('submit', e => {
    e.preventDefault();
    if (wordSecret.includes(letter)) {
        while (wordSecret.includes(letter)) {
            ponerPalabra(letter);
        }
        palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;
    } else if (caracter.includes(letter)) {
        añadirFragmento('Aviso', '', `Ya haz ingresado esa letra, intenta con otra.`);
        setTimeout(() => {
            document.querySelector('.modal').removeChild(document.querySelector('.container-modal'));
        }, 2500);
    } else {
        const parteDelAhorcado = document.querySelector(`#${idLits[id]}`);
        parteDelAhorcado.classList.add('mostrar');
        parteDelAhorcado.classList.remove('ocultar');
        id += 1;
        fallos += 1;
    }

    intento.value = ''; // Limpiar el campo de entrada después de cada intento

    if (fallos == 6) {
        intento.classList.remove('intento');
        intento.classList.add('ocultar');
        btnIntento.classList.remove('btn-intento');
        btnIntento.classList.add('ocultar');
        añadirFragmento('Haz perdido', 'Volver a jugar', `Da click en volver a jugar si quieres volver a jugar`);
    }

    if (!caracter.includes('_')) {
        intento.classList.remove('intento');
        intento.classList.add('ocultar');
        btnIntento.classList.remove('btn-intento');
        btnIntento.classList.add('ocultar');
        añadirFragmento('Haz ganado', 'Volver a jugar', `Correcto, la palabra era "${word.toUpperCase()}", da click en volver a jugar si quieres volver a jugar`);
    }
});

intento.addEventListener('change', e => {
    letter = e.target.value.toLowerCase();
});
