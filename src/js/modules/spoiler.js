export function initSpoilers() {
    const spoilers = document.querySelectorAll('.spoiler');

    spoilers.forEach(spoiler => {
        const trigger = spoiler.querySelector('.spoiler__head');
        
        trigger.addEventListener('click', (e) => {
            spoiler.classList.toggle('is-active');
        });
    });
}