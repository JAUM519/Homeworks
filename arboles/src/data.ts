import type { Nodo } from './types';

export const arbolInicial: Nodo = {
  valor: 10,
  izquierda: {
    valor: 5,
    izquierda: { valor: 2, izquierda: null, derecha: null },
    derecha: { valor: 7, izquierda: null, derecha: null }
  },
  derecha: {
    valor: 15,
    izquierda: { valor: 12, izquierda: null, derecha: null },
    derecha: { valor: 20, izquierda: null, derecha: null }
  }
};