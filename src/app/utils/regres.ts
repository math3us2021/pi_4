import { Matrix, inverse } from 'ml-matrix';

// Definindo os dados de entrada
const x1: number[] = [1, 2, 3, 4, 5];
const x2: number[] = [2, 4, 5, 4, 5];
const y: number[] = [3, 5, 6, 6, 7];

// Função para calcular a regressão linear múltipla
export function calcularRegressao(x1: number[], x2: number[], y: number[]): number[] {
  const X: number[][] = x1.map((value, index) => [1, value, x2[index]]);
  const Y: number[][] = y.map((value) => [value]);

  const XMatrix = new Matrix(X);
  const YMatrix = new Matrix(Y);

  const XTranspose = XMatrix.transpose();
  const XTX = XTranspose.mmul(XMatrix);
  const XTY = XTranspose.mmul(YMatrix);

  const XTXInverse = inverse(XTX);
  const coefficients = XTXInverse.mmul(XTY);

  return coefficients.to1DArray();
}

// Chamando a função de regressão linear múltipla
const coefficients = calcularRegressao(x1, x2, y);

// Imprimindo os resultados
console.log('Coeficiente de intercepto:', coefficients[0]);
console.log('Coeficiente de x1:', coefficients[1]);
console.log('Coeficiente de x2:', coefficients[2]);
