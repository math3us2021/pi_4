import { Matrix, inverse } from 'ml-matrix';

// Definindo os dados de entrada
const x1: number[] = [1, 2, 3, 4, 5];
const x2: number[] = [2, 4, 5, 4, 5];
const y: number[] = [3, 5, 6, 6, 7];

// Função para calcular a regressão linear múltipla e o R²
export function calcularRegressaoMultiple(x1: number[], x2: number[], y: number[]): { coefficients: number[], rSquared: number } {
  const X: number[][] = x1.map((value, index) => [1, value, x2[index]]);
  const Y: number[][] = y.map((value) => [value]);

  const XMatrix = new Matrix(X);
  const YMatrix = new Matrix(Y);

  const XTranspose = XMatrix.transpose();
  const XTX = XTranspose.mmul(XMatrix);
  const XTY = XTranspose.mmul(YMatrix);

  const XTXInverse = inverse(XTX);
  const coefficients = XTXInverse.mmul(XTY).to1DArray();

  // Cálculo do R²
  const yMean = YMatrix.mean();
  const yPredicted = XMatrix.mmul(new Matrix([coefficients]));
  const ssTotal = YMatrix.clone().sub(yMean).mul(YMatrix.clone().sub(yMean)).sum();
  const ssResidual = YMatrix.clone().sub(yPredicted).mul(YMatrix.clone().sub(yPredicted)).sum();
  const rSquared = 1 - (ssResidual / ssTotal);

  return { coefficients, rSquared };
}

// Chamando a função de regressão linear múltipla e obtendo os coeficientes e o R²
const { coefficients, rSquared } = calcularRegressaoMultiple(x1, x2, y);

// Imprimindo os resultados
console.log('Coeficiente de intercepto:', coefficients[0]);
console.log('Coeficiente de x1:', coefficients[1]);
console.log('Coeficiente de x2:', coefficients[2]);
console.log('Coeficiente de determinação (R²):', rSquared);
