import type { Nodo } from './types';

export function bstToHierarchy(n: Nodo | null): any {
  if (!n) return null;
  const children: any[] = [];
  const left = bstToHierarchy(n.izquierda);
  const right = bstToHierarchy(n.derecha);
  if (left) children.push(left);
  if (right) children.push(right);
  return { name: String(n.valor), children };
}