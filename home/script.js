document.addEventListener('DOMContentLoaded', () => {
    const games = document.querySelectorAll('.game');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showGame(index) {
        games.forEach((game, i) => {
            game.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : games.length - 1;
        showGame(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < games.length - 1) ? currentIndex + 1 : 0;
        showGame(currentIndex);
    });

    showGame(currentIndex);


    document.getElementById('loginBtn').addEventListener('click', () => {
        alert('Login button clicked');
    });

    document.getElementById('profileBtn').addEventListener('click', () => {
        alert('Profile button clicked');
    });
});

