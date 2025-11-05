import { Graph } from "../lib/Graph";

const cities = [
    { id: "c:santanderdq", label: "Santander de Quilichao", type: "city" },
    { id: "c:cali",   label: "Cali",   type: "city" },
    { id: "c:med",    label: "Medellín", type: "city" },
];

const people = [
    { id: "p:jorge",   label: "Jorge",   age: 19, type: "person", cityId: "c:santanderdq" },
    { id: "p:vila",  label: "Vila",  age: 20, type: "person", cityId: "c:cali" },
    { id: "p:angie", label: "Angie", age: 19, type: "person", cityId: "c:santanderdq" },
    { id: "p:mauriel", label: "Mauriel", age: 20, type: "person", cityId: "c:med" },
    { id: "p:malcom", label: "Malcom", age: 19, type: "person", cityId: "c:med" },
    { id: "p:sabas", label: "Sebastian", age: 21, type: "person", cityId: "c:med" },
    { id: "p:juan",  label: "Juan",  age: 19, type: "person", cityId: "c:cali" },
];

export const graph = new Graph();

// nodos
[...cities, ...people].forEach(n => graph.addNode(n));
// aristas persona ↔ ciudad
people.forEach(p => graph.addEdge(p.id, p.cityId));

export const graphData = graph.dataForReactD3();

// util
export function peopleByCity(cityId) {
    return people.filter(p => p.cityId === cityId);
}
export const cityOptions = cities.map(c => ({ id: c.id, name: c.label }));
