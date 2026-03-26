export const CursorAnimation = () => {
    const cursor = document.querySelector('.sb-click-effect');
    let lastUpdate = 0;
    const throttleTime = 16; // ~60fps

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastUpdate >= throttleTime) {
            cursor.setAttribute('style', "top:" + (e.pageY - 15) + "px; left:" + (e.pageX - 15) + "px;");
            lastUpdate = now;
        }
    });
    document.addEventListener('click', () => {
        cursor.classList.add('sb-click');

        setTimeout(() => {
            cursor.classList.remove('sb-click');
        }, 600);
    });
}
