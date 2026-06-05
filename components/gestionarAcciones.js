import mostrarResultado from "./mostrarResultado.js";
import calcular from "./calcular.js";

let valActual = '0';
let valAnterior = null;
let operacion = null;
let recienEvaluado = false;

// Funcion para gestionar las acciones de los botones
export default function gestionarAccion(accion, valor){
    switch(accion){
        // Aqui se gestionan las acciones de los botones con diferqentes casos
        case 'digito':
            if (recienEvaluado) {
                valActual = valor; // Si se acaba de evaluar, el nuevo dígito reemplaza el resultado
                recienEvaluado = false;
            } else {
                valActual = valActual === '0' ? valor : valActual + valor; // Si el valor actual es '0', lo reemplazamos, sino concatenamos
            }
            mostrarResultado(valActual);
            break;
        case 'limpiar':
            valActual = '0';
            valAnterior = null;
            operacion = null;
            recienEvaluado = false;
            mostrarResultado(valActual, '');
            break;
        case 'negativo':
            if(valActual !== '0'){
                valActual = valActual.startsWith('-') 
                ? valActual.slice(1) // Si ya es negativo, lo hacemos positivo 
                : '-' + valActual;  // Si no es negativo, lo hacemos negativo
            }
            mostrarResultado(valActual);
            break;
        case 'porcentaje':
            valActual = String(parseFloat(valActual) / 100);
            mostrarResultado(valActual);
            break;
        case 'decimal':
            if(!valActual.includes('.')){
                valActual += '.';
            }
            mostrarResultado(valActual);
            break;
        case 'operacion':
            if (operacion && valAnterior !== null && !recienEvaluado) {
                // Si ya hay una operación pendiente, la evaluamos antes de asignar la nueva operación
                let resultado = calcular(valAnterior, operacion, valActual);
                valAnterior = String(resultado);
            } else {
                valAnterior = valActual;
            }
            operacion = valor;
            recienEvaluado = true;
            mostrarResultado(valAnterior, `${valAnterior} ${operacion} `);
            break;
        case 'igual':
            if(operacion && valAnterior !== null){
                const expr = `${valAnterior} ${operacion} ${valActual} =`; 
                const resultado = calcular(valAnterior, operacion, valActual);
                valActual = String(resultado);
                valAnterior = null;
                operacion = null;
                recienEvaluado = true;
                mostrarResultado(valActual, expr); // Mostrar la expresión completa
            }
            break;
        case 'borrar':
            if (recienEvaluado) {
                valActual = '0'; // Si se acaba de evaluar, el botón de borrar reinicia el valor actual
                recienEvaluado = false;
            } else {
                valActual = valActual.length > 1 ? valActual.slice(0, -1) : '0'; // Si el valor tiene más de un dígito, borramos el último, sino lo reiniciamos a '0'
            }
            mostrarResultado(valActual);
            break;
    }
}