console.clear();
console.log("=== Demostración de Métodos de Arrays en JavaScript ===\n");

// Función auxiliar para mostrar título y ejecutar ejemplos
function mostrar(titulo, fn) {
  console.log(`\n--- ${titulo} ---`);
  try {
    fn();
  } catch (e) {
    console.error("Error:", e.message);
  }
}

// 1. Creación y verificación
mostrar("Creación & Array.isArray()", () => {
  const arr1 = Array.of(1, 2, 3);
  const arr2 = Array.from("abc");
  console.log("Array.of:", arr1);
  console.log("Array.from:", arr2);
  console.log("Array.isArray(arr1):", Array.isArray(arr1));
});

// 2. Agregar / Quitar elementos
mostrar("push, pop, unshift, shift, splice, slice", () => {
  let arr = [1, 2, 3];
  arr.push(4);
  console.log("push:", arr);
  arr.pop();
  console.log("pop:", arr);
  arr.unshift(0);
  console.log("unshift:", arr);
  arr.shift();
  console.log("shift:", arr);
  arr.splice(1, 1, "X");
  console.log("splice:", arr);
  console.log("slice(0,2):", arr.slice(0, 2));
});

// 3. Búsqueda y comprobaciones
mostrar("includes, indexOf, lastIndexOf, find, findIndex, findLast, findLastIndex, some, every", () => {
  const arr = [1, 2, 3, 2];
  console.log("includes(2):", arr.includes(2));
  console.log("indexOf(2):", arr.indexOf(2));
  console.log("lastIndexOf(2):", arr.lastIndexOf(2));
  console.log("find > 2:", arr.find(x => x > 2));
  console.log("findIndex > 2:", arr.findIndex(x => x > 2));
  console.log("findLast > 2:", arr.findLast(x => x > 2));
  console.log("findLastIndex > 2:", arr.findLastIndex(x => x > 2));
  console.log("some > 2:", arr.some(x => x > 2));
  console.log("every > 0:", arr.every(x => x > 0));
});

// 4. Iteración
mostrar("forEach, map, filter, reduce, reduceRight, flatMap", () => {
  const arr = [1, 2, 3];
  arr.forEach(v => console.log("forEach valor:", v));
  console.log("map *2:", arr.map(v => v * 2));
  console.log("filter >1:", arr.filter(v => v > 1));
  console.log("reduce suma:", arr.reduce((a, b) => a + b, 0));
  console.log("reduceRight concatenar:", ["a", "b", "c"].reduceRight((a, b) => a + b));
  console.log("flatMap duplicar+1:", arr.flatMap(v => [v, v + 1]));
});

// 5. Ordenamiento e inversión
mostrar("sort, reverse, toSorted, toReversed", () => {
  const arr = [3, 1, 2];
  console.log("sort:", [...arr].sort());
  console.log("reverse:", [...arr].reverse());
  console.log("toSorted:", arr.toSorted());
  console.log("toReversed:", arr.toReversed());
});

// 6. Aplanar y concatenar
mostrar("flat, concat", () => {
  const arr = [1, [2, [3, 4]]];
  console.log("flat(2):", arr.flat(2));
  console.log("concat:", [1].concat([2, 3]));
});

// 7. Conversión y representación
mostrar("join, toString, toLocaleString", () => {
  const arr = [1, 2, 3];
  console.log("join('-'):", arr.join("-"));
  console.log("toString():", arr.toString());
  console.log("toLocaleString():", arr.toLocaleString());
});

// 8. Copiar y rellenar
mostrar("copyWithin, fill, with", () => {
  let arr = [1, 2, 3, 4];
  console.log("copyWithin(1, 2):", arr.copyWithin(1, 2));
  console.log("fill(0):", new Array(3).fill(0));
  console.log("with(1, 99):", [1, 2, 3].with(1, 99));
});

// 9. Iteradores
mostrar("entries, keys, values", () => {
  const arr = ["a", "b"];
  console.log("entries:", [...arr.entries()]);
  console.log("keys:", [...arr.keys()]);
  console.log("values:", [...arr.values()]);
});

// 10. at(), groupBy (si está disponible)
mostrar("at, groupBy", () => {
  const arr = [1, 2, 3];
  console.log("at(-1):", arr.at(-1));
  if (Array.prototype.groupBy) {
    console.log("groupBy par/impar:", arr.groupBy(n => n % 2 === 0 ? "pares" : "impares"));
  } else {
    console.log("groupBy: no está soportado en este entorno");
  }
});

console.log("\n=== Fin de la demostración ===");
