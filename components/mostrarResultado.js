const expresion = document.getElementById('expresion');
const resultado = document.getElementById('resultado');

export default function mostrarResultado(valor, expr) {
    resultado.textContent = valor;
    if(expr !== undefined){
        expresion.textContent = expr;
    }

}