export default function calcular(a, op, b) {
  a = parseFloat(a); // convertir a string '12' → numero 12
  b = parseFloat(b); // convertir a string '3' → numero 3

  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷':
      // Protejer contra division por cero — matematicamente indefinida, pero aquí la manejamos devolviendo 'Error' 
      return b === 0 ? 'Error' : a / b;
  }
}