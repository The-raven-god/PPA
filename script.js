const prevBtns = document.querySelectorAll('.prev-btn');
const nextBtns = document.querySelectorAll('.next-btn');

prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gameContainer = btn.parentElement;
        const img = gameContainer.querySelector('img');
        // Simular cambio de juego hacia atrás
        // Aquí puedes agregar lógica para cambiar a la imagen del juego anterior
    });
});

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gameContainer = btn.parentElement;
        const img = gameContainer.querySelector('img');
        // Simular cambio de juego hacia adelante
        // Aquí puedes agregar lógica para cambiar a la imagen del siguiente juego
    });
});

document.getElementById('loginBtn').addEventListener('click', () => {
    // Aquí puedes agregar la lógica para abrir el formulario de login
});

document.getElementById('profileBtn').addEventListener('click', () => {
    // Aquí puedes agregar la lógica para redirigir al perfil del usuario
});
