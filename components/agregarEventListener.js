import gestionarAcciones from "./gestionarAcciones.js";

const botones = document.querySelectorAll('.btn');
export default botones.forEach(btn => {
    btn.addEventListener('click', () => {
        const accion = btn.dataset.accion;
        const valor = btn.dataset.valor;
        gestionarAcciones(accion, valor);
    });
});